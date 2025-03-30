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
import {  badgeVariants } from "@/components/ui/badge"

const mockData = {
  departments: [
    { name: "Admissions", completed: 12, pending: 5, late: 2 },
    { name: "Registrar", completed: 8, pending: 3, late: 1 },
    { name: "Financial Aid", completed: 15, pending: 2, late: 0 },
  ],
  requests: [
    {
      id: "R001",
      title: "Document Verification",
      department: "Admissions",
      created: "2024-03-01",
      daysLate: 5,
      status: "pending",
    },
    // Add more mock data...
  ],
}

export function DashboardPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const filteredRequests = mockData.requests.filter(request => {
    const matchesDepartment = selectedDepartment === "all" || 
      request.department === selectedDepartment
    return request.status === "pending" && matchesDepartment
  })

  return (
    <div className="space-y-8 m-4">
        <div className="bg-background p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Department Requests Overview</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.departments}>
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
                <SelectItem value="Admissions">Admissions</SelectItem>
                <SelectItem value="Registrar">Registrar</SelectItem>
                <SelectItem value="Financial Aid">Financial Aid</SelectItem>
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
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.id}</TableCell>
                <TableCell>{request.title}</TableCell>
                <TableCell>{request.department}</TableCell>
                <TableCell>
                  {new Date(request.created).toLocaleDateString()}
                </TableCell>
                <TableCell>{request.daysLate}</TableCell>
                <TableCell>
                  <div
                    className={badgeVariants({ variant: request.status === "late" ? "destructive" : "default" }) + 'capitalize'}
                  >
                    {request.status}
                  </div>
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