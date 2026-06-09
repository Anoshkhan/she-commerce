'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Star, SlidersHorizontal } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { mockProducts, categories } from '@/lib/mock-data'

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = selectedCategory
    ? mockProducts.filter((p) => {
        const cat = categories.find((c) => c.id === selectedCategory)
        return p.category === cat?.name
      })
    : mockProducts

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return 0
    }
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {selectedCategory ? categories.find((c) => c.id === selectedCategory)?.name : 'All Products'}
        </h1>
        <p className="text-muted-foreground">{sorted.length} products found</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters - Sidebar */}
        <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
          <div className="bg-white rounded-lg border border-border p-6 sticky top-20">
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h2 className="font-bold text-foreground">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            {/* Categories Filter */}
            <div className="mb-6">
              <h3 className="font-bold text-foreground mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                    !selectedCategory ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                      selectedCategory === cat.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h3 className="font-bold text-foreground mb-4">Price Range</h3>
              <input type="range" min="0" max="10000" className="w-full" />
              <div className="flex gap-2 mt-2 text-sm text-muted-foreground">
                <span>₨0</span>
                <span>-</span>
                <span>₨10,000</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="font-bold text-foreground mb-4">Rating</h3>
              <div className="space-y-2">
                {[5, 4, 3].map((stars) => (
                  <label key={stars} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      {Array.from({ length: stars }).map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                      <span>& up</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="lg:col-span-3">
          {/* Sort & Filters Toggle */}
          <div className="flex items-center justify-between mb-6">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Product Grid */}
          {sorted.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sorted.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No products found in this category</p>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-primary font-medium hover:underline"
              >
                View all products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
