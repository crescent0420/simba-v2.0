'use client';

import { ShoppingCart, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/lib/cartContext';
import { useTranslation, Language } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import CartDrawer from './CartDrawer';

export default function Header() {
  const { state } = useCart();
  const { language, setLanguage, t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const languages: Language[] = ['en', 'fr', 'rw'];
  const langLabels = { en: 'EN', fr: 'FR', rw: 'RW' };

  return (
    <>
      <header className="sticky top-0 z-50 bg-simba-orange/95 backdrop-blur-md px-4 py-4 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-xl font-bold text-white">Simba Supermarket</h1>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                    language === lang
                      ? 'bg-white text-simba-orange'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {langLabels[lang]}
                </button>
              ))}
            </div>
            
            <button
              onClick={toggleTheme}
              className="relative rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/30"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
            
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/30"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-simba-orange">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}