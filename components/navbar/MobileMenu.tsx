'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { X, Heart, ShoppingCart, ChevronRight, Sparkles } from 'lucide-react'
import { useCart } from '@/context/cart-context'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  categories: Array<{
    name: string
    href: string
    description: string
    image: string
  }>
}

export default function MobileMenu({ isOpen, onClose, categories }: MobileMenuProps) {
  const { cartCount, wishlistCount } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-[85%] max-w-[380px] bg-background z-50 shadow-2xl flex flex-col rounded-l-3xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border/50">
              <Link href="/" onClick={onClose}>
                <span className="font-heading text-xl font-bold text-primary">
                  LittleBloom
                </span>
              </Link>
              <button
                onClick={onClose}
                className="p-2.5 hover:bg-muted rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Featured Banner */}
              <div className="p-4">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">New Arrivals</p>
                    <p className="text-xs text-muted-foreground">Explore latest collection</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground ml-auto" />
                </div>
              </div>

              {/* Navigation Links */}
              <div className="px-4 pb-2">
                <Link
                  href="/"
                  className="flex items-center justify-between px-4 py-4 rounded-xl hover:bg-muted text-foreground font-medium transition-colors"
                  onClick={onClose}
                >
                  Home
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Link>
              </div>

              {/* Shop Categories */}
              <div className="px-4 pb-4">
                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Shop Categories
                </div>

                <div className="space-y-1 mt-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-muted text-foreground transition-colors group"
                      onClick={onClose}
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted flex-shrink-0 ring-2 ring-transparent group-hover:ring-primary/30 transition-all">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          {cat.name}
                        </span>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {cat.description}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Other Links */}
              <div className="px-4 pb-4">
                <Link
                  href="/category/return-gifts"
                  className="flex items-center justify-between px-4 py-4 rounded-xl hover:bg-muted text-foreground font-medium transition-colors"
                  onClick={onClose}
                >
                  Gifts
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-between px-4 py-4 rounded-xl hover:bg-muted text-foreground font-medium transition-colors"
                  onClick={onClose}
                >
                  Contact Us
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Link>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-border/50 bg-muted/30">
              <div className="flex gap-3">
                <Link
                  href="/wishlist"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-background border border-border text-foreground font-semibold hover:border-primary/50 transition-colors"
                  onClick={onClose}
                >
                  <Heart className="w-5 h-5" />
                  Wishlist
                  {wishlistCount > 0 && (
                    <span className="w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/cart"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                  onClick={onClose}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Cart
                  {cartCount > 0 && (
                    <span className="w-5 h-5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
