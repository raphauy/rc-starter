import { MenuItem } from "@/lib/utils"
import {
  Users,
  Settings,
  LayoutDashboard,
  FileText,
  Building2,
  User
} from "lucide-react"


export const adminMenu: MenuItem[] = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
    href: "/admin",
  },
  {
    name: "Usuarios",
    icon: <Users className="h-4 w-4" />,
    href: "/admin/users",
    subItems:[
      {
        label: "Crear",
        href: "/admin"
      },
      {
        label: "Listar",
        href: "/admin/users"
      }
    ]
  },
  {
    name: "Empresas",
    icon: <Building2 className="h-4 w-4" />,
    href: "/admin/companies",
  },
  {
    name: "Documentos",
    icon: <FileText className="h-4 w-4" />,
    href: "/admin/documents",
  },
  {
    name: "Configuración",
    icon: <Settings className="h-4 w-4" />,
    href: "/admin/settings",
  },
] 