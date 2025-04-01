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
import { getUser, isAdmin } from "@/core/services/loginService"
import { useEffect, useState } from "react"
import { getRequestTodayReport } from "@/core/services/requestService"
import { toast } from "sonner"
import { User } from "@/core/models/User.interface"
import { sidebarPages } from "@/core/enum/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const side = localStorage.getItem('i18nextLng') === 'ar' ? 'right' : 'left';

  const { t } = useTranslation();

  const admin = isAdmin();
  const [pages, setPages] = useState(sidebarPages(t).filter(page => page.isAdmin === admin));


  const [user, setUser] = useState<User>({
    phone: '',
    departmentId: "",
    name: "",
    totalRequests: 0
  });

  useEffect(() => {
    const handleAsyncTodayReport = async () => {
      try {
        const response = await getRequestTodayReport();
        setPages(sidebarPages(t).filter(page => {
          if(admin) return page;
          return page.isAdmin !== admin
        }).map(page => {
          if (page.title === t('navMain.studentRequests')) {
            return {
              ...page,
              badge: {
                late: response.data.late,
                new: response.data.pending
              }
            }
          }
          return page
        }));
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    
    setUser(getUser());

    handleAsyncTodayReport();
  }, [t, admin])


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
