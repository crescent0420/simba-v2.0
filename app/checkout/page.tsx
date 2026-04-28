'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cartContext';
import CheckoutStep1 from './CheckoutStep1';
import CheckoutStep2 from './CheckoutStep2';
import CheckoutStep3 from './CheckoutStep3';

interface DeliveryDetails {
  fullName: string;
  phone: string;
  address: string;
  notes: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { state, dispatch } = useCart();
  const [step, setStep] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    fullName: '',
    phone: '',
    address: '',
    notes: '',
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && state.items.length === 0) {
      router.replace('/');
    }
  }, [isMounted, state.items.length, router]);

  if (!isMounted) return null;

  const steps = [
    { num: 1, label: 'Delivery' },
    { num: 2, label: 'Payment' },
    { num: 3, label: 'Confirmed' },
  ];

  const handleNext = (details: DeliveryDetails) => {
    setDeliveryDetails(details);
    setStep(2);
  };

  const handlePaymentSuccess = () => {
    setStep(3);
  };

  const handleBackToShopping = () => {
    dispatch({ type: 'CLEAR_CART' });
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-simba-cream">
      <header className="sticky top-0 z-40 bg-simba-orange px-4 py-4 shadow-md">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-xl font-bold text-white">Checkout</h1>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-6">
        <div className="mb-8 flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  step >= s.num
                    ? 'bg-orange-400 text-white'
                    : 'bg-white/30 text-white'
                }`}
              >
                {s.num}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  step >= s.num ? 'text-orange-400' : 'text-white/70'
                }`}
              >
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div
                  className={`mx-4 h-0.5 w-8 ${
                    step > s.num ? 'bg-orange-400' : 'bg-white/30'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <CheckoutStep1
            deliveryDetails={deliveryDetails}
            onNext={handleNext}
          />
        )}

        {step === 2 && (
          <CheckoutStep2
            deliveryDetails={deliveryDetails}
            onSuccess={handlePaymentSuccess}
          />
        )}

        {step === 3 && (
          <CheckoutStep3
            deliveryDetails={deliveryDetails}
            onBackToShopping={handleBackToShopping}
          />
        )}
      </div>
    </div>
  );
}