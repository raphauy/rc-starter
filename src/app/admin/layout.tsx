"use client"

import { AdminSidebar } from "@/components/layout/admin-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-[calc(100vh-65px)] overflow-hidden w-full">
      <SidebarProvider className="h-full flex">
        <div className="flex h-full w-full">
          <AdminSidebar />
          <div className="flex-1 overflow-auto w-full">
            <main className="p-6 w-full">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
} 