import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Department } from "@/models/Department.interface"
import { User } from "@/models/User.interface"
import { useState } from "react"

// User Form Component
export function UserForm({
    user,
    departments,
    onSubmit
  }: {
    user?: User | null
    departments: Department[]
    onSubmit: (values: User) => void
  }) {
    const [name, setName] = useState(user?.name || "")
    const [email, setEmail] = useState(user?.email || "")
    const [password, setPassword] = useState("")
    const [department, setDepartment] = useState(user?.department)
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit({
        id: user?.id || "",
        name,
        email,
        password: password || "default-password", // In real app, handle properly
        departmentId: department?.id ?? "0",
        totalRequests: user?.totalRequests || 0
      })
    }
  
    return (
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
  
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
  
        {!user && (
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        )}
  
        <div className="space-y-2">
          <Label>Department</Label>
          <Select value={department?.id} onValueChange={(id) => setDepartment(departments.find(dept => dept.id === id))}>
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.id}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
  
        <Button type="submit" className="w-full">
          {user ? "Save Changes" : "Create User"}
        </Button>
      </form>
    )
  }