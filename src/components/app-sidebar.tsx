/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"

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
import { getUser } from "@/core/services/loginService"
import { useEffect, useState } from "react"
// import { getRequestTodayReport } from "@/core/services/requestService"
// import { toast } from "sonner";
import { StudentUser, User } from "@/core/models/User.interface"
import { sidebarPages } from "@/core/enum/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const side = localStorage.getItem('i18nextLng') === 'ar' ? 'right' : 'left';

  const { t } = useTranslation();

  const pages = sidebarPages(t);


  const [user, setUser] = useState<User | StudentUser>({
    phone: '',
    departmentId: "",
    name: "",
    totalRequests: 0,
    isAdmin: false,
  });

  useEffect(() => {
    // const handleAsyncTodayReport = async () => {
    //   try {
    //     const response = await getRequestTodayReport();
    //     setPages(sidebarPages(t).filter(page => {
    //       if(isAdmin()) return true;
    //       return page.isAdmin !== true;
    //     }).map(page => {
    //       if (page.title === t('navMain.studentRequests')) {
    //         return {
    //           ...page,
    //           badge: {
    //             late: response.late,
    //             new: response.pending
    //           }
    //         }
    //       }
    //       return page
    //     }));
    //   } catch (error: any) {
    //     toast.error(error.message);
    //   }
    // }
    
    setUser(getUser());

    // handleAsyncTodayReport();
  }, [t])


  return (
    <Sidebar collapsible="offcanvas" side={side} {...props}>
      <SidebarHeader>
        <SystemBrand />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={pages} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
