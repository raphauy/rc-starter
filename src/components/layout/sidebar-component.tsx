"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarTrigger, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, useSidebar } from "@/components/ui/sidebar"
import { adminMenu } from "@/app/admin/admin-menu"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { MenuGroup, MenuItem } from "@/lib/utils"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SheetTitle } from "@/components/ui/sheet"

export function SidebarComponent() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const userRole = session?.user?.role
  const { isMobile, openMobile, setOpenMobile } = useSidebar()

  const [menu, setMenu] = useState<MenuGroup[] | null>(null)

  useEffect(() => {
    if (userRole === "ADMIN" && pathname.startsWith("/admin")) {
      setMenu(adminMenu)
    } else {
      setMenu(null)
    }
  }, [userRole, pathname])

  if (!menu) return null

  const handleMenuClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed left-4 z-40 top-[4rem] mt-1"
        onClick={() => setOpenMobile(true)}
      >
        <Menu />
      </Button>
      <Sidebar variant="floating" collapsible="icon" className="top-[4rem] h-[calc(100vh-4rem)]">
        <SidebarHeader className="h-8 flex items-end mr-0.5">
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent className="block">
          {
            menu.map((group) => (
              <SidebarGroup key={group.name}>
                <SidebarGroupLabel>{group.name}</SidebarGroupLabel>
                <SidebarGroupContent>
                  {getMenuItems(group.items, pathname, handleMenuClick)}
                </SidebarGroupContent>
              </SidebarGroup>
            ))
          }
        </SidebarContent>
      </Sidebar>
    </>
  )
} 

function getMenuItems(menuItems: MenuItem[], pathname: string, onMenuClick: () => void) {
  return (
    <SidebarMenu>
    {menuItems.map((item) => (
      <SidebarMenuItem key={item.name}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            tooltip={item.name}
            onClick={onMenuClick}
          >
            <Link href={item.href}>
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </SidebarMenuButton>
          {item.subItems && item.subItems.length > 0 && (
            <SidebarMenuSub>
              {item.subItems.map((subItem) => (
                <SidebarMenuSubItem key={subItem.href}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={pathname === subItem.href}
                    onClick={onMenuClick}
                  >
                    <Link href={subItem.href}>
                      {subItem.icon}
                      <span>{subItem.label}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          )}
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}