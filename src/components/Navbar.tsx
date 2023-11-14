'use client'
import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import { ArrowRight } from 'lucide-react'
import UserAccountNav from './UserAccountNav'
import MobileNav from './MobileNav'
import useLoginModal from '@/hooks/useLoginModal'

interface NavbarProps {
  currentUser: {
    name: string | null
    email: string | null
    image: string | null
  } | null
}

const Navbar = ({ currentUser }: NavbarProps) => {
  const loginModal = useLoginModal()
  const user = currentUser

  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="z-40 flex font-semibold">
            <span>quill.</span>
          </Link>

          <MobileNav isAuth={!!user} />

          <div className="hidden items-center space-x-4 sm:flex">
            {!user ? (
              <>
                <Link
                  href="/pricing"
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm'
                  })}
                >
                  Pricing
                </Link>
                <button
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm'
                  })}
                  onClick={loginModal.onOpen}
                >
                  Sign in
                </button>
                <button
                  className={buttonVariants({
                    size: 'sm'
                  })}
                >
                  Get started <ArrowRight className="ml-1.5 h-5 w-5" />
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm'
                  })}
                >
                  Dashboard
                </Link>

                <UserAccountNav
                  name={user.name || 'Account'}
                  email={user.email ?? ''}
                  imageUrl={user.image ?? ''}
                />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
