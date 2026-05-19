'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useCart } from '@/context/cart-context'
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react'

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, addToCart } = useCart()

  const handleMoveToCart = (item: typeof wishlistItems[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      category: item.category,
    })
    removeFromWishlist(item.id)
  }

  if (wishlistItems.length === 0) {
    return (
      <main className="bg-background min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-3">Your Wishlist is Empty</h1>
            <p className="text-muted-foreground mb-8">Save items you love by clicking the heart icon on products.</p>
            <Link
              href="/category/all"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Browse Products
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {wishlistItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm group"
              >
                {/* Image */}
                <Link href={`/product/${item.id}`} className="block relative aspect-[4/5] overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.isNew && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                      NEW
                    </span>
                  )}
                  {item.isBestseller && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-[#C9876B] text-white text-xs font-bold rounded-full">
                      BESTSELLER
                    </span>
                  )}
                </Link>

                {/* Content */}
                <div className="p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    {item.category}
                  </p>
                  <Link href={`/product/${item.id}`}>
                    <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {item.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-heading font-bold text-lg text-foreground">
                      Rs. {item.price.toLocaleString()}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        Rs. {item.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="flex-1 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="p-2.5 border border-border rounded-xl hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
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

      <Footer />
    </main>
  )
}
