'use client';

import { CartProvider } from '@/lib/cartContext';
import { LanguageProvider } from '@/lib/i18n';
import { ThemeProvider } from '@/lib/theme';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CartProvider>{children}</CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}