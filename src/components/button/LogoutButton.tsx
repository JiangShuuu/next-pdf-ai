'use client'
import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  return <p onClick={() => signOut()}>Log out</p>
}
