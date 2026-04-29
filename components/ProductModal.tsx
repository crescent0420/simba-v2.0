'use client';

import { useEffect, useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/cartContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
    onClose();
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((q) => Math.max(1, q + delta));
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      <div className="relative z-10 mx-4 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 shadow-md"
        >
          <X className="h-5 w-5 text-stone-600" />
        </button>

        <div className="relative h-64 w-full overflow-hidden rounded-t-2xl bg-simba-cream">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-stone-400">
              <img
                src={`https://placehold.co/400x400/F5F5F5/999999?text=No+Image`}
                alt="No image"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>

        <div className="p-5">
          <p className="text-sm text-stone-500">{product.category}</p>
          <h2 className="mt-1 text-xl font-bold text-simba-dark">
            {product.name}
          </h2>
          <p className="mt-2 text-2xl font-bold text-simba-orange">
            {product.price.toLocaleString('en-RW')} RWF
          </p>
          <p className="text-sm text-stone-500">Unit: {product.unit}</p>

          <div className="mt-3">
            {product.inStock ? (
              <span className="text-sm font-medium text-green-600">In stock</span>
            ) : (
              <span className="text-sm font-medium text-red-500">Out of stock</span>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between border border-stone-200 rounded-xl p-2">
            <span className="text-sm font-medium text-simba-dark">Quantity</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-stone-600">Total:</span>
            <span className="text-xl font-bold text-simba-dark">
              {totalPrice.toLocaleString('en-RW')} RWF
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="mt-6 w-full rounded-xl bg-simba-orange py-3 text-base font-semibold text-white transition-all hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}