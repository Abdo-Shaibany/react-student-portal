import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Department } from "@/core/models/Department.interface"
import { useState } from "react"

// export function DepartmentForm({
//     department,
//     onSubmit,
// }: {
//     department?: Department | null
//     onSubmit: (values: { name: string }) => void
// }) {
//     const [name, setName] = useState(department?.name || "")

//     return (
//         <form
//             className="space-y-4"
//             onSubmit={(e) => {
//                 e.preventDefault()
//                 onSubmit({ name })
//             }}
//         >
//             <div className="space-y-2">
//                 <Label htmlFor="name">Department Name</Label>
//                 <Input
//                     id="name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                 />
//             </div>
//             <Button type="submit" className="w-full">
//                 {department ? "Save Changes" : "Create Department"}
//             </Button>
//         </form>
//     )
// }

// Department Form Component
export function DepartmentForm({
    department,
    onSubmit,
  }: {
    department?: Department | null
    onSubmit: (values: { name: string }) => void
  }) {
    const [name, setName] = useState(department?.name || "")
    const [error, setError] = useState("")
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      
      if (!name.trim()) {
        setError("Department name is required")
        return
      }
      
      if (name.length < 3) {
        setError("Name must be at least 3 characters")
        return
      }
  
      onSubmit({ name })
    }
  
    return (
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="name">Department Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setError("")
            }}
            aria-invalid={!!error}
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
        <Button type="submit" className="w-full">
          {department ? "Save Changes" : "Create Department"}
        </Button>
      </form>
    )
  }