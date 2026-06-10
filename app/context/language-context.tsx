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
