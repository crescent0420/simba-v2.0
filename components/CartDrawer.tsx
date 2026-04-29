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
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform bg-white dark:bg-[#1e1e1e] shadow-xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-[#2a2a2a] px-4 py-4">
             <h2 className="text-lg font-bold text-simba-dark dark:text-[#f0f0f0]">{t.nav.cart}</h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-stone-500 hover:bg-stone-100 dark:hover:bg-[#2a2a2a]"
            >
              <X className="h-5 w-5 dark:text-stone-400" />
            </button>
          </div>

          {state.items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <ShoppingBag className="h-16 w-16 text-stone-300 dark:text-stone-600" />
               <p className="mt-4 text-lg font-medium text-simba-dark dark:text-[#f0f0f0]">
                {t.cart.empty}
              </p>
              <p className="text-sm text-stone-500 dark:text-[#aaa]">
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
                     className="flex gap-4 rounded-xl border border-stone-200 dark:border-[#2a2a2a] p-3"
                   >
                     <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-simba-cream dark:bg-[#252525]">
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
                         <h3 className="line-clamp-2 text-sm font-medium text-simba-dark dark:text-[#f0f0f0]">
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
                             className="flex h-7 w-7 items-center justify-center rounded-lg border border-stone-200 dark:border-[#333] text-stone-600 dark:text-[#aaa] hover:bg-stone-100 dark:hover:bg-[#2a2a2a]"
                           >
                             <Minus className="h-4 w-4" />
                           </button>
                           <span className="w-6 text-center text-sm font-medium dark:text-[#f0f0f0]">
                             {item.quantity}
                           </span>
                           <button
                             onClick={() => handleQuantityChange(item.product.id, 1)}
                             className="flex h-7 w-7 items-center justify-center rounded-lg border border-stone-200 dark:border-[#333] text-stone-600 dark:text-[#aaa] hover:bg-stone-100 dark:hover:bg-[#2a2a2a]"
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

             <div className="border-t border-stone-200 dark:border-[#2a2a2a] px-4 py-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-stone-600 dark:text-[#aaa]">{t.cart.subtotal}</span>
                 <span className="text-lg font-bold text-simba-dark dark:text-[#f0f0f0]">
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
                  className="mt-3 block w-full rounded-xl border border-stone-200 dark:border-[#333] py-3 text-center text-sm font-medium text-simba-dark dark:text-[#f0f0f0] hover:bg-stone-50 dark:hover:bg-[#2a2a2a]"
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