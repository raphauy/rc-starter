"use client"

import { Button } from "@/components/ui/button"
import { OTPSessionDAO } from "@/services/otpsession-services"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { format } from "date-fns"
import { DeleteOTPSessionDialog, OTPSessionDialog } from "./otpsession-dialogs"
import { formatWhatsAppStyle } from "@/lib/utils"


export const columns: ColumnDef<OTPSessionDAO>[] = [

  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="pl-0 dark:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          User
          <ArrowUpDown className="w-4 h-4 ml-1" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const data= row.original
      return (
        <div className="">
          <p>{data.user.name}</p>
          <p>{data.user.email}</p>
        </div>
      )
    }
  },
  
  {
    accessorKey: "device",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Device
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )},
    cell: ({ row }) => {
      const data= row.original
      return (
        <div className="">
          <p>{data.deviceBrowser}</p>
          <p>{data.deviceOs}</p>
        </div>
      )
    }
  },

  {
    accessorKey: "city",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            City
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )},
    cell: ({ row }) => {
      const data= row.original
      return (
        <div className="">
          <p>{data.city}</p>
          <p>{data.country}</p>
          <p>{data.ipAddress}</p>
        </div>
      )
    }
  },


  {
    accessorKey: "createdAt",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Dates
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )},
		cell: ({ row }) => {
      const data= row.original
      const expiration= data.tokenCheckExpiration ? format(data.tokenCheckExpiration, "dd/MM/yyyy HH:mm:ss") : "No disponible"
      return (
        <div>
          <p>Creado: {formatWhatsAppStyle(data.createdAt)}</p>
          <p>Actualizado: {formatWhatsAppStyle(data.updatedAt)}</p>
          <p>Token: {data.sessionTokenId}</p>
          <p>Expira: {expiration}</p>
        </div>
      )
    }
  },


  // {
  //   accessorKey: "role",
  //   header: ({ column }) => {
  //     return (
  //       <Button variant="ghost" className="pl-0 dark:text-white"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
  //         Rol
  //         <ArrowUpDown className="w-4 h-4 ml-1" />
  //       </Button>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const data= row.original

      const deleteDescription= `Do you want to delete OTPSession ${data.id}?`
 
      return (
        <div className="flex items-center justify-end gap-2">

          <OTPSessionDialog id={data.id} />
          <DeleteOTPSessionDialog description={deleteDescription} id={data.id} />
        </div>

      )
    },
  },
]


