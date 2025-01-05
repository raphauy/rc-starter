import { Geist } from "next/font/google"
import "@/app/globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Providers } from "@/components/layout/providers/providers"

const geist = Geist({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="es" className="h-full" suppressHydrationWarning>
      <body className={`${geist.className} h-full`}>
        <Providers>
          <div className="min-h-screen h-full flex flex-col">
            <Header />
            <main className="flex-1 flex h-full">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
