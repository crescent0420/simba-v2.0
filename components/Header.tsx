'use client';

import { ShoppingCart, Sun, Moon, Menu, X, Home } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';
import { useTranslation, Language } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import CartDrawer from './CartDrawer';

export default function Header() {
  const { state } = useCart();
  const { language, setLanguage, t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const languages: Language[] = ['en', 'fr', 'rw'];
  const langLabels = { en: 'EN', fr: 'FR', rw: 'RW' };

  return (
    <>
      <header className="sticky top-0 z-50 h-[62px] border-b border-[rgba(232,98,10,0.12)] bg-white/80 dark:bg-[#111]/80 backdrop-blur-[14px] px-[3%]">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-[#E8620A]">
              <span className="text-white" style={{ fontFamily: 'var(--font-syne)', fontWeight: 800 }}>S</span>
            </div>
            <span className="text-lg text-[#0e0c0a] dark:text-white" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700 }}>Simba 2.0</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/shop" className="text-sm text-[#0e0c0a] dark:text-white hover:text-[#E8620A] transition-colors">
              {t.hero?.ctaPrimary || 'Shop'}
            </Link>
            <Link href="/auth" className="text-sm text-[#0e0c0a] dark:text-white hover:text-[#E8620A] transition-colors">
              {t.nav?.signIn || 'Sign In'}
            </Link>
            <Link href="/auth?tab=register" className="text-sm text-[#0e0c0a] dark:text-white hover:text-[#E8620A] transition-colors">
              {t.nav?.register || 'Register'}
            </Link>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 text-xs font-medium transition-colors ${
                    language === lang
                      ? 'text-[#E8620A] border-[#E8620A]'
                      : 'text-[#6b6560] dark:text-[#aaa] border-transparent hover:border-[rgba(232,98,10,0.3)]'
                  }`}
                  style={{
                    borderRadius: '20px',
                    border: '1.5px solid transparent',
                  }}
                >
                  {langLabels[lang]}
                </button>
              ))}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-8 w-8 items-center justify-center border border-[rgba(14,12,10,0.12)] dark:border-[#333] rounded-[9px] text-[#0e0c0a] dark:text-white hover:border-[#E8620A] transition-colors"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex h-8 w-8 items-center justify-center bg-[#E8620A] rounded-[9px] text-white relative"
            >
              <ShoppingCart className="h-4 w-4" />
              {itemCount > 0 && (
                <span className="absolute -right-[6px] -top-[6px] flex h-[17px] w-[17px] items-center justify-center rounded-full bg-black text-white text-xs">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-8 w-8 items-center justify-center md:hidden text-[#0e0c0a] dark:text-white"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[62px] z-40 bg-white dark:bg-[#111] p-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link href="/shop" className="text-lg text-[#0e0c0a] dark:text-white" onClick={() => setMobileMenuOpen(false)}>
              {t.hero?.ctaPrimary || 'Shop'}
            </Link>
            <Link href="/auth" className="text-lg text-[#0e0c0a] dark:text-white" onClick={() => setMobileMenuOpen(false)}>
              {t.nav?.signIn || 'Sign In'}
            </Link>
            <Link href="/auth?tab=register" className="text-lg text-[#0e0c0a] dark:text-white" onClick={() => setMobileMenuOpen(false)}>
              {t.nav?.register || 'Register'}
            </Link>
          </nav>
        </div>
      )}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}