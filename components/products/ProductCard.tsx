'use client'

import { motion } from 'framer-motion'
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/cart-context'
import type { Product } from '@/data/products'

interface ProductCardProps {
  product: Product
  compact?: boolean
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, isInCart } = useCart()
  const [isHovered, setIsHovered] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const { id, name, price, originalPrice, image, category, rating = 4.5, isNew, isBestseller } = product

  const wishlisted = isInWishlist(id)
  const inCart = isInCart(id)

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (wishlisted) {
      removeFromWishlist(id)
    } else {
      addToWishlist({
        id,
        name,
        price,
        originalPrice,
        image,
        category,
        rating,
        isNew,
        isBestseller,
      })
    }
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id,
      name,
      price,
      originalPrice,
      image,
      category,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <motion.div
      className="group h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-card rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-border/50">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-muted aspect-[4/5]">
          <Link href={`/product/${id}`}>
            <motion.img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-2 md:top-4 left-2 md:left-4 flex flex-col gap-1 md:gap-2">
            {discount && (
              <span className="px-2 md:px-3 py-0.5 md:py-1 bg-accent text-accent-foreground text-[10px] md:text-xs font-bold rounded-full">
                {discount}% OFF
              </span>
            )}
            {isNew && (
              <span className="px-2 md:px-3 py-0.5 md:py-1 bg-primary text-primary-foreground text-[10px] md:text-xs font-bold rounded-full">
                NEW
              </span>
            )}
            {isBestseller && (
              <span className="px-2 md:px-3 py-0.5 md:py-1 bg-soft-terracotta text-white text-[10px] md:text-xs font-bold rounded-full">
                BEST
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <motion.div
            className="absolute top-2 md:top-4 right-2 md:right-4 flex flex-col gap-1 md:gap-2"
            initial={{ opacity: 0, x: 10 }}
            animate={{
              opacity: isHovered || wishlisted ? 1 : 0,
              x: isHovered || wishlisted ? 0 : 10,
            }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              onClick={handleWishlistToggle}
              className={`p-1.5 md:p-2.5 rounded-lg md:rounded-xl backdrop-blur-md transition-all ${
                wishlisted
                  ? 'bg-red-500 text-white'
                  : 'bg-card/90 text-foreground hover:bg-card'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart
                className="w-3.5 h-3.5 md:w-4 md:h-4"
                fill={wishlisted ? 'currentColor' : 'none'}
              />
            </motion.button>

            <Link href={`/product/${id}`}>
              <motion.div
                className="p-1.5 md:p-2.5 rounded-lg md:rounded-xl bg-card/90 text-foreground hover:bg-card backdrop-blur-md transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </motion.div>
            </Link>
          </motion.div>

          {/* Quick Add Button - Hidden on mobile, shown on hover for desktop */}
          <motion.div
            className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 hidden md:block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              className={`w-full py-2.5 md:py-3 font-semibold rounded-lg md:rounded-xl transition-colors flex items-center justify-center gap-2 text-sm ${
                addedToCart || inCart
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-foreground text-background hover:bg-foreground/90'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleQuickAdd}
            >
              <ShoppingBag className="w-4 h-4" />
              {addedToCart ? 'Added!' : inCart ? 'Add More' : 'Quick Add'}
            </motion.button>
          </motion.div>
        </div>

        {/* Content */}
        <Link href={`/product/${id}`} className="flex-1 flex flex-col">
          <div className="p-3 md:p-5 flex-1 flex flex-col">
            <div className="flex-1">
              <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mb-1 md:mb-2 font-medium line-clamp-1">
                {category}
              </p>
              <h3 className="font-heading font-bold text-foreground text-sm md:text-base group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                {name}
              </h3>
            </div>

            <div className="mt-2 md:mt-4 space-y-2 md:space-y-3">
              {/* Rating */}
              <div className="flex items-center gap-1 md:gap-2">
                <div className="flex items-center gap-0.5 md:gap-1">
                  <Star className="w-3 h-3 md:w-4 md:h-4 fill-accent text-accent" />
                  <span className="text-xs md:text-sm font-semibold text-foreground">
                    {rating}
                  </span>
                </div>
                <span className="text-[10px] md:text-xs text-muted-foreground hidden sm:inline">
                  (128 reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1.5 md:gap-2 flex-wrap">
                <span className="font-heading font-bold text-base md:text-xl text-foreground">
                  Rs. {price.toLocaleString()}
                </span>
                {originalPrice && (
                  <span className="text-xs md:text-sm text-muted-foreground line-through">
                    Rs. {originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Mobile Add to Cart Button */}
              <button
                onClick={handleQuickAdd}
                className={`w-full py-2 font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 text-xs md:hidden ${
                  addedToCart || inCart
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-foreground text-background'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                {addedToCart ? 'Added!' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  )
}
