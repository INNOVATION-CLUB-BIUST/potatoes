"use client"

import * as React from "react"

import { AuthProvider } from "@/components/AuthContext"

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
