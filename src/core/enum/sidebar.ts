import { TFunction } from "i18next";
import { FileText, Home, LayoutDashboard, Users } from "lucide-react";
import { SideBarItem } from "../models/sidebar";

export const sidebarPages = (t: TFunction<"translation", undefined>): SideBarItem[] => [
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
        isAdmin: false,
    }
]