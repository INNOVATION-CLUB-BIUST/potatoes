"use client"

import Link from "next/link"
import Image from "next/image"
import { LayoutDashboard, LogOut, Home, ShieldCheck } from "lucide-react"

import { RequireRole } from "@/components/require-role"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/AuthContext"

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { role, signOut } = useAuth()
  
  return (
    <RequireRole allowed={["member", "admin"]}>
      <div className="min-h-screen bg-white force-light text-slate-900">
        <header className="border-b bg-white/50 backdrop-blur-md sticky top-0 z-40">
          <div className="mx-auto max-w-5xl px-4 md:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Image 
                  src="/biust-logo.png" 
                  alt="BIUST Logo" 
                  width={28} 
                  height={28} 
                  className="object-contain" 
                />
                <span className="text-sm font-bold tracking-tight italic">Club.</span>
              </Link>
              <div className="h-4 w-px bg-slate-200 hidden sm:block mx-1"></div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-widest px-2 py-1 bg-slate-50 rounded-md">
                <LayoutDashboard className="w-3 h-3" />
                <span>Portal</span>
              </div>
            </div>

            <nav className="flex items-center gap-2">
          
              <Button asChild variant="ghost" size="sm" className="h-8 text-xs gap-2">
                <Link href="/">
                  <Home className="w-3.5 h-3.5" />
              
                </Link>
              </Button>
              <Button
                onClick={signOut}
                variant="ghost"
                size="sm"
                className="h-8 text-xs gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-3.5 h-3.5" />
        
              </Button>
            </nav>
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl p-4 md:p-6 lg:p-8 pt-8">
          {children}
        </main>
      </div>
    </RequireRole>
  )
}
