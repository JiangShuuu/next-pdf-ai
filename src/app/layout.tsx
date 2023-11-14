import { Inter } from 'next/font/google'
import './globals.css'
import { cn, constructMetadata } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/toaster'
import { ModalProvider } from '@/components/providers/modal-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = constructMetadata()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <Providers>
        <body className={cn('grainy min-h-screen font-sans antialiased', inter.className)}>
          <Toaster />
          <Navbar />
          <ModalProvider />
          {children}
        </body>
      </Providers>
    </html>
  )
}
