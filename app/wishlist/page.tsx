'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import WishlistItem from '@/components/wishlist/WishlistItem'
import { useCart } from '@/context/cart-context'
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react'

export default function WishlistPage() {
  const { wishlistItems } = useCart()

  if (wishlistItems.length === 0) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-3">
              Your Wishlist is Empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Save items you love by clicking the heart icon on products.
            </p>
            <Link
              href="/category/all"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Browse Products
            </Link>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <Heart className="w-7 h-7 text-red-500" fill="currentColor" />
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              My Wishlist
            </h1>
          </div>
          <span className="text-muted-foreground">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
          </span>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {wishlistItems.map((item) => (
              <WishlistItem key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </div>

        <Link
          href="/category/all"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium mt-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>
      </div>
    </MainLayout>
  )
}
