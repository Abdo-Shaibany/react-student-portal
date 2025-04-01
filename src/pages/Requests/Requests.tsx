import { useState } from "react";
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
import { departmentsList } from "@/api/mock/departments";
import { usersList } from "@/api/mock/users";
import { Request } from "@/core/models/Request.interface";
import { requestsList } from "@/api/mock/requests";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function RequestsPage() {
  const [requests] = useState<Request[]>(requestsList);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateOrder, setDateOrder] = useState<"oldest" | "newest">("newest");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [employeeFilter, setEmployeeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Mock chart data
  const chartData = [
    { date: "2024-03-01", count: 12 },
    { date: "2024-03-02", count: 18 },
    { date: "2024-03-03", count: 9 },
  ];

  // Use static lists for departments and users
  const departments = departmentsList;
  const users = usersList;

  // Filter and sort requests
  const filteredRequests = requests
    .filter(request => {
      const matchesStatus = statusFilter === "all" || request.status === statusFilter;
      const matchesSearch = [
        request.requestNumber,
        request.studentName,
        request.phone,
        request.email,
      ].some(value => value.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesStatus && request.department && request.assignedTo && matchesSearch;
    })
    .sort((a, b) =>
      dateOrder === "newest"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  return (
    <div className="p-6 space-y-6">
      {/* Chart Section */}
      <div className="bg-background p-4 rounded-lg border">
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
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder={t("filter.status")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("status.all")}</SelectItem>
            <SelectItem value="pending">{t("status.pending")}</SelectItem>
            <SelectItem value="in-progress">{t("status.inProgress")}</SelectItem>
            <SelectItem value="completed">{t("status.completed")}</SelectItem>
          </SelectContent>
        </Select>

        <Select value={dateOrder} onValueChange={(value) => setDateOrder(value as "oldest" | "newest")}>
          <SelectTrigger>
            <SelectValue placeholder={t("sort.date")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">{t("sort.newestFirst")}</SelectItem>
            <SelectItem value="oldest">{t("sort.oldestFirst")}</SelectItem>
          </SelectContent>
        </Select>

        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
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
        </Select>

        <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
          <SelectTrigger>
            <SelectValue placeholder={t("filter.employee")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("employee.all")}</SelectItem>
            {users.map((emp) => (
              <SelectItem key={emp.id} value={emp.id}>
                {emp.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder={t("search.requests")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
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
            {filteredRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.requestNumber}</TableCell>
                <TableCell>{request.studentName}</TableCell>
                <TableCell>{request.title}</TableCell>
                <TableCell>{request.phone}</TableCell>
                <TableCell>
                  {new Date(request.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      request.status === "pending"
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
                <TableCell>{request.assignedTo.name}</TableCell>
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
