import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/utils";
import Link from "next/link";
import { logoutAction } from "./auth/login/actions";

export default async function Home() {
  const user = await getCurrentUser()
  return (
      <main className="mt-10 lg:mt-40 w-full flex justify-center">
      {
          user ? (
            <div className="space-y-10">
              <h1>Bienvenido, {user.name || user.email}</h1>
              <form action={logoutAction}>
                <Button type="submit" variant="secondary" className="w-full">Cerrar sesión</Button>
              </form>
            </div>
          ) : (
            <Link href="/auth/login">
              <Button>Login</Button>
            </Link>
          )
        }
      </main>
  );
}
