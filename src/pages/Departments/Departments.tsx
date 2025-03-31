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
import { Department } from "@/models/Department.interface"
import { departmentsList } from "@/api/mock/departments"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert } from "@/components/ui/alert"
import { DepartmentForm } from "./DepartmentForm"

export function DepartmentsPage() {
    const [departments, setDepartments] = useState<Department[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [error, setError] = useState("")
    const pageSize = 10

    useEffect(() => {
        const timer = setTimeout(() => {
            if (Math.random() < 0.3) {
                setError("Failed to load departments. Please try refreshing the page.")
            } else {
                setDepartments(departmentsList)
            }
            setLoading(false)
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    const filteredDepartments = departments
        .filter(dept => dept.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => sortOrder === "asc" ? a.totalRequests - b.totalRequests : b.totalRequests - a.totalRequests)

    const paginatedData = filteredDepartments.slice((page - 1) * pageSize, page * pageSize)

    const handleDelete = (id: string) => {
        const deletedDept = departments.find(d => d.id === id)
        setDepartments(prev => prev.filter(dept => dept.id !== id))

        toast("Department deleted", {
            action: {
                label: "Undo",
                onClick: () => {
                    if (deletedDept) {
                        setDepartments(prev => [...prev, deletedDept])
                    }
                },
            },
        })
    }

    const handleSubmit = (values: { name: string }) => {
        if (isEditMode && selectedDepartment) {
            // Update existing department
            setDepartments(prev =>
                prev.map(dept =>
                    dept.id === selectedDepartment.id ?
                        { ...dept, name: values.name } : dept))
        } else {
            // Create new department
            setDepartments(prev => [
                ...prev,
                {
                    id: (prev.length + 1).toString(),
                    name: values.name,
                    totalRequests: 0,
                }
            ])
        }
        setIsDialogOpen(false)
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
            {error && (
                <Alert variant="destructive" className="mb-4">
                    {error}
                </Alert>
            )}

            {/* Header with Search and Create Button */}
            <div className="flex items-center justify-between">
                <Input
                    placeholder="Search departments..."
                    className="max-w-xs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => {
                            setIsEditMode(false)
                            setSelectedDepartment(null)
                        }}>
                            Create Department
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {isEditMode ? "Edit Department" : "Create New Department"}
                            </DialogTitle>
                        </DialogHeader>
                        <DialogDescription className="sr-only">
                            {isEditMode ? "Modify department details" : "Add a new department to the system"}
                        </DialogDescription>
                        <DepartmentForm
                            department={selectedDepartment}
                            onSubmit={(values) => {
                                handleSubmit(values);
                                toast.success(`Department ${isEditMode ? 'updated' : 'created'}!`)
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Departments Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Department Name</TableHead>
                        <TableHead>
                            <Button
                                variant="ghost"
                                onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
                            >
                                Total Requests {sortOrder === "asc" ? "↑" : "↓"}
                            </Button>
                        </TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedData.map((department) => (
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
                                                setIsEditMode(true)
                                                setSelectedDepartment(department)
                                                setIsDialogOpen(true)
                                            }}
                                        >
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="text-red-600"
                                            onClick={() => handleDelete(department.id)}
                                        >
                                            Delete
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
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                >
                    Previous
                </Button>
                <span className="flex items-center px-4">Page {page}</span>
                <Button
                    variant="outline"
                    onClick={() => setPage(p => p + 1)}
                    disabled={page * pageSize >= filteredDepartments.length}
                >
                    Next
                </Button>
            </div>

            {/* Empty State */}
            {filteredDepartments.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                    No departments found
                </div>
            )}
        </div>
    )
}

