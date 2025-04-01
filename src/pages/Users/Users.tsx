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
import { User, UserFormData } from "@/core/models/User.interface";
import { UserForm } from "./UserForm";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { createUser, deleteUser, fetchUsers, updateUser } from "@/core/services/usersService";
import { fetchDepartments } from "@/core/services/departmentService";
import { Department } from "@/core/models/Department.interface";
import ConfirmationModal from '@/components/confirm-deletion';

export function UsersPage() {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true)
        const filtered = await fetchUsers(searchQuery, sortOrder);
        setUsers(filtered);
      } catch (error: any) {
        toast.error(error.message || t("error.fetchUsers"));
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, [searchQuery, sortOrder, t]);

  useEffect(() => {
    const getDeprtments = async () => {
      try {
        setLoading(true);
        const deps = await fetchDepartments();
        setDepartments(deps);
      } catch (error: any) {
        toast.error(error.message || t("error.submitUser"));
      } finally {
        setLoading(false);
        setIsDialogOpen(false);
      }
    }

    getDeprtments();
  }, [t]);

  const handleSubmit = async (values: UserFormData) => {
    setLoading(true);
    try {
      if (isEditMode && selectedUser) {
        await updateUser(values.id!, values);
        toast.success(t("success.userUpdated"));
      } else {
        await createUser(values);
        toast.success(t("success.userCreated"));
      }

      const filtered = await fetchUsers(searchQuery, sortOrder);
      setUsers(filtered);
    } catch (error: any) {
      toast.error(error.message || t("error.submitUser"));
    } finally {
      setLoading(false);
      setIsDialogOpen(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  // Handle delete
  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await deleteUser(selectedUserId!);
      toast.success(t("success.userDeleted"));
      const filtered = await fetchUsers(searchQuery, sortOrder);
      setUsers(filtered);
    } catch (error: any) {
      toast.error(error.message || t("error.deleteUser"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      {/* Header with Search and Create Button */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
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
              departments={departments}
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
            {users.map((user) => (
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
                        onClick={() => handleDeleteClick(user.id!)}
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
      {users.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          {t("form.noUsersFound")}
        </div>
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default UsersPage;
