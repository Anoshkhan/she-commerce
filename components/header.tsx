'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Search, ShoppingCart, Heart, LogOut, LogIn, User, Globe } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useCart } from '@/lib/cart-context'
import { useLanguage } from '@/app/context/language-context'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const { auth, logout } = useAuth()
  const { cart } = useCart()
  const { language, setLanguage } = useLanguage()

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

          <div className="flex flex-1 mx-4 sm:mx-8 max-w-xs sm:max-w-md">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-muted text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary border border-transparent text-sm sm:text-base"
              />
              <button className="absolute right-2 sm:right-3 top-2 sm:top-3 text-muted-foreground hover:text-primary">
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-4">
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="p-2 text-foreground hover:text-primary flex items-center gap-1"
                title="Change language"
              >
                <Globe className="w-5 h-5" />
                <span className="hidden sm:inline text-sm font-medium uppercase">{language}</span>
              </button>
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-border rounded-lg shadow-lg z-10 min-w-max">
                  <button
                    onClick={() => {
                      setLanguage('en')
                      setIsLanguageDropdownOpen(false)
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted ${language === 'en' ? 'bg-primary text-primary-foreground font-semibold' : ''}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('ur')
                      setIsLanguageDropdownOpen(false)
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted ${language === 'ur' ? 'bg-primary text-primary-foreground font-semibold' : ''}`}
                  >
                    اردو
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('sd')
                      setIsLanguageDropdownOpen(false)
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted ${language === 'sd' ? 'bg-primary text-primary-foreground font-semibold' : ''}`}
                  >
                    سندھي
                  </button>
                </div>
              )}
            </div>

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
