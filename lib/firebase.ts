"use client"

import { initializeApp, getApp, getApps } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Ensure all environment variables are present
// Note: In Next.js client-side, we must access process.env.NEXT_PUBLIC_... literals
// to allow the compiler to replace them. Bracket notation like process.env[key] won't work.
Object.entries(firebaseConfig).forEach(([key, value]) => {
  if (!value) {
    const envVarName = `NEXT_PUBLIC_FIREBASE_${key.replace(/[A-Z]/g, (m) => "_" + m).toUpperCase()}`
    throw new Error(
      `Missing env var ${envVarName}. Add it to .env.local (must be NEXT_PUBLIC_*).`
    )
  }
})

export const firebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)

export const googleProvider = new GoogleAuthProvider()
