import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
          AI Personality
        </Link>
        <div className="space-x-4">
          <Button variant="ghost" asChild className="hover:text-primary">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/80 transition-colors">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}

