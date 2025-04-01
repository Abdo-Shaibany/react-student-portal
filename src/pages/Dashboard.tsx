import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { requestsList } from "@/api/mock/requests"
import { departmentsList } from "@/api/mock/departments"
import { useNavigate } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"


// TODO: handle language
export function DashboardPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const navigate = useNavigate();

  // TODO: fetch request with pending status and with selected department
  const filteredRequests = requestsList.filter(request => {
    const filtered = selectedDepartment === "all" ? true : (request.department.id === selectedDepartment);
    return request.status === "pending" && filtered;
  })

  // TODO: fetch department report from backend
  const departmentsReport: {
    name: string
    completed: number
    pending: number
    late: number
  }[] = departmentsList.map(department => {
    const completed = requestsList.filter(request => request.department.id === department.id && request.status === "completed").length
    const today = new Date().toISOString().split('T')[0]
    const pending = requestsList.filter(request => request.department.id === department.id && request.status === "pending" && request.createdAt.split('T')[0] === today).length
    const late = requestsList.filter(request => request.department.id === department.id && request.status === "pending" && request.createdAt.split('T')[0] < today).length
    return {
      name: department.name,
      completed,
      pending,
      late,
    }
  })

  return (
    <div className="space-y-8 m-4">
        <div className="bg-background p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Department Requests Overview</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentsReport}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" stackId="a" fill="#16a34a" name="Completed" />
                <Bar dataKey="pending" stackId="a" fill="#eab308" name="Pending" />
                <Bar dataKey="late" stackId="a" fill="#dc2626" name="Late" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      
      <div className="bg-background p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Late Requests</h2>
   
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departmentsList.map(department => (
                  <SelectItem key={department.id} value={department.id}>{department.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Days Late</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.id}</TableCell>
                <TableCell>{request.title}</TableCell>
                <TableCell>{request.department.name}</TableCell>
                <TableCell>
                  {new Date(request.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {Math.floor((new Date().getTime() - new Date(request.createdAt).getTime()) / (1000 * 60 * 60 * 24))}
                </TableCell>
                
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => navigate(`/admin-portal/requests/${request.id}`)}>
                        View Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredRequests.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            No late requests found
          </div>
        )}
      </div>
    </div>
  )
}