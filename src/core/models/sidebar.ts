import { LucideIcon } from "lucide-react"

export interface SideBarItem {
    title: string
    url: string
    icon?: LucideIcon
    isAdmin?: boolean
    badge?: {
        new: number
        late: number
    }
}

