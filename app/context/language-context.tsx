'use client'

import React, { createContext, useContext, useState } from 'react'

type Language = 'en' | 'ur' | 'sd'

interface Translations {
  [key: string]: {
    en: string
    ur: string
    sd: string
  }
}

const translations: Translations = {
  heroTitle: {
    en: 'Discover Authentic Sindhi Crafts',
    ur: 'اصل سندھی دستکاری دریافت کریں',
    sd: 'اصل سندھي دستڪاري دريافت ڪريو'
  },
  heroSubtitle: {
    en: 'Support verified women entrepreneurs from Sindh',
    ur: 'سندھ سے تصدیق شدہ خواتین کے کاروباری افراد کی حمایت کریں',
    sd: 'سندھ مان تصديق ڪل ايل خواتين جي ڪاروباري افراد جي حمايت ڪريو'
  },
  exploreCollection: {
    en: 'Explore Collection',
    ur: 'کلیکشن دیکھیں',
    sd: 'ڪليڪشن ڏسو'
  },
  shoppingCart: {
    en: 'Shopping Cart',
    ur: 'شاپنگ کارٹ',
    sd: 'شاپنگ ڪارٽ'
  },
  checkout: {
    en: 'Checkout',
    ur: 'چیکآؤٹ',
    sd: 'چيڪ آؤٽ'
  },
  cashOnDelivery: {
    en: 'Cash on Delivery',
    ur: 'نقد ادائیگی',
    sd: 'نقد ادائيگي'
  },
  easypaisa: {
    en: 'Easypaisa',
    ur: 'ای زی پیسہ',
    sd: 'ائي زي پيسو'
  },
  bankTransfer: {
    en: 'Bank Account Transfer',
    ur: 'بینک اکاؤنٹ ٹرانسفر',
    sd: 'بينڪ اڪاؤنٽ ٽرانسفر'
  },
  selectPaymentMethod: {
    en: 'Select Payment Method',
    ur: 'ادائیگی کا طریقہ منتخب کریں',
    sd: 'ادائيگي جو طريقو منتخب ڪريو'
  },
  meetTheArtisan: {
    en: 'Meet the Artisan',
    ur: 'کاریگر سے ملیں',
    sd: 'ڪارگر سان ملو'
  },
  experience: {
    en: 'Experience',
    ur: 'تجربہ',
    sd: 'تجربو'
  },
  yearsInCraft: {
    en: 'years in craft',
    ur: 'سال میں دستکاری',
    sd: 'سال ۾ دستڪاري'
  },
  artisanStory: {
    en: 'Artisan&apos;s Story',
    ur: 'کاریگر کی کہانی',
    sd: 'ڪارگر جي ڪهاڻي'
  },
  verifiedWomenEntrepreneur: {
    en: 'Verified Women Entrepreneur',
    ur: 'تصدیق شدہ خاتون کاروباری',
    sd: 'تصديق ڪل خاتون ڪاروباري'
  },
  supportLocalCrafts: {
    en: 'Support Local Crafts',
    ur: 'مقامی دستکاری کی حمایت کریں',
    sd: 'مقامي دستڪاري جي حمايت ڪريو'
  },
  authenticAndHandmade: {
    en: 'Authentic & Handmade',
    ur: 'اصل اور ہاتھ سے بنی',
    sd: 'اصل ۽ هاٿ سان بني'
  },
  trustAndQuality: {
    en: 'Trust & Quality',
    ur: 'اعتماد اور معیار',
    sd: 'اعتماد ۽ معيار'
  },
  quickView: {
    en: 'Quick View',
    ur: 'جلدی دیکھیں',
    sd: 'جلدي ڏسو'
  },
  addToCart: {
    en: 'Add to Cart',
    ur: 'کارٹ میں شامل کریں',
    sd: 'ڪارٽ ۾ شامل ڪريو'
  },
  viewDetails: {
    en: 'View Details',
    ur: 'تفصیلات دیکھیں',
    sd: 'تفصيلات ڏسو'
  },
  location: {
    en: 'Location',
    ur: 'مقام',
    sd: 'مقام'
  },
  featured: {
    en: 'Featured',
    ur: 'خصوصی',
    sd: 'خصوصي'
  },
  aboutUs: {
    en: 'About Us',
    ur: 'ہمارے بارے میں',
    sd: 'اسان بارو ۾'
  },
  contactUs: {
    en: 'Contact Us',
    ur: 'ہم سے رابطہ کریں',
    sd: 'اسان سان رابطو ڪريو'
  },
  followUs: {
    en: 'Follow Us',
    ur: 'ہمیں فالو کریں',
    sd: 'اسان کي فالو ڪريو'
  },
  copyright: {
    en: 'All rights reserved. Celebrating Sindhi women artisans.',
    ur: 'تمام حقوق محفوظ ہیں۔ سندھی خواتین کاریگروں کو سلام۔',
    sd: 'تمام حقوق محفوظ آهن۔ سندھي خواتين ڪاريگرن کو سلام۔'
  }
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
