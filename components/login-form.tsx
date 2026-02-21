"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { useRouter } from "next/navigation"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"

import { auth, db, googleProvider } from "@/lib/firebase"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [mode, setMode] = React.useState<"login" | "register">("login")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function ensureUserDoc(uid: string, nextEmail?: string | null) {
    await setDoc(
      doc(db, "users", uid),
      {
        email: nextEmail ?? undefined,
        role: "pending",
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
      },
      { merge: true }
    )
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      if (mode === "login") {
        const cred = await signInWithEmailAndPassword(auth, email, password)
        await ensureUserDoc(cred.user.uid, cred.user.email)
      } else {
        const cred = await createUserWithEmailAndPassword(auth, email, password)
        await ensureUserDoc(cred.user.uid, cred.user.email)
      }

      router.replace("/portal")
    } catch (e: any) {
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
      await ensureUserDoc(cred.user.uid, cred.user.email)
      router.replace("/portal")
    } catch (e: any) {
      setError(e?.message ?? "Google sign-in failed")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>
            {mode === "login" ? "Login to your account" : "Create an account"}
          </CardTitle>
          <CardDescription>
            {mode === "login"
              ? "Enter your email below to login to your account"
              : "Register to apply for membership"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <Button type="submit" disabled={submitting}>
                  {submitting
                    ? "Working…"
                    : mode === "login"
                      ? "Login"
                      : "Register"}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={onGoogle}
                  disabled={submitting}
                >
                  Login with Google
                </Button>
                <FieldError errors={error ? [{ message: error }] : undefined} />
                <FieldDescription className="text-center">
                  {mode === "login" ? (
                    <button
                      type="button"
                      className="underline underline-offset-4"
                      onClick={() => setMode("register")}
                      disabled={submitting}
                    >
                      Don&apos;t have an account? Sign up
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="underline underline-offset-4"
                      onClick={() => setMode("login")}
                      disabled={submitting}
                    >
                      Already have an account? Log in
                    </button>
                  )}
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
