import Link from 'next/link'
import { ArrowRight, Award, Truck, Shield } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { mockProducts, mockSellers, categories } from '@/lib/mock-data'

export default function Home() {
  const featuredProducts = mockProducts.slice(0, 8)
  const featuredSellers = mockSellers.slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-20 pb-32 md:pt-32 md:pb-40">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-48 -mt-48 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/5 rounded-full -ml-32 -mb-32 animate-float animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-sm font-semibold text-primary">Empowering Women Entrepreneurs</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
                Discover Authentic <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">Sindhi Crafts</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
                Support verified women entrepreneurs from Sindh. Shop handcrafted textiles, jewelry, embroidery, and authentic artisan products with guaranteed quality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/categories"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover-lift hover:shadow-lg transition-smooth"
                >
                  Explore Collection
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/sellers"
                  className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary/5 transition-smooth"
                >
                  Meet Our Sellers
                </Link>
              </div>
              <div className="flex gap-8 mt-12">
                <div>
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <p className="text-muted-foreground text-sm">Products</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">200+</div>
                  <p className="text-muted-foreground text-sm">Sellers</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">50k+</div>
                  <p className="text-muted-foreground text-sm">Happy Customers</p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center animate-slide-in-right">
              <img
                src="/sindhi-girl-hero.png"
                alt="Sindhi woman with traditional embroidered crafts"
                className="w-full h-auto rounded-2xl shadow-2xl hover-lift object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-white to-muted py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group animate-fade-in-up p-8 bg-white rounded-2xl border border-border hover:border-primary transition-smooth hover:shadow-lg">
              <div className="p-4 bg-primary/10 rounded-xl inline-block mb-4 group-hover:bg-primary/20 transition-smooth">
                <Award className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">Verified Sellers</h3>
              <p className="text-muted-foreground">
                All sellers are government-verified women entrepreneurs from Sindh with authentic credentials.
              </p>
            </div>
            <div className="group animate-fade-in-up p-8 bg-white rounded-2xl border border-border hover:border-secondary transition-smooth hover:shadow-lg">
              <div className="p-4 bg-secondary/10 rounded-xl inline-block mb-4 group-hover:bg-secondary/20 transition-smooth">
                <Truck className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Quick and safe delivery across Pakistan with real-time tracking and insurance.
              </p>
            </div>
            <div className="group animate-fade-in-up p-8 bg-white rounded-2xl border border-border hover:border-accent transition-smooth hover:shadow-lg">
              <div className="p-4 bg-accent/10 rounded-xl inline-block mb-4 group-hover:bg-accent/20 transition-smooth">
                <Shield className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">Secure Shopping</h3>
              <p className="text-muted-foreground">
                Safe payments, data protection, and 100% buyer protection guarantee on every purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">Shop by Category</h2>
            <Link href="/categories" className="text-primary font-medium hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.id}`}>
                <div className="bg-white p-6 rounded-lg border border-border hover:border-primary hover:shadow-md transition text-center">
                  <div className="text-4xl mb-2">📦</div>
                  <h3 className="font-semibold text-foreground">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">Featured Products</h2>
            <Link href="/products" className="text-primary font-medium hover:underline">
              View All Products
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sellers */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">Featured Sellers</h2>
            <Link href="/sellers" className="text-primary font-medium hover:underline">
              View All Sellers
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredSellers.map((seller) => (
              <Link key={seller.id} href={`/seller/${seller.id}`}>
                <div className="bg-white p-6 rounded-2xl border border-border hover:border-primary hover-lift animate-scale-in transition-smooth">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={seller.logo}
                      alt={seller.storeName}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                    />
                    <div>
                      <h3 className="font-bold text-foreground">{seller.storeName}</h3>
                      {seller.isVerified && (
                        <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">✓ Verified</span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{seller.description}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-border">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-foreground">{seller.rating}</span>
                      <span className="text-yellow-500">⭐</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{seller.totalSales} sales</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-secondary to-primary text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Stay Updated on New Products</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
            Subscribe to our newsletter and get exclusive discounts and early access to new collections from our verified sellers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mt-8">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 h-14 px-5 rounded-xl bg-white text-gray-900 placeholder:text-gray-500 border border-white/20 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400
    "
            />

            <button className="h-14 px-8 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition-colors">
              Subscribe Now
            </button>
          </div>
          <p className="text-white/70 text-sm mt-4">No spam, unsubscribe anytime</p>
        </div>
      </section>
    </div>
  )
}
