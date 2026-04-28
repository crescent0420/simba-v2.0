'use client';

import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';
import { useTranslation } from '@/lib/i18n';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { state, dispatch } = useCart();
  const { t } = useTranslation();

  const handleQuantityChange = (productId: number, delta: number) => {
    const item = state.items.find((i) => i.product.id === productId);
    if (item) {
      const newQuantity = item.quantity + delta;
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { productId, quantity: newQuantity },
      });
    }
  };

  const handleRemove = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-stone-200 px-4 py-4">
             <h2 className="text-lg font-bold text-simba-dark">{t.nav.cart}</h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-stone-500 hover:bg-stone-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {state.items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <ShoppingBag className="h-16 w-16 text-stone-300" />
               <p className="mt-4 text-lg font-medium text-simba-dark">
                 {t.cart.empty}
               </p>
               <p className="text-sm text-stone-500">
                 {t.cart.emptySubtitle}
               </p>
              <button
                onClick={onClose}
                className="mt-6 rounded-xl bg-simba-orange px-6 py-2.5 text-sm font-semibold text-white"
              >
                 {t.cart.continueShopping}
               </button>
             </div>
           ) : (
            <>
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 rounded-xl border border-stone-200 p-3"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-simba-cream">
                        {item.product.image ? (
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-contain p-1"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-stone-400">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="line-clamp-2 text-sm font-medium text-simba-dark">
                            {item.product.name}
                          </h3>
                          <p className="text-sm font-bold text-simba-orange">
                            {item.product.price.toLocaleString('en-RW')} RWF
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleQuantityChange(item.product.id, -1)}
                              className="flex h-7 w-7 items-center justify-center rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.product.id, 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemove(item.product.id)}
                            className="text-stone-400 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-stone-200 px-4 py-4">
                 <div className="mb-4 flex items-center justify-between">
                   <span className="text-stone-600">{t.cart.subtotal}</span>
                  <span className="text-lg font-bold text-simba-dark">
                    {state.total.toLocaleString('en-RW')} RWF
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="block w-full rounded-xl bg-simba-orange py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-orange-700"
                >
                   {t.cart.checkout}
                 </Link>
                <button
                  onClick={onClose}
                  className="mt-3 block w-full rounded-xl border border-stone-200 py-3 text-center text-sm font-medium text-simba-dark hover:bg-stone-50"
                >
                   {t.cart.continueShopping}
                 </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}