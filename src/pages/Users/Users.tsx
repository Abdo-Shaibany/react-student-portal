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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { usersList } from "@/api/mock/users"
import { User } from "@/models/User.interface"
import { departmentsList } from "@/api/mock/departments"
import { UserForm } from "./UserForm"




export function UsersPage() {
  const [users, setUsers] = useState<User[]>(usersList)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  // Filter and sort users
  const filteredUsers = users
    .filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => sortOrder === "asc" ? a.totalRequests - b.totalRequests : b.totalRequests - a.totalRequests)

  const handleSubmit = (values: User) => {
    if (isEditMode && selectedUser) {
      setUsers(prev => prev.map(user => user.id === selectedUser.id ? values : user))
    } else {
      setUsers(prev => [...prev, { ...values, id: (prev.length + 1).toString(), totalRequests: 0 }])
    }
    setIsDialogOpen(false)
  }

  const handleDelete = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id))
  }

  return (
    <div className="p-6 space-y-4">
      {/* Header with Search and Create Button */}
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search users..."
          className="max-w-xs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setIsEditMode(false)
              setSelectedUser(null)
            }}>
              Create User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? "Edit User" : "Create New User"}
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
              >
                Requests Handled {sortOrder === "asc" ? "↑" : "↓"}
              </Button>
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.department?.name ?? "unassing"}</TableCell>
              <TableCell>{user.totalRequests}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        setIsEditMode(true)
                        setSelectedUser(user)
                        setIsDialogOpen(true)
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDelete(user.id)}
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
      {filteredUsers.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No users found
        </div>
      )}
    </div>
  )
}

