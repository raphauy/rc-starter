import * as z from "zod"
import { prisma } from "@/lib/db"
import { Role } from "@prisma/client"

export type UserDAO = {
	id: string
	name: string | undefined
	email: string
	emailVerified: Date | undefined
	image: string | undefined
	role: Role
	createdAt: Date
	updatedAt: Date
}

export const userSchema = z.object({
	name: z.string().optional(),
	email: z.string().email(),
	role: z.nativeEnum(Role),
	image: z.string().optional(),	
})

export type UserFormValues = z.infer<typeof userSchema>


export async function getUsersDAO() {
  const found = await prisma.user.findMany({
    orderBy: {
      id: 'asc'
    },
  })
  return found as UserDAO[]
}

export async function getUserDAO(id: string) {
  const found = await prisma.user.findUnique({
    where: {
      id
    },
  })
  return found as UserDAO
}
    
export async function createUser(data: UserFormValues) {
  const created = await prisma.user.create({
    data
  })
  return created
}

export async function updateUser(id: string, data: UserFormValues) {
  const updated = await prisma.user.update({
    where: {
      id
    },
    data
  })
  return updated
}

export async function deleteUser(id: string) {
  const deleted = await prisma.user.delete({
    where: {
      id
    },
  })
  return deleted
}

