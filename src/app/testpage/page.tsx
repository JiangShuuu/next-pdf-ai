'use client'
import React, { useState } from 'react'
import { trpc } from '@/app/_trpc/client'
import { signIn } from 'next-auth/react'
import { buttonVariants } from '@/components/ui/button'
import RegisterModal from '@/components/RegisterModal'
export default function Page() {
  const [open, setOpen] = useState(false)

  const mutation = trpc.registerAccount.useMutation({
    onSuccess: (result) => {
      console.log('result', result)
    }
  })
  const register = async () => {
    mutation.mutate({
      email: 'globe01@gmail.com',
      name: 'john',
      password: 'qwer1234'
    })
  }

  const login = async () => {
    const data = {
      email: 'globe01@gmail.com',
      password: 'qwer1234'
    }
    signIn('credentials', {
      ...data,
      redirect: false
    }).then((callback) => {
      console.log('callback', callback)
    })
  }

  return (
    <div className="h-screen w-full space-x-10">
      <button
        className={buttonVariants({
          size: 'lg',
          className: 'mt-5'
        })}
        onClick={() => register()}
      >
        registerButton
      </button>
      <button
        className={buttonVariants({
          size: 'lg',
          className: 'mt-5'
        })}
        onClick={() => login()}
      >
        loginButton
      </button>
      <button
        className={buttonVariants({
          size: 'lg',
          className: 'mt-5'
        })}
        onClick={() => setOpen(!open)}
      >
        openButton
      </button>
      <RegisterModal open={open} setOpen={setOpen} />
    </div>
  )
}
