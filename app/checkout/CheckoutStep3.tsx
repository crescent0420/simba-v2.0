'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/lib/cartContext';
import { useTranslation } from '@/lib/i18n';
import { Check } from 'lucide-react';

interface DeliveryDetails {
  fullName: string;
  phone: string;
  address: string;
  notes?: string;
}

interface CheckoutStep3Props {
  deliveryDetails: DeliveryDetails;
  onBackToShopping: () => void;
}

export default function CheckoutStep3({ deliveryDetails, onBackToShopping }: CheckoutStep3Props) {
  const { state } = useCart();
  const { t } = useTranslation();
  const [orderNumber, setOrderNumber] = useState('');
  const [showCheckmark, setShowCheckmark] = useState(false);

  useEffect(() => {
    async function createOrder() {
      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: state.items,
            deliveryDetails,
            total: state.total,
          }),
        });

        const data = await response.json();
        if (data.orderId) {
          setOrderNumber(data.orderId);
        }
      } catch {
        setOrderNumber(Math.random().toString(36).substring(2, 8).toUpperCase());
      }
    }

    createOrder();
  }, [state.items, deliveryDetails, state.total]);

  useEffect(() => {
    const timer = setTimeout(() => setShowCheckmark(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const DELIVERY_FEE = 500;
  const grandTotal = state.total + DELIVERY_FEE;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg text-center">
      <div className="mb-6 flex justify-center">
        <div
          className={`flex h-20 w-20 items-center justify-center rounded-full bg-green-100 transition-all duration-700 ${
            showCheckmark ? 'scale-100' : 'scale-0'
          }`}
        >
          <Check
            className={`h-12 w-12 text-green-600 transition-all duration-700 ${
              showCheckmark ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      </div>

      <h2 className="mb-2 text-2xl font-bold text-simba-dark">
        {t.checkout.orderConfirmed}
      </h2>
      <p className="mb-6 text-stone-500">
        {t.checkout.orderConfirmedSubtitle}
      </p>

      <div className="mb-6 rounded-xl bg-simba-cream p-4 text-left">
        <p className="mb-2 text-sm text-stone-500">{t.checkout.orderNumber}</p>
        <p className="text-xl font-bold text-simba-dark">
          #{orderNumber || '...'}
        </p>

        <div className="mt-4 space-y-2">
          {state.items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span className="text-stone-600">
                {item.product.name} x{item.quantity}
              </span>
              <span className="text-simba-dark">
                {(item.product.price * item.quantity).toLocaleString('en-RW')} RWF
              </span>
            </div>
          ))}
          <div className="flex justify-between border-t border-stone-200 pt-2 font-bold">
            <span className="text-simba-dark">{t.checkout.total}</span>
            <span className="text-simba-orange">
              {grandTotal.toLocaleString('en-RW')} RWF
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onBackToShopping}
        className="w-full rounded-xl bg-simba-orange py-3 text-base font-semibold text-white transition-all hover:bg-orange-700"
      >
        {t.checkout.backToShopping}
      </button>
    </div>
  );
}