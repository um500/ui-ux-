import type { Metadata, Viewport } from 'next'
import { Baloo_2, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/context/cart-context'
import './globals.css'

const baloo = Baloo_2({ 
  subsets: ["latin"], 
  variable: '--font-baloo',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800']
});

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ['300', '400', '500', '600', '700'], 
  variable: '--font-poppins',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'LittleBloom - Premium Kids & Mom Lifestyle Brand',
  description: 'Discover handcrafted cotton essentials, quilted textures, and premium lifestyle products for kids and mothers. Ethically sourced, beautifully crafted.',
  keywords: ['kids clothing', 'baby essentials', 'mom lifestyle', 'organic cotton', 'handcrafted', 'premium baby products'],
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#7E8B5B',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${baloo.variable} ${poppins.variable} bg-background`}>
      <body className="bg-background text-foreground font-sans antialiased min-h-screen">
        <CartProvider>
          {children}
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
