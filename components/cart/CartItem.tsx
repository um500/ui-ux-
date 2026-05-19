'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import type { CartItem as CartItemType } from '@/context/cart-context'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="flex gap-4 p-4 bg-card rounded-2xl border border-border/50"
    >
      {/* Product Image */}
      <Link href={`/product/${item.id}`} className="flex-shrink-0">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-muted">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-2">
          <div>
            <Link href={`/product/${item.id}`}>
              <h3 className="font-heading font-bold text-foreground hover:text-primary transition-colors line-clamp-2 text-sm md:text-base">
                {item.name}
              </h3>
            </Link>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              {item.category}
              {item.color && ` | ${item.color}`}
              {item.size && ` | ${item.size}`}
            </p>
          </div>
          <p className="font-heading font-bold text-base md:text-lg text-foreground whitespace-nowrap">
            Rs. {(item.price * item.quantity).toLocaleString()}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3">
          {/* Quantity Controls */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-md hover:bg-card transition-colors"
            >
              <Minus className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
            <span className="w-8 md:w-10 text-center font-semibold text-foreground text-sm md:text-base">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-md hover:bg-card transition-colors"
            >
              <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeFromCart(item.id)}
            className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
