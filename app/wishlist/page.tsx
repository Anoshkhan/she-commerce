'use client'

import Link from 'next/link'
import { Heart, ShoppingCart, ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { mockProducts } from '@/lib/mock-data'
import { useWishlist } from '@/lib/wishlist-context'

export default function WishlistPage() {
  const { wishlist } = useWishlist()

  const wishlistProducts = mockProducts.filter((p) => wishlist.items.includes(p.id))

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
          <Heart className="w-8 h-8 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Your Wishlist is Empty</h1>
        <p className="text-muted-foreground mb-8">Start adding items to your wishlist to keep track of products you love</p>
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition"
        >
          Explore Products
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">My Wishlist</h1>
        <span className="text-muted-foreground">
          {wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
