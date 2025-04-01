import { useEffect, useState } from "react"
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
import { departmentsList } from "@/api/mock/departments"
import { useNavigate } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { fetchRequests } from "@/core/services/requestService"
import { Request, RequestStatus } from "@/core/models/Request.interface"
import { fetchDepartmentsReport } from "@/core/services/departmentService"
import { DepartmentReport } from "@/core/models/Department.interface"
import { useTranslation } from "react-i18next"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

export function DashboardPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [requests, setRequests] = useState<Request[]>([])
  const [departmentsReport, setDepartmentReport] = useState<DepartmentReport[]>([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    setLoading(true);
    const fetchAndSetDepartmentsReport = async () => {
      const values = await fetchDepartmentsReport();
      setDepartmentReport(values.data);
      setLoading(false);
    };
    try {
      fetchAndSetDepartmentsReport();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      toast(error.message)
    }
  }, [])
  

  useEffect(() => {
    setLoading(true);
    const fetchAndSetRequests = async () => {
      const values = await fetchRequests(selectedDepartment, RequestStatus.PENDING);
      setRequests(values.data);
      setLoading(false);
    };

    try {
      fetchAndSetRequests();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      toast(error.message)
    }
  }, [selectedDepartment]);

  if (loading) {
    return (
        <div className="p-6 space-y-4">
            <Skeleton className="h-10 w-[300px]" />
            <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                ))}
            </div>
        </div>
    )
}

  return (
    <div className="space-y-8 m-4">
      <div className="bg-background p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">
          {t("departmentRequestsOverview")}
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentsReport}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" stackId="a" fill="#16a34a" name={t("completed")} />
              <Bar dataKey="pending" stackId="a" fill="#eab308" name={t("pending")} />
              <Bar dataKey="late" stackId="a" fill="#dc2626" name={t("late")} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-background p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{t("lateRequests")}</h2>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder={t("filterByDepartment")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("allDepartments")}</SelectItem>
              {departmentsList.map((department) => (
                <SelectItem key={department.id} value={department.id!}>
                  {department.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("requestId")}</TableHead>
              <TableHead>{t("title")}</TableHead>
              <TableHead>{t("department")}</TableHead>
              <TableHead>{t("created")}</TableHead>
              <TableHead>{t("daysLate")}</TableHead>
              <TableHead>{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.id}</TableCell>
                <TableCell>{request.title}</TableCell>
                <TableCell>{request.department.name}</TableCell>
                <TableCell>
                  {new Date(request.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {Math.floor(
                    (new Date().getTime() - new Date(request.createdAt).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => navigate(`/admin-portal/requests/${request.id}`)}>
                        {t("viewDetails")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {requests.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            {t("noLateRequestsFound")}
          </div>
        )}
      </div>
    </div>
  )
}