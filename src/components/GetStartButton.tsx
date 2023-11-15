'use client'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import useLoginModal from '@/hooks/useLoginModal'
import { useRouter } from 'next/navigation'

interface GetStartButtonProps {
  user: {
    name: string | null
    id: string | null
    image: string | null
    email: string | null
  } | null
}

export default function GetStartButton({ user }: GetStartButtonProps) {
  const loginModal = useLoginModal()
  const router = useRouter()
  const toggleStart = () => {
    if (user) {
      router.push('/dashboard')
    } else {
      loginModal.onOpen()
    }
  }
  return (
    <button
      className={buttonVariants({
        size: 'lg',
        className: 'mt-5'
      })}
      onClick={toggleStart}
    >
      Get started <ArrowRight className="ml-2 h-5 w-5" />
    </button>
  )
}
