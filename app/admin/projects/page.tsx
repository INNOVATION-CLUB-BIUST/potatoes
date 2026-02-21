"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/lib/firebase"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore"

type ProjectRow = {
  id: string
  name: string
  description?: string
  membersCount: number
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = React.useState<ProjectRow[]>([])
  const [open, setOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<ProjectRow | null>(null)

  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    return onSnapshot(collection(db, "projects"), (snap) => {
      const next = snap.docs.map((d) => {
        const data = d.data() as any
        return {
          id: d.id,
          name: data.name ?? "(untitled)",
          description: data.description,
          membersCount: Array.isArray(data.members) ? data.members.length : 0,
        }
      })
      setProjects(next)
    })
  }, [])

  function startCreate() {
    setEditing(null)
    setName("")
    setDescription("")
    setOpen(true)
  }

  function startEdit(p: ProjectRow) {
    setEditing(p)
    setName(p.name)
    setDescription(p.description ?? "")
    setOpen(true)
  }

  async function saveProject(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      if (editing) {
        await updateDoc(doc(db, "projects", editing.id), {
          name,
          description,
          updatedAt: serverTimestamp(),
        })
      } else {
        await addDoc(collection(db, "projects"), {
          name,
          description,
          members: [],
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
      }

      setOpen(false)
    } finally {
      setSaving(false)
    }
  }

  async function deleteProject(projectId: string) {
    const ok = window.confirm("Delete this project?")
    if (!ok) return

    await deleteDoc(doc(db, "projects", projectId))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>Projects</CardTitle>
            <CardDescription>Create, edit, and delete projects.</CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button type="button" onClick={startCreate}>
                Create Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editing ? "Edit project" : "Create project"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={saveProject} className="flex flex-col gap-6">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Field>
                </FieldGroup>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" disabled={saving}>
                    {saving ? "Saving…" : "Save"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Members</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-muted-foreground">
                  No projects yet.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="max-w-[32rem] truncate text-muted-foreground">
                    {p.description ?? ""}
                  </TableCell>
                  <TableCell>{p.membersCount}</TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => startEdit(p)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteProject(p.id)}
                      >
                        Delete
                      </Button>
                    </div>
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
