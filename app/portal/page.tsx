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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/lib/firebase"
import {
  arrayUnion,
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore"

type Project = {
  id: string
  name: string
  description?: string
  members?: string[]
}

type Announcement = {
  id: string
  title: string
  body?: string
}

export default function PortalPage() {
  const { user, role, userDoc } = useAuth()

  const [projects, setProjects] = React.useState<Project[]>([])
  const [announcements, setAnnouncements] = React.useState<Announcement[]>([])
  const [joiningId, setJoiningId] = React.useState<string | null>(null)

  const [name, setName] = React.useState("")
  const [skills, setSkills] = React.useState("")
  const [bio, setBio] = React.useState("")
  const [savingProfile, setSavingProfile] = React.useState(false)

  React.useEffect(() => {
    setName(userDoc?.name ?? "")
    setSkills(userDoc?.skills ?? "")
    setBio(userDoc?.bio ?? "")
  }, [userDoc?.bio, userDoc?.name, userDoc?.skills])

  React.useEffect(() => {
    const unsubProjects = onSnapshot(collection(db, "projects"), (snap) => {
      const next: Project[] = snap.docs.map((d) => {
        const data = d.data() as any
        return {
          id: d.id,
          name: data.name ?? "(untitled)",
          description: data.description,
          members: Array.isArray(data.members) ? data.members : [],
        }
      })
      setProjects(next)
    })

    const announcementsQuery = query(
      collection(db, "announcements"),
      orderBy("createdAt", "desc"),
      limit(5)
    )

    const unsubAnnouncements = onSnapshot(announcementsQuery, (snap) => {
      const next: Announcement[] = snap.docs.map((d) => {
        const data = d.data() as any
        return {
          id: d.id,
          title: data.title ?? "(untitled)",
          body: data.body,
        }
      })
      setAnnouncements(next)
    })

    return () => {
      unsubProjects()
      unsubAnnouncements()
    }
  }, [])

  async function joinProject(projectId: string) {
    if (!user) return
    setJoiningId(projectId)
    try {
      await updateDoc(doc(db, "projects", projectId), {
        members: arrayUnion(user.uid),
        updatedAt: serverTimestamp(),
      })
    } finally {
      setJoiningId(null)
    }
  }

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return

    setSavingProfile(true)
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          name,
          skills,
          bio,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      )
    } finally {
      setSavingProfile(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Member portal</CardTitle>
          <CardDescription>
            Signed in as {user?.email ?? ""} ({role})
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Internal feed</CardTitle>
          <CardDescription>Announcements and resources.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {announcements.length === 0 ? (
            <p className="text-sm text-muted-foreground">No announcements yet.</p>
          ) : (
            announcements.map((a) => (
              <div key={a.id} className="rounded-md border p-3">
                <div className="text-sm font-medium">{a.title}</div>
                {a.body && (
                  <div className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">
                    {a.body}
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="projects">
        <TabsList>
          <TabsTrigger value="projects">Available Projects</TabsTrigger>
          <TabsTrigger value="profile">My Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Join a project to get involved.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {projects.length === 0 ? (
                <p className="text-sm text-muted-foreground">No projects yet.</p>
              ) : (
                projects.map((p) => {
                  const isMember = !!user && (p.members ?? []).includes(user.uid)
                  return (
                    <div
                      key={p.id}
                      className="flex items-start justify-between gap-4 rounded-md border p-4"
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-medium">{p.name}</div>
                        {p.description && (
                          <div className="mt-1 text-sm text-muted-foreground">
                            {p.description}
                          </div>
                        )}
                        <div className="mt-2 text-xs text-muted-foreground">
                          Members: {(p.members ?? []).length}
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant={isMember ? "secondary" : "default"}
                        disabled={isMember || joiningId === p.id}
                        onClick={() => joinProject(p.id)}
                      >
                        {isMember
                          ? "Joined"
                          : joiningId === p.id
                            ? "Joining…"
                            : "Join"}
                      </Button>
                    </div>
                  )
                })
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your member profile.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={saveProfile} className="flex flex-col gap-6">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="skills">Skills</FieldLabel>
                    <Input
                      id="skills"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      placeholder="e.g. React, design, CAD…"
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="bio">Bio</FieldLabel>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </Field>
                  <Field>
                    <Button type="submit" disabled={savingProfile}>
                      {savingProfile ? "Saving…" : "Save"}
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
