import { Separator } from "@/components/ui/separator"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { getBreadcrumbItems } from "@/lib/breadcrumb"
import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { ToggleLanguage } from "@/components/toggle-language"

export default function EmployeeLayout() {
  const currentPath = window.location.pathname
  const [breadcrumbItems, setBreadcrumbItems] = useState(getBreadcrumbItems(currentPath));

  const labelKey = localStorage.getItem('i18nextLng') === 'ar' ? 'labelAr' : 'label';
  const location = useLocation();

  useEffect(() => {
    const handleUrlChange = () => {
      const currentPath = window.location.pathname
      const breadcrumbItems = getBreadcrumbItems(currentPath);
      setBreadcrumbItems(breadcrumbItems);
    };

    handleUrlChange();
  }, [location]);



  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
            {breadcrumbItems.map((item, index) => (
                <span key={item.href} className="flex items-center gap-2">
                  <BreadcrumbItem>
                    {index === breadcrumbItems.length - 1 ? (
                      <BreadcrumbPage>{item[labelKey]}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={item.href}>
                        {item[labelKey]}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbItems.length - 1 && (
                    <BreadcrumbSeparator />
                  )}
                </span>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex-1"></div>
          <ToggleLanguage></ToggleLanguage>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}