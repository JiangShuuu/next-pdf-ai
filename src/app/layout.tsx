import { Inter } from 'next/font/google'
import './globals.css'
import { cn, constructMetadata } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/toaster'
import { ModalProvider } from '@/components/providers/modal-provider'
import getCurrentUser from '../actions/getCurrentUser'
const inter = Inter({ subsets: ['latin'] })

export const metadata = constructMetadata()

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en" className="light">
      <Providers>
        <body className={cn('grainy min-h-screen font-sans antialiased', inter.className)}>
          <Toaster />
          <Navbar currentUser={currentUser} />
          <ModalProvider />
          {children}
        </body>
      </Providers>
    </html>
  )
}
