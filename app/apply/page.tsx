"use client"

import * as React from "react"
import Link from "next/link"
import { useAuth } from "@/components/AuthContext"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/lib/firebase"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"

export default function ApplyPage() {
  const { user } = useAuth()
  const [submitting, setSubmitting] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)

  // Form State
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    why: "",
    skills: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      await addDoc(collection(db, "applications"), {
        uid: user?.uid ?? null,
        ...formData,
        status: "submitted",
        createdAt: serverTimestamp(),
      })
      setSubmitted(true)
    } catch (error) {
      console.error("Error submitting application:", error)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto w-full max-w-xl p-4 md:p-6">
        <Card className="border-green-100 bg-green-50/30">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-3 text-center">
              <h3 className="font-semibold text-green-900">Application Sent!</h3>
              <p className="text-sm text-green-800/80">
                Thanks for applying. An admin will review your details and update your role shortly.
              </p>
              <Button asChild variant="outline" size="sm" className="mx-auto">
                <Link href="/apply/status">Check my application status →</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-xl p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Apply for membership</CardTitle>
          <CardDescription>
            Fill out the details below to join our community.{" "}
            <Link href="/apply/status" className="underline underline-offset-2">
              Already applied? Check status.
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-6">
            <FieldGroup>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="fullName">Full name</FieldLabel>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="why">Why do you want to join?</FieldLabel>
                <Textarea
                  id="why"
                  placeholder="Tell us a bit about your goals..."
                  value={formData.why}
                  onChange={handleChange}
                  required
                  className="min-h-[100px]"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="skills">Skills & Interests</FieldLabel>
                <Textarea
                  id="skills"
                  placeholder="e.g. web dev, design, robotics…"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </Field>
            </FieldGroup>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}