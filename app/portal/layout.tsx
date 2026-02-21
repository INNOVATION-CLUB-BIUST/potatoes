import { RequireRole } from "@/components/require-role"

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RequireRole allowed={["member", "admin"]}>
      <div className="mx-auto w-full max-w-5xl p-4 md:p-6">{children}</div>
    </RequireRole>
  )
}
