'use client'

import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useAuth } from '@/lib/auth-context'
import { useLanguage } from '@/app/context/language-context'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const { auth } = useAuth()
  const { t } = useLanguage()

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
        <p className="text-muted-foreground mb-8">Start shopping to add items to your cart</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition"
        >
          Continue Shopping
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">{t('shoppingCart')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {Object.entries(groupedByCustomer).map(([sellerId, { sellerName, items }]) => (
              <div key={sellerId} className="bg-white rounded-lg border border-border p-6">
                <h2 className="font-bold text-foreground mb-4">{sellerName}</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-border last:border-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <Link
                          href={`/product/${item.productId}`}
                          className="font-medium text-foreground hover:text-primary"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">₨{item.price}</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 border border-border rounded hover:bg-muted"
                          >
                            <Minus className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <span className="w-8 text-center text-foreground font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 border border-border rounded hover:bg-muted"
                          >
                            <Plus className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      </div>

                      {/* Price & Remove */}
                      <div className="text-right">
                        <p className="font-bold text-foreground">₨{(item.price * item.quantity).toLocaleString()}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="mt-3 text-destructive hover:text-destructive/80 flex items-center gap-1 text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-border p-6 sticky top-20">
            <h2 className="text-lg font-bold text-foreground mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₨{cart.totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Taxes</span>
                <span>₨0</span>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-bold text-lg text-primary">₨{cart.totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {auth.isAuthenticated ? (
              <Link
                href="/checkout"
                className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition text-center block"
              >
                Proceed to Checkout
              </Link>
            ) : (
              <Link
                href="/login"
                className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition text-center block"
              >
                Sign In to Checkout
              </Link>
            )}

            <Link
              href="/products"
              className="w-full mt-3 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-muted transition text-center block"
            >
              Continue Shopping
            </Link>

            {/* Info */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
              <p className="font-medium mb-2">Free Delivery</p>
              <p>Get free shipping on all orders across Pakistan. Delivery in 5-7 business days.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
