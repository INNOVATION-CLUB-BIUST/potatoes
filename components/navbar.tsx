import Link from "next/link"
import Image from "next/image"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      {/* Container: Brighter white background, subtle border, and softer shadow */}
      <div className="bg-white/90 backdrop-blur-md border border-black shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl h-16 flex items-center justify-between px-6">
        
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              {/* Softer glow for the logo in light mode */}
              <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full"></div>
              <Image 
                src="/biust-logo.png" 
                alt="BIUST Logo" 
                width={32} 
                height={32} 
                className="object-contain relative" 
              />
            </div>
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
            <span className="text-base font-bold text-slate-900 hidden sm:inline-block tracking-tight italic">
              Club.
            </span>
          </Link>
          
          {/* Status Badge: Using a lighter slate/emerald combo */}
          <div className="hidden md:flex items-center gap-1.5 ml-4 py-1 px-2.5 bg-slate-50 border border-slate-200 rounded-full">
            <Loader2 className="w-3 h-3 text-emerald-600 animate-spin" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Live Status</span>
          </div>
        </div>

        <nav className="flex items-center gap-1">
          {/* Navigation Links: Using slate-600 for softer contrast than pure black */}
          <Button asChild variant="ghost" size="sm" className="text-slate-600 hover:text-primary hover:bg-slate-100 rounded-full px-4 font-medium transition-all">
            <Link href="/contact">Contact</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="hidden sm:flex text-slate-600 hover:text-primary hover:bg-slate-100 rounded-full px-4 font-medium transition-all">
            <Link href="/apply">Apply</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-slate-600 hover:text-primary hover:bg-slate-100 rounded-full px-4 font-medium transition-all">
            <Link href="/portal">Portal</Link>
          </Button>
          
          <div className="w-px h-4 bg-slate-200 mx-2 hidden sm:block"></div>
          
          {/* Login Button: Solid primary with a light shadow */}
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 shadow-sm shadow-primary/10 transition-all hover:scale-[1.02] active:scale-95 font-bold">
            <Link href="/login">Login</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}