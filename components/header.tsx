'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Search, ShoppingCart, Heart, LogOut, LogIn, User } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useCart } from '@/lib/cart-context'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { auth, logout } = useAuth()
  const { cart } = useCart()

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border/50 shadow-sm transition-smooth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" onClick={closeMenu} className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white text-lg font-bold">S</span>
            </div>
            <span className="hidden sm:block font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SheCommerce
            </span>
          </Link>

          <div className="hidden md:flex flex-1 mx-8 max-w-md">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2.5 rounded-xl bg-muted text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary border border-transparent"
              />
              <button className="absolute right-3 top-3 text-muted-foreground hover:text-primary">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/cart" onClick={closeMenu} className="relative p-2 text-foreground hover:text-primary">
              <ShoppingCart className="w-6 h-6" />
              {cart.totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.totalItems}
                </span>
              )}
            </Link>

            <Link href="/wishlist" onClick={closeMenu} className="p-2 text-foreground hover:text-primary">
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
                onClick={closeMenu}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-primary font-medium hover:bg-primary hover:text-primary-foreground rounded-lg"
              >
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </Link>
            )}

            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden p-2 text-foreground"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <div className="mt-4 mb-4 px-2">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-lg bg-muted text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <nav className="space-y-2">
              <Link href="/" onClick={closeMenu} className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
                Home
              </Link>

              <Link href="/categories" onClick={closeMenu} className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
                Categories
              </Link>

              <Link href="/products" onClick={closeMenu} className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
                Products
              </Link>

              {auth.isAuthenticated ? (
                <>
                  <Link href="/profile" onClick={closeMenu} className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
                    Profile
                  </Link>

                  <Link href="/orders" onClick={closeMenu} className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
                    My Orders
                  </Link>

                  <button
                    onClick={() => {
                      logout()
                      closeMenu()
                    }}
                    className="block w-full text-left px-4 py-2 text-foreground hover:bg-muted rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={closeMenu} className="block px-4 py-2 text-primary font-medium hover:bg-primary hover:text-primary-foreground rounded-lg">
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