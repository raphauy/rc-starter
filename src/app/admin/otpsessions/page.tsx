import { getFullOTPSessionsDAO } from "@/services/otpsession-services"
import { OTPSessionDialog } from "./otpsession-dialogs"
import { DataTable } from "./otpsession-table"
import { columns } from "./otpsession-columns"

export const dynamic = 'force-dynamic'

export default async function OTPSessionPage() {
  
  const data= await getFullOTPSessionsDAO()

  return (
    <div className="w-full">      

      <div className="flex justify-end mx-auto my-2">
        <OTPSessionDialog />
      </div>

      <div className="container bg-white p-3 py-4 mx-auto border rounded-md text-muted-foreground dark:text-white dark:bg-black">
        <DataTable columns={columns} data={data} subject="OTPSession"/>      
      </div>
    </div>
  )
}
  
