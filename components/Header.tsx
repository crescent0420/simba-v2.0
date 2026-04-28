'use client';

import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/lib/cartContext';
import CartDrawer from './CartDrawer';

export default function Header() {
  const { state } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-40 bg-simba-orange px-4 py-4 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-xl font-bold text-white">Simba Supermarket</h1>
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
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}