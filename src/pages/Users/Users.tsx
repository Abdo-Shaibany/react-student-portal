/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { usersList } from "@/api/mock/users";
import { User, UserFormData } from "@/core/models/User.interface";
import { departmentsList } from "@/api/mock/departments";
import { UserForm } from "./UserForm";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export function UsersPage() {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>(usersList);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Simulate fetching users from the backend with search and order
  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        const filtered = usersList
          .filter((user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .sort((a, b) =>
            sortOrder === "asc"
              ? a.totalRequests - b.totalRequests
              : b.totalRequests - a.totalRequests
          );
        setUsers(filtered);
      } catch (error: any) {
        toast.error(error.message || t("error.fetchUsers"));
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [searchQuery, sortOrder, t]);

  // Handle create and update
  const handleSubmit = (values: UserFormData) => {
    setLoading(true);
    try {
      if (isEditMode && selectedUser) {
        setUsers((prev) =>
          prev.map((user) => (user.id === selectedUser.id ? { ...user, ...values } : user))
        );
        toast.success(t("success.userUpdated"));
      } else {
        setUsers((prev) => [
          ...prev,
          { ...values, id: (prev.length + 1).toString(), totalRequests: 0 },
        ]);
        toast.success(t("success.userCreated"));
      }
    } catch (error: any) {
      toast.error(error.message || t("error.submitUser"));
    } finally {
      setLoading(false);
      setIsDialogOpen(false);
    }
  };

  // Handle delete
  const handleDelete = (id: string) => {
    setLoading(true);
    try {
      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast.success(t("success.userDeleted"));
    } catch (error: any) {
      toast.error(error.message || t("error.deleteUser"));
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users;

  return (
    <div className="p-6 space-y-4">
      {/* Header with Search and Create Button */}
      <div className="flex items-center justify-between">
        <Input
          placeholder={t("form.searchUsers")}
          className="max-w-xs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setIsEditMode(false);
                setSelectedUser(null);
              }}
            >
              {t("form.createUser")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? t("form.editUser") : t("form.createNewUser")}
              </DialogTitle>
            </DialogHeader>
            <UserForm
              user={selectedUser}
              departments={departmentsList}
              onSubmit={handleSubmit}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Users Table */}
      {loading ? (
        <div className="text-center py-8">{t("loading")}</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("form.name")}</TableHead>
              <TableHead>{t("form.phone")}</TableHead>
              <TableHead>{t("form.department")}</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() =>
                    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                  }
                >
                  {t("form.requestsHandled")} {sortOrder === "asc" ? "↑" : "↓"}
                </Button>
              </TableHead>
              <TableHead>{t("form.actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.department?.name ?? t("form.unassigned")}</TableCell>
                <TableCell>{user.totalRequests}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => {
                          setIsEditMode(true);
                          setSelectedUser(user);
                          setIsDialogOpen(true);
                        }}
                      >
                        {t("form.edit")}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDelete(user.id)}
                      >
                        {t("form.delete")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          {t("form.noUsersFound")}
        </div>
      )}
    </div>
  );
}

export default UsersPage;
