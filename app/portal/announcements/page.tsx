"use client"

import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { db } from "@/lib/firebase"
import type { AnnouncementRow } from "@/lib/firestore-types"
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore"

function monthKey(ts: any): string {
  const d = ts?.toDate ? ts.toDate() : new Date(ts)
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long" })
}

export default function MemberAnnouncementsPage() {
  const [announcements, setAnnouncements] = React.useState<AnnouncementRow[]>([])

  React.useEffect(() => {
    const q = query(
      collection(db, "announcements"),
      orderBy("createdAt", "desc")
    )
    return onSnapshot(q, (snap) => {
      const next: AnnouncementRow[] = snap.docs.map((d) => {
        const data = d.data() as any
        return {
          id: d.id,
          title: data.title ?? "(untitled)",
          body: data.body,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          createdBy: data.createdBy,
        }
      })
      setAnnouncements(next)
    })
  }, [])

  // Group by month
  const grouped = React.useMemo(() => {
    const map = new Map<string, AnnouncementRow[]>()
    for (const a of announcements) {
      const key = a.createdAt ? monthKey(a.createdAt) : "Undated"
      const list = map.get(key) ?? []
      list.push(a)
      map.set(key, list)
    }
    return Array.from(map.entries())
  }, [announcements])

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Announcements</CardTitle>
          <CardDescription>Club updates, grouped by month.</CardDescription>
        </CardHeader>
      </Card>

      {grouped.length === 0 ? (
        <p className="text-sm text-muted-foreground">No announcements yet.</p>
      ) : (
        grouped.map(([month, items]) => (
          <div key={month}>
            <h2 className="mb-3 text-base font-semibold text-muted-foreground">{month}</h2>
            <div className="flex flex-col gap-3">
              {items.map((a) => (
                <Card key={a.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{a.title}</CardTitle>
                    <CardDescription>
                      {a.createdAt
                        ? new Date((a.createdAt as any).toDate()).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : ""}
                    </CardDescription>
                  </CardHeader>
                  {a.body && (
                    <CardContent>
                      <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                        {a.body}
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
