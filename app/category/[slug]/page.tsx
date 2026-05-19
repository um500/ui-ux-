'use client'

import { useState, use, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ProductCard from '@/components/product-card'
import { allProducts, categories, getProductsByCategory } from '@/data/products'
import { SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutGrid } from 'lucide-react'

const categoryMeta: Record<string, { title: string; description: string; banner: string; color: string }> = {
  'all': {
    title: 'All Products',
    description: 'Discover our complete collection of handcrafted essentials for kids and moms',
    banner: '/home-1.jpg',
    color: 'from-[#7E8B5B]/20 to-[#E6EDDF]',
  },
  'bath-linen': {
    title: 'Bath Linen',
    description: 'Soft, breathable towels and robes crafted from the finest organic cotton',
    banner: '/home-1.jpg',
    color: 'from-[#AFC8D6]/20 to-[#E8F2F5]',
  },
  'bedding': {
    title: 'Bedding',
    description: 'Handcrafted quilts and dohars for peaceful slumber and cozy moments',
    banner: '/home-2.jpg',
    color: 'from-[#7E8B5B]/20 to-[#E6EDDF]',
  },
  'bags': {
    title: 'Bags',
    description: 'Quilted cotton bags with charming prints for everyday adventures',
    banner: '/kids-1.jpg',
    color: 'from-[#8B6B5C]/20 to-[#F0EBE4]',
  },
  'kids-accessories': {
    title: 'Kids Accessories',
    description: 'Thoughtfully designed accessories for play, rest, and creative exploration',
    banner: '/kids-2.jpg',
    color: 'from-[#C9876B]/20 to-[#F4E8E4]',
  },
  'clothing': {
    title: 'clothing',
    description: 'Thoughtfully designed accessories for play, rest, and creative exploration',
    banner: '/kids-2.jpg',
    color: 'from-[#C9876B]/20 to-[#F4E8E4]',
  },
  'moms-corner': {
    title: "Mom's Corner",
    description: 'Thoughtfully curated collection celebrating the beautiful journey of motherhood',
    banner: '/mom-1.jpg',
    color: 'from-[#C9876B]/20 to-[#FBF5F2]',
  },
  'return-gifts': {
    title: 'Return Gifts',
    description: 'Premium gift hampers and curated boxes for every special celebration',
    banner: '/gift-1.jpg',
    color: 'from-[#D4B15A]/20 to-[#F5EDE0]',
  },
}

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
  const meta = categoryMeta[slug]
  
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [gridView, setGridView] = useState<'small' | 'large'>('large')
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [showOnlyNew, setShowOnlyNew] = useState(false)
  const [showOnlyBestseller, setShowOnlyBestseller] = useState(false)

  // Get products based on slug
  const baseProducts = useMemo(() => {
    return getProductsByCategory(slug)
  }, [slug])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = [...baseProducts]
    
    // Category filter (for "all" page)
    if (selectedCategory) {
      products = products.filter(p => p.category === selectedCategory)
    }
    
    // Subcategory filter
    if (selectedSubcategory) {
      products = products.filter(p => p.subcategory === selectedSubcategory)
    }
    
    // Price filter
    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange]
      products = products.filter(p => p.price >= range.min && p.price < range.max)
    }
    
    // New filter
    if (showOnlyNew) {
      products = products.filter(p => p.isNew)
    }
    
    // Bestseller filter
    if (showOnlyBestseller) {
      products = products.filter(p => p.isBestseller)
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
        products = products.filter(p => p.isNew).concat(products.filter(p => !p.isNew))
        break
    }

    return products
  }, [baseProducts, selectedCategory, selectedSubcategory, selectedPriceRange, showOnlyNew, showOnlyBestseller, sortBy])

  // Get available subcategories based on current selection
  const availableSubcategories = useMemo(() => {
    if (slug === 'all') {
      if (selectedCategory) {
        const cat = categories.find(c => c.name === selectedCategory)
        return cat?.subcategories || []
      }
      return []
    }
    const cat = categories.find(c => c.slug === slug)
    return cat?.subcategories || []
  }, [slug, selectedCategory])

  const clearFilters = () => {
    setSelectedPriceRange(null)
    setSelectedCategory(null)
    setSelectedSubcategory(null)
    setShowOnlyNew(false)
    setShowOnlyBestseller(false)
  }

  const hasActiveFilters = selectedPriceRange !== null || selectedCategory !== null || selectedSubcategory !== null || showOnlyNew || showOnlyBestseller

  if (!meta) {
    return (
      <main className="bg-background min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Category Not Found</h1>
          <p className="text-muted-foreground">The category you&apos;re looking for doesn&apos;t exist.</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      {/* Hero Banner */}
      <section className={`relative bg-gradient-to-br ${meta.color} overflow-hidden`}>
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
                {meta.title}
              </h1>
              <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
                {meta.description}
              </p>
              <p className="text-sm text-primary font-medium mt-3">
                {filteredProducts.length} Products
              </p>
            </motion.div>
          </div>
        </div>
      </section>

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
                  {[selectedPriceRange !== null, selectedCategory !== null, selectedSubcategory !== null, showOnlyNew, showOnlyBestseller].filter(Boolean).length}
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
                onClick={() => setGridView('large')}
                className={`p-2 rounded-md transition-colors ${
                  gridView === 'large' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridView('small')}
                className={`p-2 rounded-md transition-colors ${
                  gridView === 'small' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
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
                    <h3 className="font-heading font-semibold text-foreground mb-3">Category</h3>
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
                    <h3 className="font-heading font-semibold text-foreground mb-3">Type</h3>
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
                  <h3 className="font-heading font-semibold text-foreground mb-3">Price Range</h3>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map((range, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedPriceRange(selectedPriceRange === index ? null : index)}
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
                  <h3 className="font-heading font-semibold text-foreground mb-3">Quick Filters</h3>
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
          <div className={`grid gap-6 ${
            gridView === 'large' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                category={product.subcategory}
                rating={product.rating}
                isNew={product.isNew}
                isBestseller={product.isBestseller}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <SlidersHorizontal className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-heading text-xl font-bold text-foreground mb-2">No Products Found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your filters to find what you&apos;re looking for.</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
