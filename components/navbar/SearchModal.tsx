'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowRight, TrendingUp } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { allProducts } from '@/data/products'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const popularSearches = [
  'Baby Towels',
  'Quilts',
  'Backpacks',
  'Gift Sets',
  'Rompers',
  'Bath Robes',
]

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<typeof allProducts>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    if (query.length >= 2) {
      const filtered = allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.subcategory?.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered.slice(0, 6))
    } else {
      setResults([])
    }
  }, [query])

  const handleClose = () => {
    setQuery('')
    setResults([])
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 p-4 pt-16 md:pt-20"
          >
            <div className="max-w-2xl mx-auto bg-card rounded-2xl shadow-2xl overflow-hidden border border-border/50">
              {/* Search Input */}
              <div className="relative p-4 border-b border-border/50">
                <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-12 py-3 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-lg"
                />
                <button
                  onClick={handleClose}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Results / Popular Searches */}
              <div className="max-h-[60vh] overflow-y-auto">
                {results.length > 0 ? (
                  <div className="p-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Products
                    </p>
                    <div className="space-y-2">
                      {results.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.id}`}
                          onClick={handleClose}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted transition-colors group"
                        >
                          <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                              {product.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {product.category}
                            </p>
                          </div>
                          <span className="font-heading font-bold text-foreground">
                            Rs. {product.price.toLocaleString()}
                          </span>
                        </Link>
                      ))}
                    </div>

                    <Link
                      href={`/category/all?search=${encodeURIComponent(query)}`}
                      onClick={handleClose}
                      className="flex items-center justify-center gap-2 mt-4 py-3 bg-muted rounded-xl text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      View all results
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Popular Searches
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-4 py-2 bg-muted rounded-full text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
