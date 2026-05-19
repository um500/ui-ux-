'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import { useCart } from '@/context/cart-context'
import { ShoppingBag, ArrowLeft, X, Truck, CreditCard, MessageCircle } from 'lucide-react'

export default function CartPage() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'cod' as 'cod' | 'prepaid',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const shipping = cartTotal > 999 ? 0 : 99
  const tax = Math.round(cartTotal * 0.05)
  const total = cartTotal + shipping + tax

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    else if (!/^[6-9]\d{9}$/.test(formData.phone))
      newErrors.phone = 'Enter valid 10-digit phone'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required'
    else if (!/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = 'Enter valid 6-digit pincode'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCheckout = () => {
    if (!validateForm()) return

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''

    let message = `*New Order from LittleBloom*\n\n`
    message += `*Customer Details:*\n`
    message += `Name: ${formData.name}\n`
    message += `Phone: ${formData.phone}\n`
    message += `Address: ${formData.address}\n`
    message += `City: ${formData.city}\n`
    message += `Pincode: ${formData.pincode}\n`
    message += `Payment: ${formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Prepaid (Online)'}\n\n`

    message += `*Order Items:*\n`
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`
      message += `   Qty: ${item.quantity} x Rs. ${item.price.toLocaleString()}\n`
      if (item.size) message += `   Size: ${item.size}\n`
      if (item.color) message += `   Color: ${item.color}\n`
      message += `   Link: ${baseUrl}/product/${item.id}\n\n`
    })

    message += `*Order Summary:*\n`
    message += `Subtotal: Rs. ${cartTotal.toLocaleString()}\n`
    message += `Shipping: ${shipping === 0 ? 'FREE' : `Rs. ${shipping}`}\n`
    message += `Tax (5%): Rs. ${tax.toLocaleString()}\n`
    message += `*Total: Rs. ${total.toLocaleString()}*`

    const whatsappNumber = '919876543210'
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    window.open(whatsappUrl, '_blank')
    clearCart()
    setShowCheckout(false)
  }

  if (cartItems.length === 0 && !showCheckout) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-3">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Link
              href="/category/all"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Start Shopping
            </Link>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h1
          className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Shopping Cart
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </AnimatePresence>

            <Link
              href="/category/all"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium mt-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <CartSummary />
              <button
                onClick={() => setShowCheckout(true)}
                className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCheckout(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
                <h2 className="font-heading text-xl font-bold text-foreground">
                  Checkout Details
                </h2>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <div className="p-6 space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                      errors.name ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value.replace(/\D/g, '').slice(0, 10),
                      })
                    }
                    className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                      errors.phone ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="10-digit mobile number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Delivery Address *
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    rows={3}
                    className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none ${
                      errors.address ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="House/Flat No., Street, Area"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>

                {/* City & Pincode */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                        errors.city ? 'border-red-500' : 'border-border'
                      }`}
                      placeholder="City"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pincode: e.target.value.replace(/\D/g, '').slice(0, 6),
                        })
                      }
                      className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                        errors.pincode ? 'border-red-500' : 'border-border'
                      }`}
                      placeholder="6-digit"
                    />
                    {errors.pincode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.pincode}
                      </p>
                    )}
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Payment Method *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, paymentMethod: 'cod' })
                      }
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                        formData.paymentMethod === 'cod'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Truck
                        className={`w-6 h-6 ${
                          formData.paymentMethod === 'cod'
                            ? 'text-primary'
                            : 'text-muted-foreground'
                        }`}
                      />
                      <span
                        className={`font-medium text-sm ${
                          formData.paymentMethod === 'cod'
                            ? 'text-primary'
                            : 'text-foreground'
                        }`}
                      >
                        Cash on Delivery
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, paymentMethod: 'prepaid' })
                      }
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                        formData.paymentMethod === 'prepaid'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <CreditCard
                        className={`w-6 h-6 ${
                          formData.paymentMethod === 'prepaid'
                            ? 'text-primary'
                            : 'text-muted-foreground'
                        }`}
                      />
                      <span
                        className={`font-medium text-sm ${
                          formData.paymentMethod === 'prepaid'
                            ? 'text-primary'
                            : 'text-foreground'
                        }`}
                      >
                        Prepaid (Online)
                      </span>
                    </button>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-muted/50 rounded-xl p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-heading font-bold text-lg text-primary">
                      Rs. {total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Place Order via WhatsApp
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  )
}
