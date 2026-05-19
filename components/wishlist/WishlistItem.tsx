'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import type { WishlistItem as WishlistItemType } from '@/context/cart-context'

interface WishlistItemProps {
  item: WishlistItemType
}

export default function WishlistItem({ item }: WishlistItemProps) {
  const { addToCart, removeFromWishlist } = useCart()

  const handleMoveToCart = () => {
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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm group"
    >
      {/* Image */}
      <Link
        href={`/product/${item.id}`}
        className="block relative aspect-[4/5] overflow-hidden bg-muted"
      >
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
          <span className="absolute top-3 left-3 px-3 py-1 bg-soft-terracotta text-white text-xs font-bold rounded-full">
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
            onClick={handleMoveToCart}
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
  )
}
