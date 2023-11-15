import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { trpc } from '@/app/_trpc/client'
import { useToast } from './ui/use-toast'
import useRegisterModal from '@/hooks/useRegisterModal'
import useLoginModal from '@/hooks/useLoginModal'
import { cn } from '@/lib/utils'

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.'
  })
})

export default function RegisterModal() {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      password: ''
    }
  })

  const { toast } = useToast()

  const mutation = trpc.registerAccount.useMutation({
    onSuccess: (result) => {
      if (result.success) {
        toast({
          title: 'Register Success, Pleace SignIn!'
        })
      }
      change()
      loginModal.onOpen()
    },
    onError: ({ data }) => {
      console.log('Error:: Register', data)
      if (data && data.code === 'PARSE_ERROR') {
        setError('email', {
          type: 'manual',
          message: 'This Email has already been registered.'
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: `${data?.code}`
        })
        change()
      }
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    mutation.mutate({
      email: data.email,
      name: data.name,
      password: data.password
    })
  }

  const change = () => {
    reset()
    registerModal.onClose()
  }

  const switchModal = () => {
    registerModal.onClose()
    loginModal.onOpen()
  }

  return (
    <Dialog open={registerModal.isOpen} onOpenChange={change}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register Account</DialogTitle>
          <DialogDescription>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Register to your account here. Click register when you're done.
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
                className={cn('col-span-3', errors.email && 'focus-visible:ring-red-500')}
                placeholder="example@gmail.com"
              />
              {errors.email && (
                <p className="absolute -bottom-5 right-0 text-xs text-red-500">
                  {JSON.stringify(errors.email.message)}
                </p>
              )}
            </div>
            <div className="relative grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                {...register('name', { required: true })}
                defaultValue=""
                className={cn('col-span-3', errors.name && 'focus-visible:ring-red-500')}
                placeholder="John"
              />
              {errors.name && (
                <p className="absolute -bottom-5 right-0 text-xs text-red-500">
                  {JSON.stringify(errors.name.message)}
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
                className={cn('col-span-3', errors.password && 'focus-visible:ring-red-500')}
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
                Register
              </Button>
            </div>
            <div className="text-center">
              <p className="cursor-pointer pt-2 text-xs hover:text-blue-600" onClick={switchModal}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Already have an account? Click here to proceed to login
              </p>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
