import "@/app/globals.css"
import { SidebarComponent } from "@/components/layout/sidebar-component"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Loader } from "lucide-react"
import { Suspense } from "react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="w-full h-full">
      <SidebarProvider className="h-full flex">
        <div className="flex h-full w-full">
          <div className="w-[16rem]">
            <SidebarComponent />
          </div>
          
          <main className="p-2 w-full flex-1 overflow-auto mt-10 md:mt-0">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}
