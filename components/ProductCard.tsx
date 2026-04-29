'use client';

import Image from 'next/image';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/cartContext';
import { useTranslation } from '@/lib/i18n';

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
}

export default function ProductCard({ product, onProductClick }: ProductCardProps) {
  const priceFormatted = product.price.toLocaleString('en-RW');
  const { state, dispatch } = useCart();
  const { t } = useTranslation();

  const cartItem = state.items.find(item => item.product.id === product.id);
  const inCartQuantity = cartItem?.quantity || 0;
  const isNew = product.id > 23000;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const handleCardClick = () => {
    onProductClick?.(product);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col rounded-2xl border border-stone-200 bg-white dark:bg-[#1e1e1e] dark:border-[#2a2a2a] p-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
    >
      <div className="relative flex h-40 w-full items-center justify-center overflow-hidden rounded-xl bg-simba-cream dark:bg-[#252525]">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-stone-400">
            <img
              src={`https://placehold.co/200x200/F5F5F5/999999?text=No+Image`}
              alt="No image available"
              className="h-full w-full object-cover"
            />
          </div>
        )}
        
        {inCartQuantity > 0 && (
          <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-simba-orange text-xs font-bold text-white">
            {inCartQuantity}
          </span>
        )}
        
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-[#111]/70">
            <span className="rounded-full bg-stone-800 px-3 py-1 text-sm font-medium text-white">
              {t.product.outOfStock}
            </span>
          </div>
        )}
        
        {isNew && (
          <div className="absolute left-2 top-2">
            <span className="rounded-full bg-green-500 px-2 py-0.5 text-xs font-bold text-white">
              NEW
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <h3 className="line-clamp-2 text-sm font-medium text-simba-dark dark:text-[#f0f0f0]">
          {product.name}
        </h3>
        <p className="mt-1 text-lg font-bold text-simba-orange">
          {priceFormatted} RWF
        </p>
        <p className="text-xs text-stone-500 dark:text-[#aaa]">{t.product.unit}: {product.unit}</p>
      </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="mt-3 w-full rounded-xl bg-simba-orange py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500 dark:disabled:bg-[#444] dark:disabled:text-[#888]"
        >
          {t.product.addToCart}
        </button>
    </div>
  );
}