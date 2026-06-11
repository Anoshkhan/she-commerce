'use client'

import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight, CreditCard, Truck } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useAuth } from '@/lib/auth-context'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const { auth } = useAuth()

  const groupedByCustomer = cart.items.reduce(
    (acc, item) => {
      if (!acc[item.sellerId]) {
        acc[item.sellerId] = { sellerName: item.sellerName, items: [] }
      }
      acc[item.sellerId].items.push(item)
      return acc
    },
    {} as Record<string, { sellerName: string; items: typeof cart.items }>
  )

  if (cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
          <ShoppingCart className="w-8 h-8 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Your Cart is Empty</h1>
        <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg mt-4">
          Continue Shopping <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {Object.entries(groupedByCustomer).map(([sellerId, { sellerName, items }]) => (
            <div key={sellerId} className="bg-white rounded-lg border border-border p-4 shadow-sm">
              <h2 className="font-bold text-sm text-foreground mb-4 pb-2 border-b">{sellerName}</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-16 rounded object-cover bg-muted" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-foreground line-clamp-1">{item.product.name}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">₨{item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 border rounded"><Minus className="w-3 h-3" /></button>
                        <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 border rounded"><Plus className="w-3 h-3" /></button>
                      </div>
                    </div>
                    <div className="text-right flex flex-col justify-between items-end">
                      <p className="font-bold text-sm">₨{(item.price * item.quantity).toLocaleString()}</p>
                      <button onClick={() => removeFromCart(item.id)} className="text-destructive text-xs flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" /> Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-border p-4 shadow-sm sticky top-24">
            <h2 className="text-base font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 text-xs sm:text-sm mb-4">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>₨{cart.totalPrice.toLocaleString()}</span></div>
              <div className="flex justify-between font-bold border-t pt-2 mt-2 text-foreground"><span>Total</span><span>₨{cart.totalPrice.toLocaleString()}</span></div>
            </div>
            <Link href="/checkout" className="w-full py-2.5 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium text-sm rounded-lg text-center block shadow-sm">
              Proceed to Checkout
            </Link>

            <div className="mt-6 pt-4 border-t border-border text-center">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Accepted Channels</p>
              <div className="flex items-center justify-center gap-3">
                <div className="h-7 w-10 bg-muted border border-border rounded flex items-center justify-center"><CreditCard className="w-4 h-4 text-blue-600" /></div>
                <div className="h-7 w-10 bg-muted border border-border rounded flex items-center justify-center p-0.5"><img src="/easypaisa-logo.png" className="h-full w-full object-contain" alt="EasyPaisa" /></div>
                <div className="h-7 w-10 bg-muted border border-border rounded flex items-center justify-center p-0.5"><img src="/jazzcash-logo.png" className="h-full w-full object-contain" alt="JazzCash" /></div>
                <div className="h-7 w-10 bg-muted border border-border rounded flex items-center justify-center"><Truck className="w-4 h-4 text-orange-500" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}