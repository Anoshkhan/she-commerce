'use client'

import Link from 'next/link'
import { Check, MapPin, TrendingUp, MessageCircle } from 'lucide-react'
import { mockSellers } from '@/lib/mock-data'

export default function SellersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Meet Our Verified Sellers</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Discover talented women entrepreneurs from Sindh offering authentic handcrafted products
        </p>
      </div>

      {/* Sellers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSellers.map((seller) => (
          <Link key={seller.id} href={`/seller/${seller.id}`}>
            <div className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition group">
              {/* Banner */}
              <div className="h-32 overflow-hidden relative">
                <img
                  src={seller.bannerImage}
                  alt={seller.storeName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Logo & Name */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-4 flex-1">
                    <img
                      src={seller.logo}
                      alt={seller.storeName}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground text-lg">{seller.storeName}</h3>
                      {seller.isVerified && (
                        <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                          <Check className="w-4 h-4" />
                          Verified Seller
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{seller.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 bg-yellow-50 rounded-lg text-center">
                    <p className="text-sm font-bold text-foreground">{seller.rating}</p>
                    <p className="text-xs text-muted-foreground">⭐ Rating</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg text-center">
                    <p className="text-sm font-bold text-foreground">{seller.totalSales}</p>
                    <p className="text-xs text-muted-foreground">Sales</p>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{seller.province}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="w-4 h-4" />
                    <span>Response: {seller.responseTime}</span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {seller.specialties.slice(0, 2).map((spec) => (
                    <span key={spec} className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                      {spec}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button className="w-full py-2 border border-border rounded-lg text-foreground font-medium hover:bg-muted transition flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  View Shop
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
