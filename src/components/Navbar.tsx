import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import { ArrowRight } from 'lucide-react'
import UserAccountNav from './UserAccountNav'
import MobileNav from './MobileNav'
import GetStartButton from './button/GetStartButton'
import SigninButton from './button/SigninButton'

interface NavbarProps {
  currentUser: {
    name: string | null
    email: string | null
    image: string | null
  } | null
}

const Navbar = ({ currentUser }: NavbarProps) => {
  const user = currentUser

  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="z-40 flex font-semibold">
            <span>PDF-Ai Chat</span>
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
                <SigninButton size="sm" />
                <GetStartButton user={user} size="sm" />
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
