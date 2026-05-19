'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface CategoryBannerProps {
  title: string
  description: string
  productCount: number
  color: string
}

export default function CategoryBanner({
  title,
  description,
  productCount,
  color,
}: CategoryBannerProps) {
  return (
    <section className={`relative bg-gradient-to-br ${color} overflow-hidden`}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-card/90 via-card/70 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 text-balance">
              {title}
            </h1>
            <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
              {description}
            </p>
            <p className="text-sm text-primary font-medium mt-3">
              {productCount} Products
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
