'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Heart, ShoppingCart, Search, Menu, User, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useCart } from '@/context/cart-context'
import MobileMenu from './MobileMenu'
import SearchModal from './SearchModal'
import BottomNav from './BottomNav'

const shopCategories = [
  {
    name: 'Bath Linen',
    href: '/category/bath-linen',
    description: 'Towels, Robes & Sets',
    image: '/home-1.jpg',
  },
  {
    name: 'Bedding',
    href: '/category/bedding',
    description: 'Quilts, Dohars & Sets',
    image: '/home-2.jpg',
  },
  {
    name: 'Bags',
    href: '/category/bags',
    description: 'Backpacks & Totes',
    image: '/kids-1.jpg',
  },
  {
    name: 'Kids Accessories',
    href: '/category/kids-accessories',
    description: 'Aprons, Mats & More',
    image: '/kids-2.jpg',
  },
  {
    name: 'Clothing',
    href: '/category/clothing',
    description: 'Rompers & Dresses',
    image: '/kids-3.jpg',
  },
  {
    name: "Mom's Corner",
    href: '/category/moms-corner',
    description: 'Just for Mom',
    image: '/mom-1.jpg',
  },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { cartCount, wishlistCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setShopOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setShopOpen(false), 150)
  }

  return (
    <>
      <motion.nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-lg shadow-sm'
            : 'bg-background'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="font-heading text-2xl font-bold text-primary">
                LittleBloom
              </span>
            </Link>

            {/* Desktop Menu - Centered */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>

              {/* Shop Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Shop
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      shopOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {shopOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[480px] bg-card rounded-2xl shadow-xl border border-border/50 overflow-hidden"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="p-4 grid grid-cols-2 gap-2">
                        {shopCategories.map((cat) => (
                          <Link
                            key={cat.name}
                            href={cat.href}
                            className="group flex items-center gap-3 p-3 rounded-xl hover:bg-muted/60 transition-colors"
                          >
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                              <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div>
                              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                {cat.name}
                              </span>
                              <p className="text-xs text-muted-foreground">
                                {cat.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="px-4 pb-4">
                        <Link
                          href="/category/all"
                          className="block w-full py-2.5 text-center text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl transition-colors"
                        >
                          Shop All Products
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/category/return-gifts"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Gifts
              </Link>

              <Link
                href="/contact"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <Search className="w-5 h-5 text-foreground" />
              </button>

              <Link
                href="/wishlist"
                className="p-2 hover:bg-muted rounded-full transition-colors relative hidden sm:flex"
              >
                <Heart className="w-5 h-5 text-foreground" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                className="p-2 hover:bg-muted rounded-full transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5 text-foreground" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>

              <button className="p-2 hover:bg-muted rounded-full transition-colors hidden sm:flex">
                <User className="w-5 h-5 text-foreground" />
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 hover:bg-muted rounded-full"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        categories={shopCategories}
      />

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Bottom Navigation for Mobile */}
      <BottomNav onSearchClick={() => setIsSearchOpen(true)} />
    </>
  )
}
