'use client'

import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import type { Product } from '@/data/products'

interface ProductGridProps {
  products: Product[]
  columns?: 'default' | 'compact'
}

export default function ProductGrid({ products, columns = 'default' }: ProductGridProps) {
  return (
    <div
      className={`grid gap-4 md:gap-6 ${
        columns === 'compact'
          ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
          : 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}
    >
      {products.map((product, idx) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.05 }}
        >
          <ProductCard product={product} compact={columns === 'compact'} />
        </motion.div>
      ))}
    </div>
  )
}
