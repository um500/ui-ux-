'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ProductCard from '@/components/products/ProductCard'
import type { Product } from '@/data/products'

interface MomSectionProps {
  products: Product[]
}

export default function MomSection({ products }: MomSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-section-mom relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-soft-terracotta/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden">
              <img
                src="/mom-1.jpg"
                alt="Mother and child moment"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl overflow-hidden border-4 border-card shadow-lg hidden md:block">
              <img
                src="/mom-2.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <span className="text-sm font-semibold text-soft-terracotta uppercase tracking-wider">
              For the Heart of Home
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
              Mom&apos;s Corner
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Celebrate the beautiful journey of motherhood with our
              thoughtfully curated collection. Each piece is designed to bring
              warmth, comfort, and a touch of elegance to everyday moments.
            </p>
            <blockquote className="border-l-4 border-soft-terracotta pl-6 py-2 text-foreground italic">
              &ldquo;The smallest things take up the most room in your
              heart.&rdquo;
            </blockquote>
            <Link href="/category/moms-corner">
              <motion.button
                className="mt-4 px-8 py-4 bg-soft-terracotta text-white font-semibold rounded-full hover:shadow-lg transition-all flex items-center gap-2 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Products */}
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
