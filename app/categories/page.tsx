'use client'

import { Suspense, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { SlidersHorizontal } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { mockProducts, categories } from '@/lib/mock-data'

export default function CategoriesPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading categories...</div>}>
      <CategoriesContent />
    </Suspense>
  )
}

function CategoriesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const categoryParam = searchParams.get('category')
  const selectedCategory = categories.find((cat) => cat.id === categoryParam) || null

  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = selectedCategory
    ? mockProducts.filter((product) => product.category === selectedCategory.name)
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

  const handleCategoryClick = (categoryId: string | null) => {
    if (categoryId) {
      router.push(`/categories?category=${categoryId}`)
    } else {
      router.push('/categories')
    }

    setShowFilters(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {selectedCategory ? selectedCategory.name : 'All Products'}
        </h1>
        <p className="text-muted-foreground">{sorted.length} products found</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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

            <div className="mb-6">
              <h3 className="font-bold text-foreground mb-4">Categories</h3>

              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryClick(null)}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                    !selectedCategory
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  All Categories
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                      selectedCategory?.id === cat.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-foreground mb-4">Price Range</h3>
              <input type="range" min="0" max="10000" className="w-full" />
              <div className="flex gap-2 mt-2 text-sm text-muted-foreground">
                <span>₨0</span>
                <span>-</span>
                <span>₨10,000</span>
              </div>
            </div>

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

        <div className="lg:col-span-3">
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

          {sorted.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sorted.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No products found in this category
              </p>

              <button
                onClick={() => handleCategoryClick(null)}
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