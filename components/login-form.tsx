"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  User, 
  Mail, 
  Lock,
  ArrowRight, 
  Loader2,
  LogIn,
  Chrome,
  AlertCircle
} from "lucide-react"

import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button" // Replaced by custom buttons to match apply page
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card" // Replaced by custom containers
// import {
//   Field,
//   FieldDescription,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field" // Replaced by custom fields
// import { Input } from "@/components/ui/input" // Replaced by custom inputs

import { useRouter } from "next/navigation"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth"
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"

import { auth, db, googleProvider } from "@/lib/firebase"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function ensureUserDoc(uid: string, nextEmail?: string | null) {
    const userDocRef = doc(db, "users", uid)
    const userDocSnap = await getDoc(userDocRef)

    if (!userDocSnap.exists()) {
      // Only set role: "pending" and createdAt if the user doesn't exist yet
      await setDoc(userDocRef, {
        email: nextEmail ?? undefined,
        role: "pending",
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
      })
      return "pending"
    } else {
      // If user exists, only update their email if it's new and update updatedAt
      await setDoc(
        userDocRef,
        {
          email: nextEmail ?? undefined,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      )
      const data = userDocSnap.data()
      return (data?.role as string) ?? "pending"
    }
  }

  function redirectForRole(role: string, applicationSubmitted?: boolean) {
    if (role === "admin") return "/admin"
    if (role === "member") return "/portal"
    if (applicationSubmitted) return "/apply/status"
    return "/apply"
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      const role = await ensureUserDoc(cred.user.uid, cred.user.email)

      // Read applicationSubmitted from the doc for redirect decision
      const snap = await getDoc(doc(db, "users", auth.currentUser!.uid))
      const appSubmitted = snap.exists() ? !!snap.data()?.applicationSubmitted : false
      router.replace(redirectForRole(role, appSubmitted))
    } catch (e: any) {
      console.error(e)
      setError(e?.message ?? "Authentication failed")
    } finally {
      setSubmitting(false)
    }
  }

  async function onGoogle() {
    setSubmitting(true)
    setError(null)
    try {
      const cred = await signInWithPopup(auth, googleProvider)
      const role = await ensureUserDoc(cred.user.uid, cred.user.email)
      const snap = await getDoc(doc(db, "users", cred.user.uid))
      const appSubmitted = snap.exists() ? !!snap.data()?.applicationSubmitted : false
      router.replace(redirectForRole(role, appSubmitted))
    } catch (e: any) {
      console.error(e)
      setError(e?.message ?? "Google sign-in failed")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={cn("w-full max-w-lg font-pixel-circle", className)} {...props}>
      <div className="bg-white p-6 md:p-10 shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-black rounded-xl">
        <header className="mb-8">
          <div className="mb-4 -ml-4 flex justify-start">
            <div className="relative w-40 h-16 overflow-hidden flex items-center justify-start">
              <Image 
                src="/aw.png" 
                alt="Club Logo" 
                width={200} 
                height={80}
                priority 
                className="object-contain scale-[1.0] origin-left" 
              />
            </div>
          </div>
          
          <h1 className="text-4xl font-black text-black tracking-wider uppercase">
            Login
          </h1>
          <p className="text-xs text-gray-400 mt-2 uppercase tracking-[0.2em] font-bold">
            Enter your credentials
          </p>
        </header>

        <form onSubmit={onSubmit} className="space-y-5">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[10px] font-bold uppercase tracking-wider">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="email" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
              <Mail className="w-3 h-3" /> Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-50/50 text-black border-gray-200 focus:border-black focus:bg-white rounded-xl px-4 py-3 text-sm transition-all outline-none border"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
              <Lock className="w-3 h-3" /> Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-50/50 text-black border-gray-200 focus:border-black focus:bg-white rounded-xl px-4 py-3 text-sm transition-all outline-none border"
            />
          </div>

          <div className="pt-2 space-y-3">
            <button 
              type="submit" 
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 h-14 bg-black text-white hover:bg-gray-800 text-xs font-bold uppercase tracking-widest transition-all active:scale-[0.98] disabled:bg-gray-100 disabled:text-gray-400 shadow-lg shadow-black/10 rounded-xl group"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Checking...</span>
                </>
              ) : (
                <>
                  <span>Log In</span>
                  <LogIn className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <button 
              type="button"
              onClick={onGoogle}
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 h-14 bg-white text-black border border-black hover:bg-gray-50 text-xs font-bold uppercase tracking-widest transition-all active:scale-[0.98] disabled:border-gray-100 disabled:text-gray-400 rounded-xl group"
            >
              <Chrome className="w-3.5 h-3.5" />
              <span>Google Sign-In</span>
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <Link 
            href="/register"
            className="text-[11px] text-gray-400 hover:text-black transition-colors uppercase tracking-widest font-bold"
          >
            No account? <span className="border-b border-gray-200 ml-1">Register instead</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
