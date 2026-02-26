"use client"

import * as React from "react"
import Link from "next/link"

import { useAuth } from "@/components/AuthContext"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { db } from "@/lib/firebase"
import type { ApplicationRow } from "@/lib/firestore-types"
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore"

const STATUS_VARIANT: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  submitted: "outline",
  approved: "default",
  rejected: "destructive",
}

export default function ApplicationStatusPage() {
  const { user, loading } = useAuth()
  const [apps, setApps] = React.useState<ApplicationRow[]>([])
  const [fetching, setFetching] = React.useState(true)

  React.useEffect(() => {
    if (!user) {
      setFetching(false)
      return
    }

    const q = query(
      collection(db, "applications"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    )

    const unsub = onSnapshot(q, (snap) => {
      const next: ApplicationRow[] = snap.docs.map((d) => {
        const data = d.data() as any
        return {
          id: d.id,
          uid: data.uid,
          fullName: data.fullName ?? "",
          email: data.email ?? "",
          status: data.status ?? "submitted",
          why: data.why,
          skills: data.skills,
          createdAt: data.createdAt,
          reviewedAt: data.reviewedAt,
        }
      })
      setApps(next)
      setFetching(false)
    })

    return unsub
  }, [user])

  if (loading || fetching) {
    return <p className="p-6 text-sm text-muted-foreground">Loading…</p>
  }

  if (!user) {
    return (
      <div className="p-6 flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">
          You must be signed in to view your application status.
        </p>
        <Button asChild>
          <Link href="/login">Sign in</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl p-4 md:p-6 flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>My Applications</CardTitle>
          <CardDescription>
            Track the status of your club membership requests.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {apps.length === 0 ? (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-muted-foreground">
                You haven&apos;t submitted an application yet.
              </p>
              <Button asChild variant="outline">
                <Link href="/apply">Apply for membership</Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reviewed</TableHead>
                  <TableHead>Skills</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apps.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="text-sm text-muted-foreground">
                      {app.createdAt
                        ? new Date((app.createdAt as any).toDate()).toLocaleDateString()
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={STATUS_VARIANT[app.status] ?? "outline"}>
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {app.reviewedAt
                        ? new Date((app.reviewedAt as any).toDate()).toLocaleDateString()
                        : "Pending review"}
                    </TableCell>
                    <TableCell className="max-w-[12rem] truncate text-sm text-muted-foreground">
                      {app.skills ?? "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <div>
        <Button asChild variant="ghost">
          <Link href="/apply">← Back to application form</Link>
        </Button>
      </div>
    </div>
  )
}
