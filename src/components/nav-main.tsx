"use client"

import { type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  
} from "@/components/ui/sidebar"
import { badgeVariants } from "./ui/badge"
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    badge?: {
      new: number
      late: number
    }
  }[]
}) {
  const currentPath = window.location.pathname

  const navigate = useNavigate();

  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarMenu>
        {items.map((item) => {
          const isActive = currentPath === item.url

          return (
            <Collapsible
              key={item.title}
              asChild
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title} className={cn(
                        "transition-colors cursor-pointer",
                        isActive && "bg-slate-100 text-primary hover:bg-slate-100"
                      )} onClick={() => navigate(item.url)} >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        {item.icon && <item.icon className="h-4 w-4" />}
                        <span>{item.title}</span>
                      </div>
                      
                      <div className="flex gap-1">
                        {item.badge && (
                          <div className="flex gap-1">
                            <div className={badgeVariants({ variant: "default" })}>{item.badge.new}</div>
                            <div className={badgeVariants({ variant: "destructive" })}>{item.badge.late}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
  
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}