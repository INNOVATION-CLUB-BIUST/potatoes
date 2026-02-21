import Link from "next/link"

import { RequireRole } from "@/components/require-role"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RequireRole allowed={["admin"]}>
      <div className="mx-auto flex w-full max-w-6xl gap-6 p-4 md:p-6">
        <aside className="w-56 shrink-0">
          <div className="text-sm font-semibold">Admin</div>
          <Separator className="my-3" />
          <nav className="flex flex-col gap-1">
            <Button asChild variant="ghost" className="justify-start">
              <Link href="/admin/projects">Projects</Link>
            </Button>
            <Button asChild variant="ghost" className="justify-start">
              <Link href="/admin/applications">Applications</Link>
            </Button>
          </nav>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </RequireRole>
  )
}
