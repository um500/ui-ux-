'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Facebook, Mail, Phone, MapPin, Heart, ArrowRight } from 'lucide-react'
import { useState } from 'react'

const footerLinks = {
  shop: [
    { label: 'Bath Linen', href: '/category/bath-linen' },
    { label: 'Bedding', href: '/category/bedding' },
    { label: 'Bags', href: '/category/bags' },
    { label: 'Kids Accessories', href: '/category/kids-accessories' },
    { label: 'Clothing', href: '/category/clothing' },
    { label: "Mom's Corner", href: '/category/moms-corner' },
    { label: 'Return Gifts', href: '/category/return-gifts' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Shipping Info', href: '/shipping' },
    { label: 'Returns & Exchanges', href: '/returns' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'FAQ', href: '/contact#faq' },
    { label: 'Track Order', href: '/track-order' },
  ],
  company: [
    { label: 'Our Story', href: '/about' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Artisan Partners', href: '/artisans' },
    { label: 'Blog', href: '/blog' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ],
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-foreground text-background/90 pt-20 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-heading text-3xl font-bold text-background">LittleBloom</span>
            </Link>
            <p className="text-background/60 leading-relaxed mb-6 max-w-md">
              Handcrafted with love in Jaipur, India. We create premium organic cotton essentials 
              that nurture your little ones while supporting traditional artisans.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a href="mailto:hello@littlebloom.in" className="flex items-center gap-3 text-background/60 hover:text-background transition-colors">
                <Mail className="w-4 h-4" />
                <span className="text-sm">hello@littlebloom.in</span>
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-3 text-background/60 hover:text-background transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+91 98765 43210</span>
              </a>
              <div className="flex items-center gap-3 text-background/60">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Jaipur, Rajasthan, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-heading font-bold text-background mb-6">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-heading font-bold text-background mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading font-bold text-background mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>


        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-background/10">
          <p className="text-sm text-background/50">
            2024 LittleBloom. All rights reserved. Made with{' '}
            <Heart className="w-3 h-3 inline text-primary fill-primary" /> in India
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-background/50 hover:text-background transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-background/50 hover:text-background transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
