import { MenuGroup } from "@/lib/utils"
import { Users, Settings, LayoutDashboard, FileText, Building2 } from "lucide-react"

export const adminMenu: MenuGroup[] = [
  {
    name: "Administración",
    items: [
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
          label: "Sesiones",
          href: "/admin/sessions"
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
    ],
  },
  {
    name: "Configuración",
    items: [
    {
      name: "Configuración",
      icon: <Settings className="h-4 w-4" />,
      href: "/admin/settings",
    },
    ],
  },
]

