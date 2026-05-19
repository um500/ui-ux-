'use client'

import { useState, use, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MainLayout from '@/components/layout/MainLayout'
import ProductGrid from '@/components/products/ProductGrid'
import CategoryBanner from '@/components/banners/CategoryBanner'
import { allProducts } from '@/data/products'
import { categories, getCategoryMeta } from '@/data/categories'
import { SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutGrid } from 'lucide-react'

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'newest' },
  { label: 'Best Rated', value: 'rating' },
]

const priceRanges = [
  { label: 'Under Rs. 500', min: 0, max: 500 },
  { label: 'Rs. 500 - Rs. 1000', min: 500, max: 1000 },
  { label: 'Rs. 1000 - Rs. 2000', min: 1000, max: 2000 },
  { label: 'Rs. 2000 - Rs. 5000', min: 2000, max: 5000 },
  { label: 'Above Rs. 5000', min: 5000, max: Infinity },
]

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug
  const meta = getCategoryMeta(slug)

  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [gridView, setGridView] = useState<'default' | 'compact'>('default')
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [showOnlyNew, setShowOnlyNew] = useState(false)
  const [showOnlyBestseller, setShowOnlyBestseller] = useState(false)

  // Get products based on slug
  const baseProducts = useMemo(() => {
    if (slug === 'all') {
      return allProducts
    }
    return allProducts.filter((product) => {
      const formattedCategory = product.category
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/'/g, '')
      return formattedCategory === slug
    })
  }, [slug])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = [...baseProducts]

    // Category filter (for "all" page)
    if (selectedCategory) {
      products = products.filter((p) => p.category === selectedCategory)
    }

    // Subcategory filter
    if (selectedSubcategory) {
      products = products.filter((p) => p.subcategory === selectedSubcategory)
    }

    // Price filter
    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange]
      products = products.filter(
        (p) => p.price >= range.min && p.price < range.max
      )
    }

    // New filter
    if (showOnlyNew) {
      products = products.filter((p) => p.isNew)
    }

    // Bestseller filter
    if (showOnlyBestseller) {
      products = products.filter((p) => p.isBestseller)
    }

    // Sort products
    switch (sortBy) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        products.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        products.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        products = products
          .filter((p) => p.isNew)
          .concat(products.filter((p) => !p.isNew))
        break
    }

    return products
  }, [
    baseProducts,
    selectedCategory,
    selectedSubcategory,
    selectedPriceRange,
    showOnlyNew,
    showOnlyBestseller,
    sortBy,
  ])

  // Get available subcategories based on current selection
  const availableSubcategories = useMemo(() => {
    if (slug === 'all') {
      if (selectedCategory) {
        const cat = categories.find((c) => c.name === selectedCategory)
        return cat?.subcategories || []
      }
      return []
    }
    const cat = categories.find((c) => c.slug === slug)
    return cat?.subcategories || []
  }, [slug, selectedCategory])

  const clearFilters = () => {
    setSelectedPriceRange(null)
    setSelectedCategory(null)
    setSelectedSubcategory(null)
    setShowOnlyNew(false)
    setShowOnlyBestseller(false)
  }

  const hasActiveFilters =
    selectedPriceRange !== null ||
    selectedCategory !== null ||
    selectedSubcategory !== null ||
    showOnlyNew ||
    showOnlyBestseller

  if (!meta) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
            Category Not Found
          </h1>
          <p className="text-muted-foreground">
            The category you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      {/* Hero Banner */}
      <CategoryBanner
        title={meta.title}
        description={meta.description}
        productCount={filteredProducts.length}
        color={meta.color}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                showFilters || hasActiveFilters
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-foreground border-border hover:border-primary/50'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="font-medium">Filters</span>
              {hasActiveFilters && (
                <span className="w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {
                    [
                      selectedPriceRange !== null,
                      selectedCategory !== null,
                      selectedSubcategory !== null,
                      showOnlyNew,
                      showOnlyBestseller,
                    ].filter(Boolean).length
                  }
                </span>
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Grid Toggle */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-muted rounded-lg">
              <button
                onClick={() => setGridView('default')}
                className={`p-2 rounded-md transition-colors ${
                  gridView === 'default'
                    ? 'bg-card shadow-sm text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridView('compact')}
                className={`p-2 rounded-md transition-colors ${
                  gridView === 'compact'
                    ? 'bg-card shadow-sm text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-4 py-2.5 pr-10 rounded-xl bg-card border border-border text-foreground font-medium cursor-pointer hover:border-primary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mb-8"
            >
              <div className="p-6 bg-card rounded-2xl border border-border/50 space-y-6">
                {/* Category Filter - Only show on "all" page */}
                {slug === 'all' && (
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-3">
                      Category
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          setSelectedCategory(null)
                          setSelectedSubcategory(null)
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedCategory === null
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        All
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat.slug}
                          onClick={() => {
                            setSelectedCategory(cat.name)
                            setSelectedSubcategory(null)
                          }}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedCategory === cat.name
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subcategory Filter */}
                {availableSubcategories.length > 0 && (
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-3">
                      Type
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedSubcategory(null)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedSubcategory === null
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        All
                      </button>
                      {availableSubcategories.map((sub) => (
                        <button
                          key={sub}
                          onClick={() => setSelectedSubcategory(sub)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedSubcategory === sub
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Range */}
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-3">
                    Price Range
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map((range, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          setSelectedPriceRange(
                            selectedPriceRange === index ? null : index
                          )
                        }
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedPriceRange === index
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Filters */}
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-3">
                    Quick Filters
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setShowOnlyNew(!showOnlyNew)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        showOnlyNew
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      New Arrivals
                    </button>
                    <button
                      onClick={() => setShowOnlyBestseller(!showOnlyBestseller)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        showOnlyBestseller
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      Bestsellers
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} columns={gridView} />
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <SlidersHorizontal className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-heading text-xl font-bold text-foreground mb-2">
              No Products Found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters to find what you&apos;re looking for.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
