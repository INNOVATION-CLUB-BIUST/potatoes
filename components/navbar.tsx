import Link from "next/link"
import Image from "next/image"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="bg-white/70 backdrop-blur-xl border border-zinc-200/50 shadow-sm rounded-2xl h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <div className="absolute inset-0 bg-zinc-900/5 blur-xl rounded-full"></div>
              <Image src="/biust-logo.png" alt="BIUST Logo" width={32} height={32} className="object-contain relative" />
            </div>
            <div className="h-6 w-px bg-zinc-200 hidden sm:block"></div>
            <span className="text-base font-bold text-zinc-950 hidden sm:inline-block tracking-tight italic">
              Club.
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1.5 ml-4 py-1.5 px-3 bg-zinc-50/50 border border-zinc-100 rounded-lg">
            <Loader2 className="w-3.5 h-3.5 text-emerald-500 animate-spin" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Live Status</span>
          </div>
        </div>

        <nav className="flex items-center gap-1">
          <Button asChild variant="ghost" size="sm" className="text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100/50 rounded-full px-4 font-medium transition-all hover:scale-105 active:scale-95">
            <Link href="/contact">Contact</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="hidden sm:flex text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100/50 rounded-full px-4 font-medium transition-all hover:scale-105 active:scale-95">
            <Link href="/apply">Apply</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100/50 rounded-full px-4 font-medium transition-all hover:scale-105 active:scale-95">
            <Link href="/portal">Portal</Link>
          </Button>
          <div className="w-px h-4 bg-zinc-200 mx-2 hidden sm:block"></div>
          <Button asChild size="sm" className="bg-zinc-950 text-white hover:bg-zinc-800 rounded-full px-6 shadow-md transition-all hover:scale-105 active:scale-95">
            <Link href="/login">Login</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
