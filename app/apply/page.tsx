"use client"

import * as React from "react"

import { useAuth } from "@/components/AuthContext"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/lib/firebase"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"

type Step = 1 | 2 | 3

export default function ApplyPage() {
  const { user } = useAuth()

  const [step, setStep] = React.useState<Step>(1)
  const [submitting, setSubmitting] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)

  const [fullName, setFullName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [why, setWhy] = React.useState("")
  const [skills, setSkills] = React.useState("")

  async function onSubmit() {
    setSubmitting(true)
    try {
      await addDoc(collection(db, "applications"), {
        uid: user?.uid ?? null,
        fullName,
        email,
        why,
        skills,
        status: "submitted",
        createdAt: serverTimestamp(),
      })
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Apply for membership</CardTitle>
          <CardDescription>
            A short application to help us understand your interests.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">
                Application submitted.
              </p>
              <p className="text-sm text-muted-foreground">
                If you created an account, an admin will review your application
                and update your role.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <FieldDescription>
                Step {step} of 3
              </FieldDescription>

              {step === 1 && (
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="fullName">Full name</FieldLabel>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Field>
                </FieldGroup>
              )}

              {step === 2 && (
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="why">Why do you want to join?</FieldLabel>
                    <Textarea
                      id="why"
                      value={why}
                      onChange={(e) => setWhy(e.target.value)}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="skills">Skills / interests</FieldLabel>
                    <Textarea
                      id="skills"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      placeholder="e.g. web dev, design, robotics…"
                    />
                  </Field>
                </FieldGroup>
              )}

              {step === 3 && (
                <FieldGroup>
                  <Field>
                    <FieldLabel>Review</FieldLabel>
                    <div className="rounded-md border bg-muted/20 p-4 text-sm">
                      <div className="font-medium">{fullName || "(name)"}</div>
                      <div className="text-muted-foreground">{email || "(email)"}</div>
                      <div className="mt-3 whitespace-pre-wrap">{why || "(why)"}</div>
                      {skills && (
                        <div className="mt-3 whitespace-pre-wrap text-muted-foreground">
                          {skills}
                        </div>
                      )}
                    </div>
                  </Field>
                </FieldGroup>
              )}

              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep((s) => (s === 1 ? 1 : ((s - 1) as Step)))}
                  disabled={step === 1 || submitting}
                >
                  Back
                </Button>

                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={() => setStep((s) => ((s + 1) as Step))}
                    disabled={submitting}
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="button" onClick={onSubmit} disabled={submitting}>
                    {submitting ? "Submitting…" : "Submit"}
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
