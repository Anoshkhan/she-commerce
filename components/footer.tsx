import Link from 'next/link'
import { Mail, Heart, Share2, Users } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-muted border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-5 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">S</span>
              </div>
              <span className="font-bold text-xl text-foreground">SheCommerce</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              A government-supported initiative empowering verified women entrepreneurs from Sindh.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-smooth">
                <Users className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-smooth">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-smooth">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up">
            <h4 className="font-bold text-foreground mb-5 text-sm uppercase tracking-wide">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-smooth text-sm font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-primary transition-smooth text-sm font-medium">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/sellers" className="text-muted-foreground hover:text-primary transition-smooth text-sm font-medium">
                  All Sellers
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-smooth text-sm font-medium">
                  Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Sellers */}
          <div className="animate-fade-in-up">
            <h4 className="font-bold text-foreground mb-5 text-sm uppercase tracking-wide">For Sellers</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/seller-signup" className="text-muted-foreground hover:text-primary transition-smooth text-sm font-medium">
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link href="/seller-guide" className="text-muted-foreground hover:text-primary transition-smooth text-sm font-medium">
                  Seller Guide
                </Link>
              </li>
              <li>
                <Link href="/seller-support" className="text-muted-foreground hover:text-primary transition-smooth text-sm font-medium">
                  Support Center
                </Link>
              </li>
              <li>
                <a href="mailto:sellers@shecommerce.pk" className="text-muted-foreground hover:text-primary transition-smooth text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Seller Help
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="animate-fade-in-up">
            <h4 className="font-bold text-foreground mb-5 text-sm uppercase tracking-wide">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-smooth text-sm font-medium">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-smooth text-sm font-medium">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-smooth text-sm font-medium">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <a href="mailto:support@shecommerce.pk" className="text-muted-foreground hover:text-primary transition-smooth text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-500" /> for Pakistani women entrepreneurs
            </p>
            <p className="text-muted-foreground text-xs">
              © 2024 SheCommerce. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
