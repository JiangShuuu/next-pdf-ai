import { Loader2 } from 'lucide-react'
import ChatInput from './ChatInput'
import Messages from './Messages'
import { trpc } from '@/app/_trpc/client'
interface ChatWrapperProps {
  fileId: string
  isSubscribed: boolean
}

export default function ChatWrapper({ fileId, isSubscribed }: ChatWrapperProps) {
  const { data, isLoading } = trpc.getFileUploadStatus.useQuery(
    {
      fileId
    },
    {
      refetchInterval: (data) =>
        data?.status === 'SUCCESS' || data?.status === 'FAILED' ? false : 500
    }
  )

  if (isLoading)
    return (
      <div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-zinc-200 bg-zinc-50">
        <div className="mb-28 flex flex-1 flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <h3 className="text-xl font-semibold">Loading...</h3>
            <p className="text-sm text-zinc-500">We&apos;re preparing your PDF.</p>
          </div>
        </div>

        <ChatInput isDisabled />
      </div>
    )

  return (
    <div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-zinc-200 bg-zinc-50">
      <div className="mb-28 flex flex-1 flex-col items-center justify-center">
        <Messages fileId={fileId} />
      </div>
      <ChatInput />
    </div>
  )
}
