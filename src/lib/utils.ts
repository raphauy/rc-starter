import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { auth } from "./auth"
import { format, isThisWeek } from "date-fns"
import { isYesterday } from "date-fns"
import { isToday } from "date-fns"
import { parseISO } from "date-fns"
import { es } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";

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
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Fecha inválida');
    }

    const timezone = "America/Montevideo";
    const uyTime = toZonedTime(parsedDate, timezone);

    if (isToday(uyTime)) {
      return format(uyTime, 'HH:mm');
    } else if (isYesterday(uyTime)) {
      return 'Ayer';
    } else if (isThisWeek(uyTime)) {
      return format(uyTime, 'eeee', { locale: es });
    } else {
      return format(uyTime, 'dd/MM/yyyy');
    }
  } catch (error) {
    console.error('Error al formatear fecha:', error);
    return 'Fecha inválida';
  }
}



