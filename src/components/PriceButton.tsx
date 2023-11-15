'use client'
import { buttonVariants } from './ui/button'
import { useRouter } from 'next/navigation'
import useLoginModal from '@/hooks/useLoginModal'
import { ArrowRight } from 'lucide-react'

interface PriceButtonProps {
  user: {
    id: string | null
    email: string | null
    image: string | null
    name: string | null
  } | null
  color?: string
}

export default function PriceButton({ user, color }: PriceButtonProps) {
  const router = useRouter()
  const loginModal = useLoginModal()

  const toggle = () => {
    if (user) {
      router.push('/dashboard')
    } else {
      loginModal.onOpen()
    }
  }

  return (
    <button
      className={buttonVariants({
        className: 'w-full',
        variant: color === 'secondary' ? color : null
      })}
      onClick={toggle}
    >
      {user ? 'Upgrade now' : 'Sign in'}
      <ArrowRight className="ml-1.5 h-5 w-5" />
    </button>
  )
}
