import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminHomePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin dashboard</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Button asChild variant="outline">
          <Link href="/admin/projects">Manage projects</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/applications">Review applications</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
