'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { categories } from '@/data/categories'

interface CategorySidebarProps {
  currentSlug?: string
  onCategoryClick?: () => void
}

export default function CategorySidebar({ currentSlug, onCategoryClick }: CategorySidebarProps) {
  return (
    <div className="bg-card rounded-2xl p-4 border border-border/50">
      <h3 className="font-heading font-bold text-foreground mb-4 px-2">
        Categories
      </h3>

      <div className="space-y-1">
        <Link
          href="/category/all"
          className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors group ${
            currentSlug === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted text-foreground'
          }`}
          onClick={onCategoryClick}
        >
          <span className="font-medium text-sm">All Products</span>
          <ChevronRight
            className={`w-4 h-4 transition-transform ${
              currentSlug === 'all'
                ? 'text-primary-foreground'
                : 'text-muted-foreground group-hover:translate-x-0.5'
            }`}
          />
        </Link>

        {categories.map((cat, idx) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Link
              href={`/category/${cat.slug}`}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors group ${
                currentSlug === cat.slug
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted text-foreground'
              }`}
              onClick={onCategoryClick}
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex-1">
                <span className="font-medium text-sm">{cat.name}</span>
                <p
                  className={`text-xs mt-0.5 line-clamp-1 ${
                    currentSlug === cat.slug
                      ? 'text-primary-foreground/70'
                      : 'text-muted-foreground'
                  }`}
                >
                  {cat.subcategories.length} subcategories
                </p>
              </div>
              <ChevronRight
                className={`w-4 h-4 transition-transform ${
                  currentSlug === cat.slug
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground group-hover:translate-x-0.5'
                }`}
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
