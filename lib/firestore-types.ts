import type { Timestamp } from "firebase/firestore"

// ─── Users ───────────────────────────────────────────────────────────────────

export type UserRole = "pending" | "member" | "admin"

export type UserDoc = {
  email?: string
  role?: UserRole
  name?: string
  bio?: string
  skills?: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export type UserRow = UserDoc & { id: string }

// ─── Projects ────────────────────────────────────────────────────────────────

export type ProjectStatus = "planned" | "active" | "done"

export type ProjectDoc = {
  name: string
  description?: string
  members: string[]
  ownerUid?: string | null
  status?: ProjectStatus
  deadline?: Timestamp | null
  githubUrl?: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export type ProjectRow = ProjectDoc & { id: string }

// ─── Applications ─────────────────────────────────────────────────────────────

export type ApplicationStatus = "submitted" | "approved" | "rejected"

export type ApplicationDoc = {
  uid?: string | null
  fullName?: string
  email?: string
  why?: string
  skills?: string
  status: ApplicationStatus
  reviewedAt?: Timestamp
  reviewedBy?: string | null
  createdAt?: Timestamp
}

export type ApplicationRow = ApplicationDoc & { id: string }

// ─── Announcements ────────────────────────────────────────────────────────────

export type AnnouncementDoc = {
  title: string
  body?: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
  createdBy?: string | null
}

export type AnnouncementRow = AnnouncementDoc & { id: string }

// ─── Audit Logs ───────────────────────────────────────────────────────────────

export type AuditAction =
  | "user.role_changed"
  | "user.removed"
  | "user.project_assigned"
  | "user.project_removed"
  | "project.created"
  | "project.updated"
  | "project.deleted"
  | "application.approved"
  | "application.rejected"
  | "announcement.created"
  | "announcement.updated"
  | "announcement.deleted"

export type AuditLogDoc = {
  actorUid: string
  actorEmail?: string
  action: AuditAction
  targetType: "user" | "project" | "application" | "announcement"
  targetId: string
  targetLabel?: string
  metadata?: Record<string, unknown>
  createdAt?: Timestamp
}

export type AuditLogRow = AuditLogDoc & { id: string }
