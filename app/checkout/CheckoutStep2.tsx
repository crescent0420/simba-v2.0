'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/lib/cartContext';

interface DeliveryDetails {
  fullName: string;
  phone: string;
  address: string;
  notes: string;
}

interface CheckoutStep2Props {
  deliveryDetails: DeliveryDetails;
  onSuccess: () => void;
}

const DELIVERY_FEE = 500;

export default function CheckoutStep2({
  deliveryDetails,
  onSuccess,
}: CheckoutStep2Props) {
  const { state } = useCart();
  const [pin, setPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isProcessing && progress < 100) {
      const interval = setInterval(() => {
        setProgress((p) => {
          const newProgress = p + 4;
          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              onSuccess();
            }, 300);
            return 100;
          }
          return newProgress;
        });
      }, 25);
      return () => clearInterval(interval);
    }
  }, [isProcessing, progress, onSuccess]);

  const subtotal = state.total;
  const grandTotal = subtotal + DELIVERY_FEE;

  const handlePay = async () => {
    if (pin.length !== 4) return;
    
    setIsProcessing(true);
    setError('');

    try {
      const response = await fetch('/api/checkout/momo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: deliveryDetails.phone,
          pin,
          amount: grandTotal,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Payment failed');
        setIsProcessing(false);
        setProgress(0);
        return;
      }
    } catch {
      setError('Network error. Please try again.');
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-lg font-bold text-simba-dark">
        MTN MoMo Payment
      </h2>

      <div className="mb-6 space-y-3 rounded-xl bg-simba-cream p-4">
        <h3 className="font-medium text-simba-dark">Order Summary</h3>
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
        <div className="flex justify-between border-t border-stone-200 pt-2 text-sm">
          <span className="text-stone-600">Subtotal</span>
          <span className="text-simba-dark">
            {subtotal.toLocaleString('en-RW')} RWF
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-stone-600">Delivery</span>
          <span className="text-simba-dark">
            {DELIVERY_FEE.toLocaleString('en-RW')} RWF
          </span>
        </div>
        <div className="flex justify-between border-t border-stone-200 pt-2 font-bold">
          <span className="text-simba-dark">Total</span>
          <span className="text-simba-orange">
            {grandTotal.toLocaleString('en-RW')} RWF
          </span>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-simba-dark">
            Phone Number
          </label>
          <input
            type="tel"
            value={deliveryDetails.phone}
            readOnly
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-simba-dark"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-simba-dark">
            PIN (4 digits)
          </label>
          <input
            type="password"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
            className="w-full rounded-xl border border-stone-200 px-4 py-3 text-simba-dark font-mono tracking-widest"
            placeholder="••••"
          />
        </div>

        {isProcessing && (
          <div className="mt-2">
            <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200">
              <div
                className="h-full bg-green-500 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-center text-sm text-stone-500">
              Processing payment...
            </p>
          </div>
        )}

        <button
          onClick={handlePay}
          disabled={pin.length !== 4 || isProcessing}
          className="mt-6 w-full rounded-xl bg-simba-orange py-3 text-base font-semibold text-white transition-all hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-stone-300"
        >
          {isProcessing
            ? `Pay ${grandTotal.toLocaleString('en-RW')} RWF`
            : `Pay ${grandTotal.toLocaleString('en-RW')} RWF`}
        </button>
      </div>
    </div>
  );
}