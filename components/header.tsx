import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { User } from "lucide-react" // Import an icon for fallback
import { useRouter } from "next/navigation"
import { useState } from "react"

export function Header() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [imageError, setImageError] = useState(false)

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/')
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
          AI Personality
        </Link>
        <div className="space-x-4">
          {status === "loading" ? (
            <Button disabled>Loading...</Button>
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full h-10 w-10 p-0 overflow-hidden">
                  {session.user?.image && !imageError ? (
                    <Image
                      src={session.user.image}
                      alt="Profile photo"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                      onError={handleImageError}
                      unoptimized
                    />
                  ) : (
                    <div className="bg-muted/80 rounded-full h-10 w-10 flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex items-center gap-3">
                    {session.user?.image && !imageError ? (
                      <Image
                        src={session.user.image}
                        alt="Profile photo"
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                        onError={handleImageError}
                        unoptimized
                      />
                    ) : (
                      <div className="bg-muted/80 rounded-full h-10 w-10 flex items-center justify-center">
                        <User className="h-5 w-5" />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <p className="text-sm font-medium leading-none">
                        {session.user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                  {/* <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem> */}
                  <DropdownMenuItem onClick={handleSignOut}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => signIn()}>Login</Button>
          )}
        </div>
      </nav>
    </header>
  )
}