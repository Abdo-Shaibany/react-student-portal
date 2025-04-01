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
import { useTranslation } from "react-i18next"
import { isAdmin } from "@/core/services/loginService"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const side = localStorage.getItem('i18nextLng') === 'ar' ? 'right' : 'left';

  const { t } = useTranslation();

  const pages = [
    {
      title: t('navMain.dashboard'),
      url: "/admin-portal/dashboard",
      icon: Home,
      isAdmin: true,
    },
    {
      title: t('navMain.departments'),
      url: "/admin-portal/departments",
      icon: LayoutDashboard,
      isAdmin: true,
    },
    {
      title: t('navMain.userManagement'),
      url: "/admin-portal/users",
      icon: Users,
      isAdmin: true
    },
    {
      title: t('navMain.studentRequests'),
      url: "/admin-portal/requests",
      icon: FileText,
      badge: {
        new: 5,
        late: 2
      },
      isAdmin: false,
    }
  ];

  const admin = isAdmin();

  const data = {
    user: {
      name: "shadcn",
      email: "771402072",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: admin ? pages : pages.filter((item) => item.isAdmin === false),
  }

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
