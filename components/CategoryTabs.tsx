'use client';

import { useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LucideIcon, Sparkles, Droplets, Utensils, Baby, Home, Sparkle, Dumbbell, ShoppingBasket, Dog } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface CategoryTabsProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

const categoryIcons: Record<string, LucideIcon> = {
  'All': Sparkles,
  'Alcoholic Drinks': ShoppingBasket,
  'Baby Products': Baby,
  'Cleaning & Sanitary': Droplets,
  'Cosmetics & Personal Care': Sparkle,
  'Food Products': Utensils,
  'General': ShoppingBasket,
  'Household': Home,
  'Kitchen Storage': Utensils,
  'Kitchenware & Electronics': Droplets,
  'Pet Care': Dog,
  'Sports & Wellness': Dumbbell,
};

const categoryKeyMap: Record<string, string> = {
  'All': 'all',
  'Alcoholic Drinks': 'AlcoholicDrinks',
  'Baby Products': 'BabyProducts',
  'Cleaning & Sanitary': 'CleaningSanitary',
  'Cosmetics & Personal Care': 'CosmeticsPersonalCare',
  'Food Products': 'FoodProducts',
  'General': 'General',
  'Household': 'Household',
  'Kitchen Storage': 'KitchenStorage',
  'Kitchenware & Electronics': 'KitchenwareElectronics',
  'Pet Care': 'PetCare',
  'Sports & Wellness': 'SportsWellness',
};

export default function CategoryTabs({
  categories,
  selected,
  onSelect,
}: CategoryTabsProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  const allCategories = ['All', ...categories];

  const handleSelect = (category: string) => {
    onSelect(category);
    const params = new URLSearchParams();
    if (category !== 'All') {
      params.set('category', category);
    }
    const newUrl = params.toString() ? `/shop?${params.toString()}` : '/shop';
    router.push(newUrl);
  };

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide dark:bg-[#111]"
    >
      {allCategories.map((category) => {
        const Icon = categoryIcons[category] || Sparkles;
        const isActive = selected === category;
        const transKey = categoryKeyMap[category] || 'all';
        const label = (t.categories as any)[transKey] || category;

        return (
          <button
            key={category}
            onClick={() => handleSelect(category)}
            className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'border-simba-orange bg-simba-orange text-white shadow-md'
                : 'border-stone-200 bg-white text-simba-dark hover:border-simba-orange hover:text-simba-orange dark:border-[#333] dark:bg-[#1e1e1e] dark:text-white'
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        );
      })}
    </div>
  );
}