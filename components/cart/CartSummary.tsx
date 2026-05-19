'use client'

import { Truck, Shield } from 'lucide-react'
import { useCart } from '@/context/cart-context'

export default function CartSummary() {
  const { cartItems, cartTotal } = useCart()

  const shipping = cartTotal > 999 ? 0 : 99
  const tax = Math.round(cartTotal * 0.05)
  const total = cartTotal + shipping + tax

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm">
      <h2 className="font-heading text-xl font-bold text-foreground mb-6">
        Order Summary
      </h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-foreground">
          <span>
            Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)}{' '}
            items)
          </span>
          <span className="font-semibold">Rs. {cartTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-foreground">
          <span>Shipping</span>
          <span
            className={`font-semibold ${shipping === 0 ? 'text-primary' : ''}`}
          >
            {shipping === 0 ? 'FREE' : `Rs. ${shipping}`}
          </span>
        </div>
        <div className="flex justify-between text-foreground">
          <span>Tax (5%)</span>
          <span className="font-semibold">Rs. {tax.toLocaleString()}</span>
        </div>
        <div className="border-t border-border pt-4">
          <div className="flex justify-between text-foreground">
            <span className="font-heading font-bold text-lg">Total</span>
            <span className="font-heading font-bold text-xl text-primary">
              Rs. {total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {shipping > 0 && (
        <div className="bg-muted/50 rounded-xl p-3 mb-6">
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-semibold">Free Shipping!</span>{' '}
            Add Rs. {(1000 - cartTotal).toLocaleString()} more to qualify.
          </p>
        </div>
      )}

      {/* Trust Badges */}
      <div className="pt-6 border-t border-border space-y-3">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Truck className="w-5 h-5 text-primary" />
          <span>Free delivery on orders above Rs. 999</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Shield className="w-5 h-5 text-primary" />
          <span>100% secure checkout</span>
        </div>
      </div>
    </div>
  )
}
