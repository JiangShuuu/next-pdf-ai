'use client'
import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  return (
    <div className="w-full" onClick={() => signOut()}>
      Log out
    </div>
  )
}
