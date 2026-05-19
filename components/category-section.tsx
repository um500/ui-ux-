'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import ProductCard from './product-card'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating?: number
}

interface CategorySectionProps {
  title: string
  slug: string
  description?: string
  products: Product[]
  color?: 'primary' | 'secondary' | 'accent' | 'pink'
}

export default function CategorySection({
  title,
  slug,
  description,
  products,
  color = 'primary',
}: CategorySectionProps) {

  const sectionStyles = {
    primary: {
      bg: 'bg-[#E8F2F5]',
      badge: 'text-[#AFC8D6]',
    },

    secondary: {
      bg: 'bg-[#E6EDDF]',
      badge: 'text-[#8D9B6A]',
    },

    accent: {
      bg: 'bg-[#F0EBE4]',
      badge: 'text-[#8B6B5C]',
    },

    pink: {
      bg: 'bg-[#F4E8E4]',
      badge: 'text-[#C9876B]',
    },
  }

  const currentStyle = sectionStyles[color]

  return (
    <section className={`${currentStyle.bg} py-12 md:py-24 overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center mb-10 md:mb-16 gap-8">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <p
              className={`uppercase tracking-[3px] text-xs md:text-sm font-bold mb-2 md:mb-3 ${currentStyle.badge}`}
            >
              Soft & Fresh
            </p>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#3B3631] mb-4 leading-tight">
              {title}
            </h2>

            {description && (
              <p className="text-base md:text-xl text-[#5F5B56] leading-relaxed max-w-2xl">
                {description}
              </p>
            )}
          </motion.div>

          {/* BUTTON */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-start lg:justify-end"
          >
            <Link href={`/category/${slug}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="group bg-[#3B3631] text-white px-7 md:px-9 py-3 md:py-4 rounded-full font-semibold flex items-center gap-3 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                View All

                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* MOBILE PRODUCTS */}
        <div className="md:hidden">

          <div className="grid grid-cols-2 gap-3">

            {products.slice(0, 4).map((product, index) => {

              const discount = product.originalPrice
                ? Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )
                : null

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.07,
                  }}
                >
                  <Link href={`/product/${product.id}`}>

                    <div className="bg-white rounded-[22px] overflow-hidden shadow-sm">

                      {/* IMAGE */}
                      <div className="relative aspect-square overflow-hidden">

                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />

                        {discount && (
                          <div className="absolute top-2 left-2 bg-[#D9B24C] text-[#2E2A27] text-[9px] font-bold px-2 py-1 rounded-full">
                            {discount}% OFF
                          </div>
                        )}

                      </div>

                      {/* CONTENT */}
                      <div className="p-2.5">

                        <p className="text-[9px] uppercase tracking-wide text-[#8C8681] mb-1">
                          {product.category}
                        </p>

                        <h3 className="text-[12px] font-bold text-[#2E2A27] leading-snug line-clamp-2 min-h-[32px]">
                          {product.name}
                        </h3>

                        {product.rating && (
                          <div className="flex items-center gap-1 mt-1">

                            <Star className="w-3 h-3 fill-[#F5A623] text-[#F5A623]" />

                            <span className="text-[10px] text-[#5F5B56] font-medium">
                              {product.rating}
                            </span>

                          </div>
                        )}

                        <div className="mt-2 flex items-center gap-1 flex-wrap">

                          <span className="text-[13px] font-extrabold text-[#2E2A27]">
                            ₹{product.price.toLocaleString()}
                          </span>

                          {product.originalPrice && (
                            <span className="text-[10px] text-gray-400 line-through">
                              ₹{product.originalPrice.toLocaleString()}
                            </span>
                          )}

                        </div>

                      </div>

                    </div>

                  </Link>
                </motion.div>
              )
            })}

          </div>

        </div>

        {/* DESKTOP PRODUCTS */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">

          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              className="group"
            >
              <div className="transition-all duration-500 group-hover:-translate-y-2">
                <ProductCard {...product} />
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  )
}