import Link from "next/link"
import Image from "next/image"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg rounded-2xl h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
              <Image src="/biust-logo.png" alt="BIUST Logo" width={32} height={32} className="object-contain relative" />
            </div>
            <div className="h-6 w-px bg-border hidden sm:block"></div>
            <span className="text-base font-bold text-foreground hidden sm:inline-block tracking-tight italic">
              Club.
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1.5 ml-4 py-1.5 px-3 bg-muted/50 border border-border rounded-lg">
            <Loader2 className="w-3.5 h-3.5 text-emerald-500 animate-spin" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Live Status</span>
          </div>
        </div>

        <nav className="flex items-center gap-1">
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full px-4 font-medium transition-all hover:scale-105 active:scale-95">
            <Link href="/contact">Contact</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="hidden sm:flex text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full px-4 font-medium transition-all hover:scale-105 active:scale-95">
            <Link href="/apply">Apply</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full px-4 font-medium transition-all hover:scale-105 active:scale-95">
            <Link href="/portal">Portal</Link>
          </Button>
          <div className="w-px h-4 bg-border mx-2 hidden sm:block"></div>
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 shadow-md shadow-primary/20 transition-all hover:scale-105 active:scale-95 font-bold">
            <Link href="/login">Login</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
