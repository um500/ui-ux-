'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ProductCard from '@/components/products/ProductCard'
import type { Product } from '@/data/products'

interface CategorySectionProps {
  title: string
  subtitle: string
  description: string
  products: Product[]
  href: string
  bgColor: string
  accentColor: string
  reversed?: boolean
}

export default function CategorySection({
  title,
  subtitle,
  description,
  products,
  href,
  bgColor,
  accentColor,
  reversed = false,
}: CategorySectionProps) {
  return (
    <section className={`py-20 md:py-28 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 ${
            reversed ? 'md:flex-row-reverse text-right' : ''
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={reversed ? 'md:text-right' : ''}>
            <span
              className={`text-sm font-semibold ${accentColor} uppercase tracking-wider`}
            >
              {subtitle}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              {description}
            </p>
          </div>
          <Link href={href}>
            <motion.button
              className="px-6 py-3 bg-foreground text-background font-semibold rounded-full hover:bg-foreground/90 transition-colors flex items-center gap-2 group whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 4).map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
