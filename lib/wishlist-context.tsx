'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { WishlistState } from './types'

const WishlistContext = createContext<{
  wishlist: WishlistState
  addToWishlist: (productId: string) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
} | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistState>({
    items: [],
  })

  const addToWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      if (prev.items.includes(productId)) {
        return prev
      }
      return { items: [...prev.items, productId] }
    })
  }, [])

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist((prev) => ({
      items: prev.items.filter((id) => id !== productId),
    }))
  }, [])

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.items.includes(productId)
  }, [wishlist])

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }
  return context
}
