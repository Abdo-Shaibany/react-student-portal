import { TFunction } from "i18next";
import { FileText, Home, LayoutDashboard, Settings2, Users } from "lucide-react";
import { SideBarItem } from "../models/sidebar";
import { AppRoutes } from "./routes";

export const sidebarPages = (t: TFunction<"translation", undefined>): SideBarItem[] => [
    {
        title: t('navMain.dashboard'),
        url: AppRoutes.DASHBOARD,
        icon: Home,
        isAdmin: true,
    },
    {
        title: t('navMain.departments'),
        url: AppRoutes.DEPARTMENTS,
        icon: LayoutDashboard,
        isAdmin: true,
    },
    {
        title: t('navMain.requestTypes'),
        url: AppRoutes.REQUESTS_TYPES,
        icon: Settings2,
        isAdmin: true,
    },
    {
        title: t('navMain.studentUserManagement'),
        url: AppRoutes.STUDNETS_USERS,
        icon: Users,
        isAdmin: true
    },
    {
        title: t('navMain.userManagement'),
        url: AppRoutes.USERS,
        icon: Users,
        isAdmin: true
    },
    {
        title: t('navMain.studentRequests'),
        url: AppRoutes.REQUESTS,
        icon: FileText,
        isAdmin: false,
    },
]