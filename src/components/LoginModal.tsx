import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { signIn } from 'next-auth/react'
import { useToast } from './ui/use-toast'
import useLoginModal from '@/app/hooks/useLoginModal'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import useRegisterModal from '@/app/hooks/useRegisterModal'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export default function LoginModal() {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { toast } = useToast()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    login({
      email: data.email,
      password: data.password
    })
  }

  const login = async (data: { email: string; password: string }) => {
    await signIn('credentials', {
      ...data,
      redirect: false
    }).then((callback) => {
      if (callback?.ok) {
        console.log('callback', callback)
        toast({
          title: 'Success'
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Account or password incorrect.'
        })
      }
    })
    change()
  }

  const change = () => {
    reset()
    loginModal.onClose()
  }

  const switchModal = () => {
    loginModal.onClose()
    registerModal.onOpen()
  }

  return (
    <Dialog open={loginModal.isOpen} onOpenChange={change}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Login to your account here. Click login when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-7 py-4">
            <div className="relative grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                {...register('email', { required: true })}
                defaultValue=""
                className="col-span-3"
                placeholder="example@gmail.com"
              />
              {errors.email && (
                <p className="absolute -bottom-5 right-0 text-xs text-red-500">
                  {JSON.stringify(errors.email.message)}
                </p>
              )}
            </div>
            <div className="relative grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                {...register('password', { required: true })}
                className="col-span-3"
                type="password"
              />
              {errors.password && (
                <p className="absolute -bottom-5 right-0 text-xs text-red-500">
                  {JSON.stringify(errors.password.message)}
                </p>
              )}
            </div>
            <div className="text-center">
              <Button type="submit" className="w-40">
                Login
              </Button>
            </div>
            <div className="text-center">
              <p className="mb-5 text-sm font-bold">Third-party Login</p>
              <div className="flex items-center justify-center space-x-6">
                <Button variant="outline" size="icon" onClick={() => signIn('google')}>
                  <FcGoogle className="h-6 w-6" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => signIn('github')}>
                  <FaGithub className="h-6 w-6" />
                </Button>
              </div>
            </div>
            <div className="text-center">
              <p className="cursor-pointer pt-2 text-xs hover:text-blue-600" onClick={switchModal}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Don't have an account yet? Click here to register.
              </p>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
