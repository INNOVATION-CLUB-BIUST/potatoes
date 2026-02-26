import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const QUICK_LINKS = [
  { href: "/admin/users", label: "Manage users", description: "Roles & project assignments" },
  { href: "/admin/projects", label: "Manage projects", description: "Create, edit, delete" },
  { href: "/admin/applications", label: "Review applications", description: "Approve or reject" },
  { href: "/admin/announcements", label: "Announcements", description: "Publish monthly updates" },
  { href: "/admin/reports", label: "System reports", description: "Audit log & live counts" },
]

export default function AdminHomePage() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
          <CardDescription>Quick access to all admin areas.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {QUICK_LINKS.map((l) => (
              <Button
                key={l.href}
                asChild
                variant="outline"
                className="h-auto flex-col items-start gap-0.5 py-3 px-4"
              >
                <Link href={l.href}>
                  <span className="font-medium">{l.label}</span>
                  <span className="text-xs text-muted-foreground font-normal">{l.description}</span>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
