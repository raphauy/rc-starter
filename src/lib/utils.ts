import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { auth } from "./auth"
import { format, isThisWeek } from "date-fns"
import { isYesterday } from "date-fns"
import { isToday } from "date-fns"
import { parseISO } from "date-fns"
import { es } from "date-fns/locale";

export type MenuGroup = {
  name: string
  items: MenuItem[]
}

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

export function formatWhatsAppStyle(date: Date | string): string {

  const parsedDate = typeof date === 'string' ? parseISO(date) : date;

  if (isToday(parsedDate)) {
    return format(parsedDate, 'HH:mm');
  } else if (isYesterday(parsedDate)) {
    return 'Ayer';
  } else if (isThisWeek(parsedDate)) {
    return format(parsedDate, 'eeee', { locale: es });
  } else {
    return format(parsedDate, 'dd/MM/yyyy');
  }
}
