'use client'
import { buttonVariants } from '@/components/ui/button'
import useLoginModal from '@/hooks/useLoginModal'

export default function SigninButton({
  size
}: {
  size: 'default' | 'sm' | 'lg' | 'icon' | null | undefined
}) {
  const loginModal = useLoginModal()
  return (
    <button
      className={buttonVariants({
        variant: 'ghost',
        size
      })}
      onClick={loginModal.onOpen}
    >
      Sign in
    </button>
  )
}
