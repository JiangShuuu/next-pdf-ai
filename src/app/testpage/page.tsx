'use client'
import React from 'react'
import { buttonVariants } from '@/components/ui/button'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '../hooks/useLoginModal'

export default function Page() {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  return (
    <div className="h-screen w-full space-x-10">
      <button
        className={buttonVariants({
          size: 'lg',
          className: 'mt-5'
        })}
        onClick={registerModal.onOpen}
      >
        onRegisterButton
      </button>
      <button
        className={buttonVariants({
          size: 'lg',
          className: 'mt-5'
        })}
        onClick={loginModal.onOpen}
      >
        onLoginButton
      </button>
    </div>
  )
}
