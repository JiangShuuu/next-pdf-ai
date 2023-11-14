import Dashboard from '@/components/Dashboard'
import { getUserSubscriptionPlan } from '@/lib/stripe'

const Page = async () => {
  // const subscriptionPlan = await getUserSubscriptionPlan()

  return <Dashboard subscriptionPlan={{ isSubscribed: true }} />
}

export default Page
