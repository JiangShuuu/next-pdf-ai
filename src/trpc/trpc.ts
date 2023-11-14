import { TRPCError, initTRPC } from '@trpc/server'
import getCurrentUser from '@/actions/getCurrentUser'

const t = initTRPC.create()
const middleware = t.middleware

const isAuth = middleware(async (opts) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return opts.next({
    ctx: {
      userId: currentUser.id,
      currentUser
    }
  })
})

export const router = t.router
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(isAuth)
