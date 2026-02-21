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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { db } from "@/lib/firebase"
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"

type ApplicationRow = {
  id: string
  uid: string | null
  fullName: string
  email: string
  status: string
  why?: string
  skills?: string
}

export default function AdminApplicationsPage() {
  const { user } = useAuth()

  const [apps, setApps] = React.useState<ApplicationRow[]>([])
  const [busyId, setBusyId] = React.useState<string | null>(null)

  React.useEffect(() => {
    const q = query(
      collection(db, "applications"),
      orderBy("createdAt", "desc"),
      limit(50)
    )

    return onSnapshot(q, (snap) => {
      const next = snap.docs.map((d) => {
        const data = d.data() as any
        return {
          id: d.id,
          uid: data.uid ?? null,
          fullName: data.fullName ?? "",
          email: data.email ?? "",
          status: data.status ?? "submitted",
          why: data.why,
          skills: data.skills,
        }
      })
      setApps(next)
    })
  }, [])

  async function approve(app: ApplicationRow) {
    if (!app.uid) return
    setBusyId(app.id)
    try {
      await updateDoc(doc(db, "users", app.uid), {
        role: "member",
        updatedAt: serverTimestamp(),
      })
      await updateDoc(doc(db, "applications", app.id), {
        status: "approved",
        reviewedAt: serverTimestamp(),
        reviewedBy: user?.uid ?? null,
      })
    } finally {
      setBusyId(null)
    }
  }

  async function reject(app: ApplicationRow) {
    setBusyId(app.id)
    try {
      await updateDoc(doc(db, "applications", app.id), {
        status: "rejected",
        reviewedAt: serverTimestamp(),
        reviewedBy: user?.uid ?? null,
      })
    } finally {
      setBusyId(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications</CardTitle>
        <CardDescription>Approve or reject membership applications.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apps.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-muted-foreground">
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
                  <TableCell>{app.status}</TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        disabled={!app.uid || busyId === app.id || app.status === "approved"}
                        onClick={() => approve(app)}
                      >
                        {busyId === app.id && app.status !== "approved"
                          ? "Working…"
                          : "Approve"}
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
                      <div className="mt-1 text-xs text-muted-foreground">
                        No uid (not registered)
                      </div>
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
