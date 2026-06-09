'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { CartState, CartItem } from './types'
import { mockProducts } from './mock-data'

const CartContext = createContext<{
  cart: CartState
  addToCart: (productId: string, quantity: number) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
} | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartState>({
    items: [],
    totalItems: 0,
    totalPrice: 0,
  })

  const addToCart = useCallback((productId: string, quantity: number) => {
    setCart((prev) => {
      const product = mockProducts.find((p) => p.id === productId)
      if (!product) return prev

      const existingItem = prev.items.find((i) => i.productId === productId)
      let newItems: CartItem[]

      if (existingItem) {
        newItems = prev.items.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i
        )
      } else {
        newItems = [
          ...prev.items,
          {
            id: `cart-item-${Date.now()}`,
            productId,
            sellerId: product.sellerId,
            sellerName: product.sellerName,
            quantity,
            price: product.price,
            product,
          },
        ]
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

      return { items: newItems, totalItems, totalPrice }
    })
  }, [])

  const removeFromCart = useCallback((itemId: string) => {
    setCart((prev) => {
      const newItems = prev.items.filter((i) => i.id !== itemId)
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      return { items: newItems, totalItems, totalPrice }
    })
  }, [])

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    setCart((prev) => {
      if (quantity <= 0) {
        return removeFromCart(itemId) as unknown as CartState || prev
      }

      const newItems = prev.items.map((i) =>
        i.id === itemId ? { ...i, quantity } : i
      )
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      return { items: newItems, totalItems, totalPrice }
    })
  }, [removeFromCart])

  const clearCart = useCallback(() => {
    setCart({
      items: [],
      totalItems: 0,
      totalPrice: 0,
    })
  }, [])

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
