import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

interface RegisterModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RegisterModal({ open, setOpen }: RegisterModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      username: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = () => {
    console.log('success')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register Account</DialogTitle>
          <DialogDescription>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Make register to your account here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
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
            {errors.email && <span>This field is required</span>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" defaultValue="" className="col-span-3" placeholder="John" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input id="password" className="col-span-3" type="password" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
