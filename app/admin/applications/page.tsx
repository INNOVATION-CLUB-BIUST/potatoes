"use client"

import * as React from "react"

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
import { batchAudit } from "@/lib/audit"
import type { ApplicationRow } from "@/lib/firestore-types"
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore"

export default function AdminApplicationsPage() {
  const { user } = useAuth()
  const [apps, setApps] = React.useState<ApplicationRow[]>([])
  const [busyId, setBusyId] = React.useState<string | null>(null)

  React.useEffect(() => {
    const q = query(
      collection(db, "applications"),
      orderBy("createdAt", "desc"),
      limit(100)
    )
    return onSnapshot(q, (snap) => {
      const next: ApplicationRow[] = snap.docs.map((d) => {
        const data = d.data() as any
        return {
          id: d.id,
          uid: data.uid ?? null,
          fullName: data.fullName ?? "",
          email: data.email ?? "",
          status: data.status ?? "submitted",
          why: data.why,
          skills: data.skills,
          createdAt: data.createdAt,
        }
      })
      setApps(next)
    })
  }, [])

  async function approve(app: ApplicationRow) {
    if (!app.uid || !user) return
    setBusyId(app.id)
    try {
      const batch = writeBatch(db)
      batch.update(doc(db, "users", app.uid), {
        role: "member",
        updatedAt: serverTimestamp(),
      })
      batch.update(doc(db, "applications", app.id), {
        status: "approved",
        reviewedAt: serverTimestamp(),
        reviewedBy: user.uid,
      })
      batchAudit(batch, {
        actorUid: user.uid,
        actorEmail: user.email ?? undefined,
        action: "application.approved",
        targetType: "application",
        targetId: app.id,
        targetLabel: app.fullName,
        metadata: { applicantUid: app.uid, applicantEmail: app.email },
      })
      await batch.commit()
    } finally {
      setBusyId(null)
    }
  }

  async function reject(app: ApplicationRow) {
    if (!user) return
    setBusyId(app.id)
    try {
      const batch = writeBatch(db)
      batch.update(doc(db, "applications", app.id), {
        status: "rejected",
        reviewedAt: serverTimestamp(),
        reviewedBy: user.uid,
      })
      batchAudit(batch, {
        actorUid: user.uid,
        actorEmail: user.email ?? undefined,
        action: "application.rejected",
        targetType: "application",
        targetId: app.id,
        targetLabel: app.fullName,
        metadata: { applicantUid: app.uid, applicantEmail: app.email },
      })
      await batch.commit()
    } finally {
      setBusyId(null)
    }
  }

  const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
    submitted: "outline",
    approved: "default",
    rejected: "destructive",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Membership Applications</CardTitle>
        <CardDescription>Approve or reject membership requests.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apps.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-muted-foreground">
                  No applications yet.
                </TableCell>
              </TableRow>
            ) : (
              apps.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>
                    <div className="font-medium">{app.fullName}</div>
                    {app.why && (
                      <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {app.why}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{app.email}</TableCell>
                  <TableCell className="max-w-[12rem] truncate text-sm text-muted-foreground">
                    {app.skills ?? "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[app.status] ?? "outline"}>
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {app.createdAt
                      ? new Date((app.createdAt as any).toDate()).toLocaleDateString()
                      : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        disabled={!app.uid || busyId === app.id || app.status === "approved"}
                        onClick={() => approve(app)}
                      >
                        {busyId === app.id ? "Working…" : "Approve"}
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={busyId === app.id || app.status === "rejected"}
                        onClick={() => reject(app)}
                      >
                        Reject
                      </Button>
                    </div>
                    {!app.uid && (
                      <div className="mt-1 text-xs text-muted-foreground">No account linked</div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
