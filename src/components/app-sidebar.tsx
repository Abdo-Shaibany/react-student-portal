import * as React from "react"

import {
  Home,
  LayoutDashboard,
  Users,
  FileText,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { SystemBrand } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "771402072",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin-portal/dashboard",
      icon: Home,
    },
    {
      title: "Departments",
      url: "/admin-portal/departments",
      icon: LayoutDashboard,
    },
    {
      title: "User Management",
      url: "/admin-portal/users",
      icon: Users,
    },
    {
      title: "Student Requests",
      url: "/admin-portal/requests",
      icon: FileText,
      badge: {
        new: 5,
        late: 2
      }
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const side = localStorage.getItem('i18nextLng') === 'ar' ? 'right' : 'left';

  return (
    <Sidebar collapsible="offcanvas" side={side} {...props}>
      <SidebarHeader>
        <SystemBrand />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
