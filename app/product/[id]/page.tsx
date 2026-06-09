'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Star, Heart, Share2, Truck, Shield, Check, Plus, Minus } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { mockProducts, mockReviews, mockSellers } from '@/lib/mock-data'
import { useCart } from '@/lib/cart-context'
import { useWishlist } from '@/lib/wishlist-context'
import { useParams } from 'next/navigation'

export default function ProductDetail() {
  const params = useParams()
  const productId = params.id as string
  const product = mockProducts.find((p) => p.id === productId)
  const seller = mockSellers.find((s) => s.id === product?.sellerId)
  const { addToCart } = useCart()
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const isInWishlist = wishlist.items.includes(productId)

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  if (!product || !seller) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    )
  }

  const relatedProducts = mockProducts.filter(
    (p) => p.category === product.category && p.id !== productId
  )

  const productReviews = mockReviews.filter((r) => r.productId === productId)

  const handleAddToCart = () => {
    addToCart(productId, quantity)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-8 flex gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-primary">{product.category}</Link>
        <span>/</span>
        <span className="text-foreground">{product.name.substring(0, 30)}...</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Images */}
        <div>
          <div className="bg-muted rounded-lg overflow-hidden mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="flex gap-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === idx ? 'border-primary' : 'border-border'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          {/* Category & Status */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-medium text-muted-foreground uppercase">{product.category}</span>
            {product.handmade && (
              <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded">
                Handmade
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5"
                  fill={i < Math.round(product.rating) ? '#F9A825' : 'none'}
                  color="#F9A825"
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} • {product.totalReviews} reviews
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl font-bold text-primary">₨{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <div>
                <span className="text-lg text-muted-foreground line-through">
                  ₨{product.originalPrice.toLocaleString()}
                </span>
                <span className="ml-2 px-2 py-1 bg-accent/10 text-accent text-sm font-medium rounded">
                  Save {product.discount}%
                </span>
              </div>
            )}
          </div>

          {/* Seller Info */}
          <Link
            href={`/seller/${seller.id}`}
            className="mb-6 p-4 border border-border rounded-lg hover:border-primary transition"
          >
            <div className="flex items-center gap-3">
              <img
                src={seller.logo}
                alt={seller.storeName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-foreground">{seller.storeName}</p>
                <div className="flex items-center gap-2 text-sm">
                  {seller.isVerified && (
                    <span className="text-green-600 flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      Verified
                    </span>
                  )}
                  <span className="text-muted-foreground">{seller.rating} ⭐</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-foreground mb-2">Description</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            {product.inStock ? (
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                <span className="font-medium">In Stock ({product.stockCount} available)</span>
              </div>
            ) : (
              <div className="text-destructive font-medium">Out of Stock</div>
            )}
          </div>

          {/* Quantity */}
          {product.inStock && (
            <div className="mb-6">
              <p className="text-sm font-medium text-foreground mb-3">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-border rounded hover:bg-muted"
                >
                  <Minus className="w-5 h-5 text-muted-foreground" />
                </button>
                <span className="w-12 text-center font-bold text-foreground">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  className="p-2 border border-border rounded hover:bg-muted"
                >
                  <Plus className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAdded ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <button
              onClick={() => {
                if (isInWishlist) {
                  removeFromWishlist(productId)
                } else {
                  addToWishlist(productId)
                }
              }}
              className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition"
            >
              <Heart
                className="w-6 h-6"
                fill={isInWishlist ? 'currentColor' : 'none'}
                color={isInWishlist ? '#E91E63' : 'currentColor'}
              />
            </button>
            <button className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition">
              <Share2 className="w-6 h-6 text-muted-foreground" />
            </button>
          </div>

          {/* Info Boxes */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 text-blue-900 text-sm">
                <Truck className="w-4 h-4" />
                <span className="font-medium">Free Delivery</span>
              </div>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-900 text-sm">
                <Shield className="w-4 h-4" />
                <span className="font-medium">Buyer Protection</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {productReviews.length > 0 && (
        <div className="mb-16 bg-white rounded-lg border border-border p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {productReviews.map((review) => (
              <div key={review.id} className="border-b border-border pb-6 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-foreground">{review.userName}</p>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4"
                          fill={i < review.rating ? '#F9A825' : 'none'}
                          color="#F9A825"
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="font-medium text-foreground mb-2">{review.title}</h4>
                <p className="text-muted-foreground text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
