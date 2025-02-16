import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
          AI Personality
        </Link>
        <div className="space-x-4">
        
        
        </div>
      </nav>
    </header>
  )
}

