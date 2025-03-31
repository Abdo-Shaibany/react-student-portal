import { useState } from "react"
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
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

interface Department {
    id: string
    name: string
    totalRequests: number
}

export function DepartmentsPage() {
    const [departments, setDepartments] = useState<Department[]>([
        { id: "1", name: "Admissions", totalRequests: 24 },
        { id: "2", name: "Registrar", totalRequests: 42 },
        { id: "3", name: "Financial Aid", totalRequests: 15 },
    ]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // Filter and sort departments
    const filteredDepartments = departments
        .filter(dept => dept.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) =>
            sortOrder === "asc" ?
                a.totalRequests - b.totalRequests :
                b.totalRequests - a.totalRequests)

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

    const handleDelete = (id: string) => {
        setDepartments(prev => prev.filter(dept => dept.id !== id))
    }

    return (
        <div className="p-6 space-y-4">
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
                        <DepartmentForm
                            department={selectedDepartment}
                            onSubmit={handleSubmit}
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
                    {filteredDepartments.map((department) => (
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

            {/* Empty State */}
            {filteredDepartments.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                    No departments found
                </div>
            )}
        </div>
    )
}

// Department Form Component
function DepartmentForm({
    department,
    onSubmit,
}: {
    department?: Department | null
    onSubmit: (values: { name: string }) => void
}) {
    const [name, setName] = useState(department?.name || "")

    return (
        <form
            className="space-y-4"
            onSubmit={(e) => {
                e.preventDefault()
                onSubmit({ name })
            }}
        >
            <div className="space-y-2">
                <Label htmlFor="name">Department Name</Label>
                <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <Button type="submit" className="w-full">
                {department ? "Save Changes" : "Create Department"}
            </Button>
        </form>
    )
}