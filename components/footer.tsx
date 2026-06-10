'use client'

import Link from 'next/link'
import { Mail, Heart, Share2, Users, Zap, Globe, Gift } from 'lucide-react'
import { useLanguage } from '@/app/context/language-context'

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="bg-gradient-to-b from-primary to-primary/90 text-white border-t-4 border-accent mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-5 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-yellow-400 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-primary text-2xl font-bold">S</span>
              </div>
              <div>
                <span className="font-bold text-2xl text-white block">SheCommerce</span>
                <span className="text-accent text-xs font-semibold">Celebrating Sindhi Artisans</span>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              Empowering verified women entrepreneurs from Sindh. Supporting authentic handcrafted products and cultural heritage.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="p-2 bg-white/10 text-accent rounded-lg hover:bg-accent hover:text-primary transition-smooth" title="Website">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 text-accent rounded-lg hover:bg-accent hover:text-primary transition-smooth" title="Share">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 text-accent rounded-lg hover:bg-accent hover:text-primary transition-smooth" title="Support">
                <Gift className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up">
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wide">{t('aboutUs')}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-white/70 hover:text-accent transition-smooth text-sm font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-white/70 hover:text-accent transition-smooth text-sm font-medium">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/sellers" className="text-white/70 hover:text-accent transition-smooth text-sm font-medium">
                  All Sellers
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white/70 hover:text-accent transition-smooth text-sm font-medium">
                  Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Sellers */}
          <div className="animate-fade-in-up">
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wide">For Sellers</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/seller-signup" className="text-white/70 hover:text-accent transition-smooth text-sm font-medium">
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link href="/seller-guide" className="text-white/70 hover:text-accent transition-smooth text-sm font-medium">
                  Seller Guide
                </Link>
              </li>
              <li>
                <Link href="/seller-support" className="text-white/70 hover:text-accent transition-smooth text-sm font-medium">
                  Support Center
                </Link>
              </li>
              <li>
                <a href="mailto:sellers@shecommerce.pk" className="text-white/70 hover:text-accent transition-smooth text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Seller Help
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="animate-fade-in-up">
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wide">{t('contactUs')}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-white/70 hover:text-accent transition-smooth text-sm font-medium">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/70 hover:text-accent transition-smooth text-sm font-medium">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/70 hover:text-accent transition-smooth text-sm font-medium">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <a href="mailto:support@shecommerce.pk" className="text-white/70 hover:text-accent transition-smooth text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust & Quality Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-12 py-8 border-y border-white/10">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">✓</span>
            </div>
            <div>
              <p className="font-semibold text-white text-sm">{t('verifiedWomenEntrepreneur')}</p>
              <p className="text-white/60 text-xs">Government verified & certified</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🎨</span>
            </div>
            <div>
              <p className="font-semibold text-white text-sm">{t('authenticAndHandmade')}</p>
              <p className="text-white/60 text-xs">100% handcrafted & authentic</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">⭐</span>
            </div>
            <div>
              <p className="font-semibold text-white text-sm">{t('trustAndQuality')}</p>
              <p className="text-white/60 text-xs">Premium quality guaranteed</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/80 text-sm flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-secondary" /> {t('supportLocalCrafts')}
            </p>
            <p className="text-white/60 text-xs">
              © 2024 SheCommerce. {t('copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
