import { TFunction } from "i18next";
import { FileText, Home, LayoutDashboard, Settings2, Users } from "lucide-react";
import { SideBarItem } from "../models/sidebar";
import { AppRoutes } from "./routes";
import { isAdmin, isStudent } from "../services/loginService";

export const sidebarPages = (t: TFunction<"translation", undefined>): SideBarItem[] => {

    const admin = isAdmin();
    const student = isStudent();

    const list = [
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
    ];

    if (!student) {
        return list.filter(page => page.isAdmin === admin);
    }

    return [...list.filter(page => page.isAdmin === admin), {
        title: t('Student Request Form'),
        url: AppRoutes.STUDENT_FORM,
        icon: FileText,
        isAdmin: false,
    },];
}

