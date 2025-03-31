import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { departmentsList } from "@/api/mock/departments"
import { usersList } from "@/api/mock/users"
import { Request } from "@/models/Request.interface"
import { requestsList } from "@/api/mock/requests"
import { useNavigate } from "@tanstack/react-router"

export function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>(requestsList)
  
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateOrder, setDateOrder] = useState<"oldest" | "newest">("newest")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [employeeFilter, setEmployeeFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const navigate = useNavigate()

  // Mock chart data
  const chartData = [
    { date: "2024-03-01", count: 12 },
    { date: "2024-03-02", count: 18 },
    { date: "2024-03-03", count: 9 },
  ]

  const departments = departmentsList;
  const users = usersList;

  // Filter and sort requests
  const filteredRequests = requests
    .filter(request => {
      const matchesStatus = statusFilter === "all" || request.status === statusFilter
      const matchesSearch = [
        request.requestNumber,
        request.studentName,
        request.phone,
        request.email
      ].some(value => value.toLowerCase().includes(searchQuery.toLowerCase()))
      
      return matchesStatus && request.department && request.assignedTo && matchesSearch
    })
    .sort((a, b) => dateOrder === "newest" 
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )

  return (
    <div className="p-6 space-y-6">
      {/* Chart Section */}
      <div className="bg-background p-4 rounded-lg border">
        <h2 className="text-lg font-semibold mb-4">Requests Per Day</h2>
        <div className="h-64">
          <BarChart width={800} height={250} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#2563eb" />
          </BarChart>
        </div>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={dateOrder} onValueChange={(value) => setDateOrder(value as "oldest" | "newest")}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>


          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map(dept => (
                <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        


          <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by employee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Employees</SelectItem>
              {users.map(emp => (
                <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        

        <Input
          placeholder="Search requests..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table Section */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request #</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Status</TableHead>
           <TableHead>Department</TableHead>
            <TableHead>Assigned To</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map(request => (
              <TableRow key={request.id}>
                <TableCell>{request.requestNumber}</TableCell>
                <TableCell>{request.studentName}</TableCell>
                <TableCell>{request.title}</TableCell>
                <TableCell>{request.phone}</TableCell>
                <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    request.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                    request.status === "in-progress" ? "bg-blue-100 text-blue-800" :
                    "bg-green-100 text-green-800"
                  }`}>
                    {request.status}
                  </span>
                </TableCell>
        
                  <TableCell>
                    {request.department.name}
                  </TableCell>
                
    
                  <TableCell>
                    <Select 
                      value={request.assignedTo.id} 
                      onValueChange={value => setRequests(prev => 
                        prev.map(req => 
                          req.id === request.id 
                            ? {...req, assignedTo: users.find(emp => emp.id === value) || req.assignedTo} 
                            : req
                        )
                      )}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Unassigned" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map(emp => (
                          <SelectItem key={emp.id} value={emp.id}>
                            {emp.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => navigate({ to: `/admin-portal/requests/${request.id}` })}>
                        View Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}