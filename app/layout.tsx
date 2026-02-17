import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { AuthProvider } from '@/lib/auth-context'
import { UserDataProvider } from '@/lib/user-data-context'
import DemoInit from '@/components/demo-init'
import { SunshineBackground } from '@/components/sunshine-background'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sunshine Academy - Brighten Your Future with Online Learning',
  description: 'Unlock your potential with Sunshine Academy. Expert-led courses in technology, personal development, and creative skills. Start your learning journey today.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased relative">
        <SunshineBackground />
        <DemoInit />
        <AuthProvider>
          <UserDataProvider>
            {children}
          </UserDataProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
