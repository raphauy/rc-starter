import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { auth } from "./auth"

export type MenuItem = {
  name: string
  icon?: React.ReactNode
  href: string
  subItems?: {
    label: string
    icon?: React.ReactNode
    href: string
  }[]
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getCurrentUser() {
  const session = await auth()

  return session?.user
}
