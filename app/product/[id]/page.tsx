'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'
import ProductCard from '@/components/products/ProductCard'
import { useCart } from '@/context/cart-context'
import { getProductById, allProducts } from '@/data/products'
import {
  Heart,
  Check,
  Truck,
  Shield,
  RefreshCw,
  Star,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  Share2,
  Ruler,
  Package,
} from 'lucide-react'
import Link from 'next/link'

// Default product data for demo
const defaultImages = ['/home-1.jpg', '/home-2.jpg', '/home-3.jpg', '/kids-1.jpg']
const defaultColors = [
  { name: 'Sage Green', hex: '#7E8B5B' },
  { name: 'Dusty Blue', hex: '#AFC8D6' },
  { name: 'Warm Cream', hex: '#F8F2E8' },
  { name: 'Soft Terracotta', hex: '#C9876B' },
]
const defaultSizes = ['0-12 months', '1-3 years', '3-5 years']

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const product = getProductById(productId)
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart()

  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState(defaultSizes[0])
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'description' | 'materials' | 'care'>('description')
  const [addedToCart, setAddedToCart] = useState(false)

  // Fallback for products not found
  const displayProduct = product || {
    id: productId,
    name: 'Premium Hooded Towel Set',
    price: 1299,
    originalPrice: 1799,
    rating: 4.9,
    image: '/home-1.jpg',
    category: 'Bath Linen',
    subcategory: 'Hoodie Towels',
    isNew: false,
    isBestseller: true,
  }

  const isWishlisted = isInWishlist(displayProduct.id)
  const discount = displayProduct.originalPrice
    ? Math.round(
        ((displayProduct.originalPrice - displayProduct.price) /
          displayProduct.originalPrice) *
          100
      )
    : 0

  const images = product?.image ? [product.image, ...defaultImages.slice(1)] : defaultImages

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleAddToCart = () => {
    addToCart({
      id: displayProduct.id,
      name: displayProduct.name,
      price: displayProduct.price,
      originalPrice: displayProduct.originalPrice,
      image: displayProduct.image,
      category: displayProduct.category,
      size: selectedSize,
      color: defaultColors[selectedColorIndex].name,
    }, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(displayProduct.id)
    } else {
      addToWishlist({
        id: displayProduct.id,
        name: displayProduct.name,
        price: displayProduct.price,
        originalPrice: displayProduct.originalPrice,
        image: displayProduct.image,
        category: displayProduct.category,
        rating: displayProduct.rating,
        isNew: displayProduct.isNew,
        isBestseller: displayProduct.isBestseller,
      })
    }
  }

  // Get related products
  const relatedProducts = allProducts
    .filter((p) => p.category === displayProduct.category && p.id !== displayProduct.id)
    .slice(0, 4)

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/category/${displayProduct.category.toLowerCase().replace(/\s+/g, '-')}`}
            className="hover:text-foreground transition-colors"
          >
            {displayProduct.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{displayProduct.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative bg-muted rounded-3xl overflow-hidden aspect-square group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    alt={displayProduct.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-card/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-card/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Discount Badge */}
                {discount > 0 && (
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-accent text-accent-foreground text-sm font-bold rounded-full">
                      {discount}% OFF
                    </span>
                  </div>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-card/90 backdrop-blur-sm rounded-full text-sm font-medium">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Category & Share */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
                  {displayProduct.category} / {displayProduct.subcategory || 'Products'}
                </p>
                <button className="p-2 hover:bg-muted rounded-xl transition-colors">
                  <Share2 className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Title */}
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">
                {displayProduct.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(displayProduct.rating)
                            ? 'fill-accent text-accent'
                            : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-foreground">
                    {displayProduct.rating}
                  </span>
                </div>
                <span className="text-muted-foreground">(156 reviews)</span>
                <span className="text-primary font-medium">In Stock</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 pb-6 border-b border-border flex-wrap">
                <span className="text-4xl font-heading font-bold text-foreground">
                  Rs. {displayProduct.price.toLocaleString()}
                </span>
                {displayProduct.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      Rs. {displayProduct.originalPrice.toLocaleString()}
                    </span>
                    <span className="px-3 py-1 bg-accent/10 text-accent font-semibold rounded-full text-sm">
                      Save Rs.{' '}
                      {(displayProduct.originalPrice - displayProduct.price).toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                Wrap your little one in pure comfort with our premium product.
                Crafted from 100% organic cotton, incredibly soft against delicate
                skin while being highly absorbent.
              </p>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Color:{' '}
                  <span className="font-normal text-muted-foreground">
                    {defaultColors[selectedColorIndex].name}
                  </span>
                </label>
                <div className="flex gap-3">
                  {defaultColors.map((color, idx) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedColorIndex === idx
                          ? 'border-foreground ring-2 ring-offset-2 ring-foreground/20'
                          : 'border-border hover:border-foreground/50'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColorIndex === idx && (
                        <Check
                          className={`w-4 h-4 ${
                            color.hex === '#F8F2E8'
                              ? 'text-foreground'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-foreground">
                    Size:{' '}
                    <span className="font-normal text-muted-foreground">
                      {selectedSize}
                    </span>
                  </label>
                  <button className="text-sm text-primary hover:underline flex items-center gap-1">
                    <Ruler className="w-4 h-4" />
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {defaultSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-primary text-foreground'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {/* Quantity Selector */}
                <div className="flex items-center gap-1 bg-muted rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg hover:bg-card flex items-center justify-center transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg hover:bg-card flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart */}
                <motion.button
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${
                    addedToCart
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-foreground text-background hover:bg-foreground/90'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Package className="w-5 h-5" />
                  {addedToCart
                    ? 'Added to Cart!'
                    : `Add to Cart - Rs. ${(displayProduct.price * quantity).toLocaleString()}`}
                </motion.button>

                {/* Wishlist */}
                <motion.button
                  onClick={handleWishlistToggle}
                  className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                    isWishlisted
                      ? 'bg-red-50 text-red-500 border-red-200'
                      : 'border-border hover:border-primary text-foreground'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart
                    className="w-5 h-5"
                    fill={isWishlisted ? 'currentColor' : 'none'}
                  />
                </motion.button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
                {[
                  { icon: Truck, title: 'Free Delivery', desc: 'On orders above Rs. 499' },
                  { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
                  { icon: Shield, title: 'Secure Payment', desc: '100% secure checkout' },
                ].map((badge) => {
                  const Icon = badge.icon
                  return (
                    <div key={badge.title} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {badge.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{badge.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex gap-1 bg-muted rounded-xl p-1 w-fit mb-8 overflow-x-auto">
            {[
              { id: 'description', label: 'Details & Story' },
              { id: 'materials', label: 'Materials' },
              { id: 'care', label: 'Care Instructions' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-card rounded-2xl p-8"
            >
              {activeTab === 'description' && (
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                      Our Story
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Each product is lovingly crafted by skilled artisans in Jaipur,
                      using traditional techniques passed down through generations.
                      The organic cotton is sourced from certified farms, ensuring the
                      softest, purest fabric for your little one.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Dimensions:</strong> 90cm x
                      90cm (fits newborn to 5 years)
                    </p>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                      Key Features
                    </h3>
                    <ul className="space-y-3">
                      {[
                        '100% GOTS certified organic cotton',
                        'Extra absorbent and quick-drying',
                        'Adorable animal-inspired designs',
                        'Generous size that grows with your child',
                        'Pre-washed for ultimate softness',
                        'Hypoallergenic and gentle on sensitive skin',
                      ].map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {activeTab === 'materials' && (
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                    Materials Used
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        100% Organic Cotton
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        Natural vegetable dyes
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        No harmful chemicals or synthetic materials
                      </span>
                    </li>
                  </ul>
                </div>
              )}
              {activeTab === 'care' && (
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                    Care Instructions
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Machine wash in cold water with like colors',
                      'Use mild, eco-friendly detergent',
                      'Tumble dry on low heat',
                      'Avoid bleach and fabric softeners',
                      'Iron on low if needed',
                    ].map((instruction, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  )
}
