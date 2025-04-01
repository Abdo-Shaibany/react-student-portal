import { useState, useEffect } from "react"
import { toast } from "sonner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Department } from "@/core/models/Department.interface"
import { Skeleton } from "@/components/ui/skeleton"
import { DepartmentForm } from "./DepartmentForm"
import { createDepartment, deleteDepartmentById, fetchDepartments, updateDepartment } from "@/core/services/departmentService"
import { t } from "i18next"
import ConfirmationModal from "@/components/confirm-deletion"

export function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const pageSize = 10;



  const fetchAndSetDepartments = async () => {
    setLoading(true);
    const values = await fetchDepartments(sortOrder, searchQuery, pageSize, page);
    setDepartments(values);
    setLoading(false);
  };

  useEffect(() => {
    const fetchAndSetDepartments = async () => {
      setLoading(true);
      const values = await fetchDepartments(sortOrder, searchQuery, pageSize, page);
      setDepartments(values);
      setLoading(false);
    };

    try {
      fetchAndSetDepartments();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      toast(error.message)
    }
  }, [sortOrder, searchQuery, pageSize, page])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectDepartmentId, setDepartmentId] = useState<string | null>(null);


  const handleDeleteClick = (id: string) => {
    setDepartmentId(id);
    setIsModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setDepartmentId(null);
  };

  // Handle delete
  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      await deleteDepartmentById(selectDepartmentId!);
      fetchAndSetDepartments();
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      toast(error.message)
    }
  };

  const handleSubmit = (values: { name: string }) => {
    const updateOrcreateDepartment = async () => {
      setLoading(true);
      if (isEditMode && selectedDepartment) {
        await updateDepartment({ ...selectedDepartment, name: values.name });
      } else {
        await createDepartment({ name: values.name });
      }
      fetchAndSetDepartments();
      setLoading(false);
    }

    try {
      updateOrcreateDepartment();
      setIsDialogOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      toast(error.message)
    }
  }

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
    <div className="p-6 space-y-4">
      {/* Header with Search and Create Button */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <Input
          placeholder={t('Search departments...')}
          className="max-w-xs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setIsEditMode(false);
                setSelectedDepartment(null);
              }}
            >
              {t('Create Department')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? t('Edit Department') : t('Create New Department')}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="sr-only">
              {isEditMode
                ? t('Modify department details')
                : t('Add a new department to the system')}
            </DialogDescription>
            <DepartmentForm
              department={selectedDepartment}
              onSubmit={(values) => {
                handleSubmit(values);
                toast.success(
                  t(`Department ${isEditMode ? 'updated' : 'created'}!`)
                );
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Departments Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('Department Name')}</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() =>
                  setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
                }
              >
                {t('Total Requests')} {sortOrder === 'asc' ? '↑' : '↓'}
              </Button>
            </TableHead>
            <TableHead>{t('Actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departments.map((department) => (
            <TableRow key={department.id}>
              <TableCell>{department.name}</TableCell>
              <TableCell>{department.totalRequests}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        setIsEditMode(true);
                        setSelectedDepartment(department);
                        setIsDialogOpen(true);
                      }}
                    >
                      {t('Edit')}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDeleteClick(department.id!)}
                    >
                      {t('Delete')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-start gap-2">
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          {t('Previous')}
        </Button>
        <span className="flex items-center px-4">
          {t('Page {{page}}', { page })}
        </span>
        <Button
          variant="outline"
          onClick={() => setPage((p) => p + 1)}
          disabled={page * pageSize >= departments.length}
        >
          {t('Next')}
        </Button>
      </div>

      {/* Empty State */}
      {departments.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          {t('No departments found')}
        </div>
      )}


      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  )
}

