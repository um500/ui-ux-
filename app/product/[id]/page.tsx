'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ProductCard from '@/components/product-card'
import { useCart } from '@/context/cart-context'
import { Heart, Check, Truck, Shield, RefreshCw, Star, Minus, Plus, ChevronLeft, ChevronRight, Share2, Ruler, Package } from 'lucide-react'
import Link from 'next/link'

// Extended product data
const productDatabase: Record<string, {
  name: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  images: string[]
  category: string
  subcategory: string
  sku: string
  stock: number
  description: string
  story: string
  features: string[]
  materials: string[]
  careInstructions: string[]
  dimensions?: string
  colors: Array<{ name: string; hex: string }>
  sizes: string[]
  relatedProducts: Array<{
    id: string
    name: string
    price: number
    originalPrice?: number
    image: string
    category: string
    rating: number
  }>
  pairWith: Array<{
    id: string
    name: string
    price: number
    image: string
    category: string
    rating: number
  }>
}> = {
  'default': {
    name: 'Premium Hooded Towel Set',
    price: 1299,
    originalPrice: 1799,
    rating: 4.9,
    reviews: 156,
    images: ['/home-1.jpg', '/home-2.jpg', '/home-3.jpg', '/kids-1.jpg'],
    category: 'Bath Linen',
    subcategory: 'Hoodie Towels',
    sku: 'BL-HT-001',
    stock: 45,
    description: 'Wrap your little one in pure comfort with our Premium Hooded Towel Set. Crafted from 100% organic cotton, these towels are incredibly soft against delicate skin while being highly absorbent. The adorable hood keeps your baby warm and cozy after bath time.',
    story: 'Each towel in this set is lovingly crafted by skilled artisans in Jaipur, using traditional weaving techniques passed down through generations. The organic cotton is sourced from certified farms, ensuring the softest, purest fabric for your little one.',
    features: [
      '100% GOTS certified organic cotton',
      'Extra absorbent and quick-drying',
      'Adorable animal-inspired hood designs',
      'Generous size that grows with your child',
      'Pre-washed for ultimate softness',
      'Hypoallergenic and gentle on sensitive skin',
      'Reinforced edges for durability',
      'Comes in a beautiful gift box',
    ],
    materials: [
      '100% Organic Cotton',
      'Natural vegetable dyes',
      'No harmful chemicals or synthetic materials',
    ],
    careInstructions: [
      'Machine wash in cold water with like colors',
      'Use mild, eco-friendly detergent',
      'Tumble dry on low heat',
      'Avoid bleach and fabric softeners',
      'Iron on low if needed',
    ],
    dimensions: '90cm x 90cm (fits newborn to 5 years)',
    colors: [
      { name: 'Sage Green', hex: '#7E8B5B' },
      { name: 'Dusty Blue', hex: '#AFC8D6' },
      { name: 'Warm Cream', hex: '#F8F2E8' },
      { name: 'Soft Terracotta', hex: '#C9876B' },
    ],
    sizes: ['0-12 months', '1-3 years', '3-5 years'],
    relatedProducts: [
      { id: 'bath-2', name: 'Organic Cotton Bath Robe', price: 1599, originalPrice: 2199, image: '/home-2.jpg', category: 'Bath Linen', rating: 4.8 },
      { id: 'bath-3', name: 'Soft Towel Collection', price: 899, originalPrice: 1299, image: '/home-3.jpg', category: 'Bath Linen', rating: 4.7 },
      { id: 'bath-4', name: 'Baby Bath Essentials Set', price: 1999, originalPrice: 2599, image: '/home-1.jpg', category: 'Bath Linen', rating: 5.0 },
      { id: 'bath-5', name: 'Hoodie Towel - Ocean Blue', price: 799, originalPrice: 1099, image: '/home-2.jpg', category: 'Bath Linen', rating: 4.8 },
    ],
    pairWith: [
      { id: 'acc-2', name: 'Organic Baby Nest', price: 2499, image: '/kids-3.jpg', category: 'Accessories', rating: 5.0 },
      { id: 'cloth-4', name: 'Premium Sleepwear', price: 899, image: '/kids-1.jpg', category: 'Clothing', rating: 4.9 },
      { id: 'bath-2', name: 'Organic Cotton Bath Robe', price: 159, image: '/home-2.jpg', category: 'Bath Linen', rating: 4.8 },
      { id: 'bath-3', name: 'Soft Towel Collection', price: 899, image: '/home-3.jpg', category: 'Bath Linen', rating: 4.7 },
      { id: 'bath-4', name: 'Baby Bath Essentials Set', price: 1999,  image: '/home-1.jpg', category: 'Bath Linen', rating: 5.0 },
      { id: 'bath-5', name: 'Hoodie Towel - Ocean Blue', price: 799,  image: '/home-2.jpg', category: 'Bath Linen', rating: 4.8 },
    ],
  },
}

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const product = productDatabase[productId] || productDatabase['default']
  
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'description' | 'materials' | 'care'>('description')

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/category/bath-linen" className="hover:text-foreground transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
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
                    src={product.images[currentImageIndex]}
                    alt={product.name}
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
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-accent text-accent-foreground text-sm font-bold rounded-full">
                    {discount}% OFF
                  </span>
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-card/90 backdrop-blur-sm rounded-full text-sm font-medium">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
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
                  {product.category} / {product.subcategory}
                </p>
                <button className="p-2 hover:bg-muted rounded-xl transition-colors">
                  <Share2 className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Title */}
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-muted'}`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-foreground">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
                <span className="text-primary font-medium">In Stock ({product.stock} left)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 pb-6 border-b border-border">
                <span className="text-4xl font-heading font-bold text-foreground">
                  Rs. {product.price.toLocaleString()}
                </span>
                <span className="text-xl text-muted-foreground line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
                <span className="px-3 py-1 bg-accent/10 text-accent font-semibold rounded-full text-sm">
                  Save Rs. {(product.originalPrice - product.price).toLocaleString()}
                </span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Color: <span className="font-normal text-muted-foreground">{product.colors[selectedColorIndex].name}</span>
                </label>
                <div className="flex gap-3">
                  {product.colors.map((color, idx) => (
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
                        <Check className={`w-4 h-4 ${color.hex === '#F8F2E8' ? 'text-foreground' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-foreground">
                    Size: <span className="font-normal text-muted-foreground">{selectedSize}</span>
                  </label>
                  <button className="text-sm text-primary hover:underline flex items-center gap-1">
                    <Ruler className="w-4 h-4" />
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
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
                  className="flex-1 bg-foreground text-background py-4 rounded-xl font-semibold hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Package className="w-5 h-5" />
                  Add to Cart - Rs. {(product.price * quantity).toLocaleString()}
                </motion.button>

                {/* Wishlist */}
                <motion.button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                    isWishlisted
                      ? 'bg-red-50 text-red-500 border-red-200'
                      : 'border-border hover:border-primary text-foreground'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} />
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
                        <p className="text-sm font-semibold text-foreground">{badge.title}</p>
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
          <div className="flex gap-1 bg-muted rounded-xl p-1 w-fit mb-8">
            {[
              { id: 'description', label: 'Details & Story' },
              { id: 'materials', label: 'Materials' },
              { id: 'care', label: 'Care Instructions' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
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
                    <h3 className="font-heading text-xl font-bold text-foreground mb-4">Our Story</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">{product.story}</p>
                    {product.dimensions && (
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">Dimensions:</strong> {product.dimensions}
                      </p>
                    )}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-4">Key Features</h3>
                    <ul className="space-y-3">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'materials' && (
                <div className="max-w-2xl">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">Premium Materials</h3>
                  <p className="text-muted-foreground mb-6">
                    We carefully select every material to ensure the highest quality and safety for your little ones.
                  </p>
                  <ul className="space-y-3">
                    {product.materials.map((material, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-muted-foreground">{material}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'care' && (
                <div className="max-w-2xl">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">Care Instructions</h3>
                  <p className="text-muted-foreground mb-6">
                    Follow these simple steps to keep your products looking beautiful for years to come.
                  </p>
                  <ul className="space-y-3">
                    {product.careInstructions.map((instruction, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary">
                          {idx + 1}
                        </span>
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

      {/* Pair It With */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
            Complete the Look
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.pairWith.map((item) => (
              <ProductCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map((item) => (
              <ProductCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
