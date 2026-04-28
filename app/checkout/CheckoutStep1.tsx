'use client';

import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';

interface DeliveryDetails {
  fullName: string;
  phone: string;
  address: string;
  notes: string;
}

interface CheckoutStep1Props {
  deliveryDetails: DeliveryDetails;
  onNext: (details: DeliveryDetails) => void;
}

export default function CheckoutStep1({
  deliveryDetails,
  onNext,
}: CheckoutStep1Props) {
  const { t } = useTranslation();
  const [form, setForm] = useState<DeliveryDetails>(deliveryDetails);
  const [errors, setErrors] = useState<Partial<DeliveryDetails>>({});

  const validatePhone = (phone: string) => {
    return /^07\d{8}$/.test(phone);
  };

  const handleBlur = (field: keyof DeliveryDetails) => {
    const newErrors = { ...errors };
    if (field === 'fullName' && !form.fullName.trim()) {
      newErrors.fullName = t.checkout.errors.nameRequired;
    } else if (field === 'phone' && !validatePhone(form.phone)) {
      newErrors.phone = t.checkout.errors.phoneInvalid;
    } else if (field === 'address' && !form.address.trim()) {
      newErrors.address = t.checkout.errors.addressRequired;
    } else {
      delete newErrors[field];
    }
    setErrors(newErrors);
  };

  const handleSubmit = () => {
    const newErrors: Partial<DeliveryDetails> = {};
    if (!form.fullName.trim()) newErrors.fullName = t.checkout.errors.nameRequired;
    if (!validatePhone(form.phone)) newErrors.phone = t.checkout.errors.phoneInvalid;
    if (!form.address.trim()) newErrors.address = t.checkout.errors.addressRequired;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext(form);
  };

  const isValid =
    form.fullName.trim() && validatePhone(form.phone) && form.address.trim();

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-lg font-bold text-simba-dark">{t.checkout.deliveryTitle}</h2>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-simba-dark">
            {t.checkout.fields.fullName} *
          </label>
          <input
            type="text"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            onBlur={() => handleBlur('fullName')}
            className={`w-full rounded-xl border px-4 py-3 text-simba-dark ${
              errors.fullName ? 'border-red-500' : 'border-stone-200'
            }`}
            placeholder={t.checkout.placeholders.name}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-simba-dark">
            {t.checkout.fields.phone} *
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            onBlur={() => handleBlur('phone')}
            className={`w-full rounded-xl border px-4 py-3 text-simba-dark ${
              errors.phone ? 'border-red-500' : 'border-stone-200'
            }`}
            placeholder={t.checkout.placeholders.phone}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-simba-dark">
            {t.checkout.fields.address} *
          </label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            onBlur={() => handleBlur('address')}
            className={`w-full rounded-xl border px-4 py-3 text-simba-dark ${
              errors.address ? 'border-red-500' : 'border-stone-200'
            }`}
            placeholder={t.checkout.placeholders.address}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-500">{errors.address}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-simba-dark">
            {t.checkout.fields.notes}
          </label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="w-full rounded-xl border border-stone-200 px-4 py-3 text-simba-dark"
            placeholder={t.checkout.placeholders.notes}
            rows={3}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="mt-6 w-full rounded-xl bg-simba-orange py-3 text-base font-semibold text-white transition-all hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-stone-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}