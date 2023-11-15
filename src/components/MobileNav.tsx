'use client'

import { ArrowRight, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import useLoginModal from '@/hooks/useLoginModal'
import { signOut } from 'next-auth/react'
import { Button } from './ui/button'

const MobileNav = ({ isAuth }: { isAuth: boolean }) => {
  const [isOpen, setOpen] = useState<boolean>(false)

  const toggleOpen = () => setOpen((prev) => !prev)

  const pathname = usePathname()
  const loginModal = useLoginModal()

  useEffect(() => {
    if (isOpen) toggleOpen()
  }, [pathname])

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      toggleOpen()
    }
  }

  return (
    <div className="sm:hidden">
      <Menu onClick={toggleOpen} className="relative z-50 h-5 w-5 cursor-pointer text-zinc-700" />

      {isOpen ? (
        <div className="fixed inset-0 z-0 w-full animate-in fade-in-20 slide-in-from-top-5">
          <ul className="absolute grid w-full gap-3 border-b border-zinc-200 bg-white px-10 pb-8 pt-20 shadow-xl">
            {!isAuth ? (
              <>
                <li>
                  <p
                    onClick={loginModal.onOpen}
                    className="flex w-full cursor-pointer items-center font-semibold text-green-600"
                  >
                    Get started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </p>
                </li>
                <li className="my-3 h-px w-full bg-gray-300" />
                <li>
                  <p
                    onClick={loginModal.onOpen}
                    className="flex w-full cursor-pointer items-center font-semibold"
                  >
                    Sign in
                  </p>
                </li>
                <li className="my-3 h-px w-full bg-gray-300" />
                <li>
                  <Link
                    onClick={() => closeOnCurrent('/pricing')}
                    className="flex w-full items-center font-semibold"
                    href="/pricing"
                  >
                    Pricing
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    onClick={() => closeOnCurrent('/dashboard')}
                    className="flex w-full items-center font-semibold"
                    href="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-gray-300" />
                <li>
                  <button
                    className="flex w-full items-center font-semibold"
                    onClick={() => signOut()}
                  >
                    Sign out
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default MobileNav
