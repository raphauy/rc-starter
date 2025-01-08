import { prisma } from "@/lib/db"
import { deleteOTPCode, getOTPCodeByEmail, getUserByEmail, getUserById, LoginSchema } from "@/services/login-services"
import { updateOTPSessionTokenCheckExpiration } from "@/services/otpsession-services"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { Role } from "@prisma/client"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const TOKEN_SESSION_EXPIRATION_IN_MINUTES = 5

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    // 7 días
    maxAge: 7 * 24 * 60 * 60
  },
  pages: {
    signIn: "/login",
  },
  providers: [    
    CredentialsProvider({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, code } = validatedFields.data
          const otpSessionId = (credentials as any).otpSessionId
          
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

          // Guardar el otpSessionId en el token
          ;(user as any).otpSessionId = otpSessionId

          return user
        }

        return null
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
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
    async jwt({ token, user, trigger}) {
      //console.log("token", token)
      
      if (!token.sub) return token

      // Capturar el otpSessionId del usuario cuando se inicia sesión
      if (user && (user as any).otpSessionId) {
        console.log("seteando otpSessionId", (user as any).otpSessionId)
        token.otpSessionId = (user as any).otpSessionId;
      }

      // Si no hay otpSessionId, la sesión no es válida
      if (!token.otpSessionId) {
        console.log("No hay otpSessionId, sesión no válida")
        // TODO: Implementar lógica de logout
        return token;
      }

      // Verificar si necesitamos actualizar la expiración
      const now = new Date();
      if (token.tokenCheckExpiration && trigger !== "update") {
        const expirationDate = new Date(token.tokenCheckExpiration);
        const diffInMinutes = (expirationDate.getTime() - now.getTime()) / (1000 * 60);
        
        // console.log("Tiempo restante de la sesión:", {
        //   expiration: expirationDate.toISOString(),
        //   now: now.toISOString(),
        //   minutosRestantes: diffInMinutes.toFixed(2)
        // });
        
        if (diffInMinutes > 0) {
          console.log("la sesión sigue vigente, faltan", diffInMinutes.toFixed(2), "minutos");
          
          return token;
        }
        console.log("la sesión expiró hace", Math.abs(diffInMinutes).toFixed(2), "minutos");
      } else {
        console.log("la sesión no tiene fecha de expiración");
      }

      // Si llegamos aquí, necesitamos actualizar
      const tokenCheckExpiration = new Date(now.getTime() + TOKEN_SESSION_EXPIRATION_IN_MINUTES * 60 * 1000);
      console.log("Actualizando sesión, nueva expiración en", TOKEN_SESSION_EXPIRATION_IN_MINUTES, "minutos");

      // Actualizar la expiración de la sesión actual
      const res = await updateOTPSessionTokenCheckExpiration(token.otpSessionId, tokenCheckExpiration);
      if (res) {
        console.log("actualizando tokenCheckExpiration", tokenCheckExpiration.toISOString())
        token.tokenCheckExpiration = tokenCheckExpiration.toISOString();                
      } else {
        console.log("No se encontró la sesión", token.otpSessionId);
        // Invalidar el token completamente
        return null;
      }

      const existingUser = await getUserById(token.sub)      
      if (!existingUser) return token;

      // Siempre actualizamos los datos del usuario
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.picture = existingUser.image;

      return token;
    }
  }
})
