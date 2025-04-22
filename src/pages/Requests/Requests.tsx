/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Request, RequestDailyCount } from "@/core/models/Request.interface";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isAdmin } from "@/core/services/loginService";
import { fetchRequestCountsDaily, fetchRequests } from "@/core/services/requestService";
import { toast } from "sonner";
// import { Skeleton } from "@/components/ui/skeleton";
import { Department } from "@/core/models/Department.interface";
import { User } from "@/core/models/User.interface";
import { fetchUsers } from "@/core/services/usersService";
import { fetchDepartments } from "@/core/services/departmentService";
import { RequestStatus } from "@/core/enum/requestStatus";

export function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [statusFilter, setStatusFilter] = useState<RequestStatus>(RequestStatus.ALL);
  const [dateOrder, setDateOrder] = useState<"desc" | "asc">("asc");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [employeeFilter, setEmployeeFilter] = useState("all");

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  const { t } = useTranslation();
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);

  const admin = isAdmin();

  const [chartData, setChartData] = useState<RequestDailyCount[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if(!admin) return;
    const fetchChartData = async () => {
      try {
        // setLoading(true)
        const report = await fetchRequestCountsDaily();
        setChartData(report);

        const _users = await fetchUsers();
        setUsers(_users);

        const _department = await fetchDepartments();
        setDepartments(_department);

        // setLoading(false)
      } catch (error: any) {
        toast.error(error.message || t("error.fetchUsers"));
      } finally {
        // setLoading(false);
      }
    };

    fetchChartData();
  }, [admin, t]);



  useEffect(() => {
    const fetchFilteredRequests = async () => {
      try {
        // setLoading(true);
        const values = await fetchRequests({selectedDepartment: departmentFilter, status: statusFilter, searchQuery, dateOrder, assignToId: employeeFilter});
        setRequests(values.data);
      } catch (error: any) {
        toast.error(error.message || t("error.fetchRequests"));
      } finally {
        // setLoading(false);
      }
    };

    fetchFilteredRequests();
  }, [departmentFilter, statusFilter, debouncedQuery, dateOrder, t, employeeFilter]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 600);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

    // if (loading) {
    //   return (
    //       <div className="p-6 space-y-4">
    //           <Skeleton className="h-10 w-[300px]" />
    //           <div className="space-y-2">
    //               {[...Array(5)].map((_, i) => (
    //                   <Skeleton key={i} className="h-12 w-full" />
    //               ))}
    //           </div>
    //       </div>
    //   )
    // }



  return (
    <div className="p-6 space-y-6">
      {/* Chart Section */}
      {admin && <div className="bg-background p-4 rounded-lg border">
        <h2 className="text-lg font-semibold mb-4">
          {t("chart.requestsPerDay")}
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>}

      {/* Filters Section */}
      <div className="flex flex-wrap gap-4">

        <Input
          placeholder={t("search.requests")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="md:flex-1 w-full"
        />

        <Select value={statusFilter} onValueChange={(value: RequestStatus) => setStatusFilter(value)}>
          <SelectTrigger>
            <SelectValue placeholder={t("filter.status")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RequestStatus.ALL}>{t("status.all")}</SelectItem>
            <SelectItem value={RequestStatus.PENDING}>{t(`status.${RequestStatus.PENDING}`)}</SelectItem>
            <SelectItem value={RequestStatus.IN_PROGRESS}>{t(`status.${RequestStatus.IN_PROGRESS}`)}</SelectItem>
            <SelectItem value={RequestStatus.COMPLETED}>{t(`status.${RequestStatus.COMPLETED}`)}</SelectItem>
          </SelectContent>
        </Select>

        <Select value={dateOrder} onValueChange={(value) => setDateOrder(value as "asc" | "desc")}>
          <SelectTrigger>
            <SelectValue placeholder={t("sort.date")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">{t("sort.newestFirst")}</SelectItem>
            <SelectItem value="asc">{t("sort.oldestFirst")}</SelectItem>
          </SelectContent>
        </Select>

        {admin && <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger>
            <SelectValue placeholder={t("filter.department")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("department.all")}</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept.id} value={dept.id!}>
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>}

        {admin && <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
          <SelectTrigger>
            <SelectValue placeholder={t("filter.employee")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("employee.all")}</SelectItem>
            {users.map((emp) => (
              <SelectItem key={emp.id} value={emp.id!}>
                {emp.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>}

      </div>

      {/* Table Section */}
      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("table.requestNumber")}</TableHead>
              <TableHead>{t("table.studentName")}</TableHead>
              <TableHead>{t("table.title")}</TableHead>
              <TableHead>{t("table.phone")}</TableHead>
              <TableHead>{t("table.createdAt")}</TableHead>
              <TableHead>{t("table.status")}</TableHead>
              <TableHead>{t("table.department")}</TableHead>
              <TableHead>{t("table.assignedTo")}</TableHead>
              <TableHead>{t("table.actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.requestNumber}</TableCell>
                <TableCell>{request.studentName}</TableCell>
                <TableCell>{request.title}</TableCell>
                <TableCell>{request.phone}</TableCell>
                <TableCell>
                  {/* {new Date(request.createdAtDate).toLocaleDateString()} */}
                  {request.createdAtDate}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${request.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : request.status === "inProgress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                      }`}
                  >
                    {request.status === "pending"
                      ? t("status.pending")
                      : request.status === "inProgress"
                        ? t("status.inProgress")
                        : t("status.completed")}
                  </span>
                </TableCell>
                <TableCell>{request.department.name}</TableCell>
                <TableCell>{request.assignedTo?.name}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() =>
                          navigate(`/admin-portal/requests/${request.id}`)
                        }
                      >
                        {t("action.viewDetails")}
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
  );
}

export default RequestsPage;
