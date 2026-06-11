'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Search, ShoppingCart, Heart, LogOut, LogIn, User } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useCart } from '@/lib/cart-context'
import { useRouter } from 'next/navigation'

export function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const { auth, logout } = useAuth()
  const { cart } = useCart()

  const closeAllMenus = () => {
    setIsMenuOpen(false)
    setIsSearchOpen(false)
  }

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setIsSearchOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border/50 shadow-sm transition-smooth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" onClick={closeAllMenus} className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="SheCommerce Logo"
              width={48}
              height={48}
              className="w-12 h-12 rounded-xl object-cover shadow-md"
              priority
            />

            <span className="hidden sm:block font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SheCommerce
            </span>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 mx-8 max-w-md">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-muted text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary border border-transparent"
              />
              <button type="submit" className="absolute right-3 top-3 text-muted-foreground hover:text-primary">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Navigation Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-4">
            <button
              type="button"
              onClick={() => {
                setIsSearchOpen((prev) => !prev)
                setIsMenuOpen(false)
              }}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle Search"
            >
              <Search className="w-6 h-6" />
            </button>

            <Link href="/cart" onClick={closeAllMenus} className="relative p-2 text-foreground hover:text-primary">
              <ShoppingCart className="w-6 h-6" />
              {cart.totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.totalItems}
                </span>
              )}
            </Link>

            <Link href="/wishlist" onClick={closeAllMenus} className="p-2 text-foreground hover:text-primary">
              <Heart className="w-6 h-6" />
            </Link>

            {auth.isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/profile" className="p-2 text-foreground hover:text-primary">
                  <User className="w-6 h-6" />
                </Link>
                <button onClick={logout} className="p-2 text-foreground hover:text-primary">
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={closeAllMenus}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-primary font-medium hover:bg-primary hover:text-primary-foreground rounded-lg"
              >
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </Link>
            )}

            <button
              type="button"
              onClick={() => {
                setIsMenuOpen((prev) => !prev)
                setIsSearchOpen(false)
              }}
              className="md:hidden p-2 text-foreground"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <form
            onSubmit={handleSearchSubmit}
            className="md:hidden pb-4 pt-2 border-t border-border animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="relative w-full px-2">
              <input
                type="text"
                placeholder="Search products..."
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 rounded-xl bg-muted text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary border border-transparent"
              />
              <button type="submit" className="absolute right-5 top-3 text-muted-foreground hover:text-primary">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}

        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border animate-in fade-in duration-200">
            <nav className="space-y-2 mt-4">
              <Link href="/" onClick={closeAllMenus} className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
                Home
              </Link>

              <Link href="/categories" onClick={closeAllMenus} className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
                Categories
              </Link>

              <Link href="/products" onClick={closeAllMenus} className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
                Products
              </Link>

              {auth.isAuthenticated ? (
                <>
                  <Link href="/profile" onClick={closeAllMenus} className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
                    Profile
                  </Link>

                  <Link href="/orders" onClick={closeAllMenus} className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
                    My Orders
                  </Link>

                  <button
                    onClick={() => {
                      logout()
                      closeAllMenus()
                    }}
                    className="block w-full text-left px-4 py-2 text-foreground hover:bg-muted rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={closeAllMenus} className="block px-4 py-2 text-primary font-medium hover:bg-primary hover:text-primary-foreground rounded-lg">
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}