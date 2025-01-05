import { prisma } from "@/lib/db"
import { deleteOTPCode, getOTPCodeByEmail, getUserByEmail, getUserById, LoginSchema } from "@/services/login-services"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { Role } from "@prisma/client"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    // 7 días
    maxAge: 7 * 24 * 60 * 60
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [    
    CredentialsProvider({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, code } = validatedFields.data
          
          const user = await getUserByEmail(email)
          
          if (!user || !user.email) return null

          const oTPCode = await getOTPCodeByEmail(user.email)

          if (!oTPCode) {
            return null
          }
    
          if (oTPCode.code !== code) {
            return null
          }

          await deleteOTPCode(oTPCode.id)

          console.log("authorize user", user)
          
          return user
        }

        return null
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      //console.log("session: ", session);
      
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }

      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email as string
        session.user.image = token.picture as string
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)      

      if (!existingUser) return token;

      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role
      token.picture= existingUser.image

      return token;
    }
  }
})
