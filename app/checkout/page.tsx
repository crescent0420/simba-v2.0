'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, ShoppingCart, Sun, Moon } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { useTranslation } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
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
  const { t, language, setLanguage, isMounted: langMounted } = useTranslation();
  const { theme, toggleTheme } = useTheme();
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
    { num: 1, label: t.checkout.delivery },
    { num: 2, label: t.checkout.payment },
    { num: 3, label: t.checkout.confirmed },
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

  const languages: ('en' | 'fr' | 'rw')[] = ['en', 'fr', 'rw'];
  const langLabels = { en: 'EN', fr: 'FR', rw: 'RW' as const };

  return (
    <div className="min-h-screen bg-simba-cream dark:bg-[#111111]">
      <header className="sticky top-0 z-40 bg-simba-orange px-4 py-4 shadow-md">
        <div className="mx-auto max-w-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-white hover:text-white/80">
              <Home className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold text-white">Checkout</h1>
          </div>
          <div className="flex items-center gap-2">
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
          </div>
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