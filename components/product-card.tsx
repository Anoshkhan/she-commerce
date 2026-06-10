'use client'

import Link from 'next/link'
import { Star, Heart, ShoppingCart, Badge, Users } from 'lucide-react'
import { Product } from '@/lib/types'
import { useCart } from '@/lib/cart-context'
import { useWishlist } from '@/lib/wishlist-context'
import { useLanguage } from '@/app/context/language-context'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const { t } = useLanguage()
  const isInWishlist = wishlist.items.includes(product.id)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsAdding(true)
    addToCart(product.id, 1)
    setTimeout(() => setIsAdding(false), 1000)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()

    if (isInWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product.id)
    }
  }

  const discountPercent = product.discount || 0

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group bg-white rounded-2xl border border-border overflow-hidden hover-lift animate-scale-in hover:border-primary/20 transition-smooth">
        <div className="relative overflow-hidden bg-muted h-48">
          <img
            src={product.images?.[0] || '/placeholder.png'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />

          <div className="absolute top-3 left-3 flex gap-2">
            {product.handmade && (
              <span className="bg-secondary text-secondary-foreground gap-1 px-2 py-1 rounded-md text-xs font-medium">
                Handmade
              </span>
            )}

            {discountPercent > 0 && (
              <span className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-medium">
                -{discountPercent}%
              </span>
            )}
          </div>

          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-primary hover:text-primary-foreground transition"
          >
            <Heart
              className="w-5 h-5"
              fill={isInWishlist ? 'currentColor' : 'none'}
              color={isInWishlist ? '#E91E63' : 'currentColor'}
            />
          </button>

          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <p className="text-xs text-muted-foreground mb-1 font-medium">{product.sellerName}</p>

          {product.artisanName && (
            <p className="text-xs text-accent font-semibold mb-2 flex items-center gap-1">
              <Users className="w-3 h-3" />
              {product.artisanName}
            </p>
          )}

          <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4"
                  fill={i < Math.round(product.rating) ? '#F9A825' : 'none'}
                  color="#F9A825"
                />
              ))}
            </div>

            <span className="text-xs text-muted-foreground">({product.totalReviews})</span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-bold text-primary">₨{product.price}</span>

            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₨{product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdding}
            className="w-full py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  )
}
