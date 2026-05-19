'use client'

import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pb-16 lg:pb-0">
        {children}
      </main>
      <Footer />
    </div>
  )
}
