'use client';

import { useRef } from 'react';
import { LucideIcon, Sparkles, Droplets, Utensils, Baby, Home, Sparkle, Dumbbell, ShoppingBasket, Candy, Dog } from 'lucide-react';

interface CategoryTabsProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

const categoryIcons: Record<string, LucideIcon> = {
  All: Sparkles,
  'Alcoholic Drinks': ShoppingBasket,
  'Baby Products': Baby,
  'Cleaning & Sanitary': Droplets,
  'Cosmetics & Personal Care': Sparkle,
  'Food Products': Utensils,
  General: ShoppingBasket,
  Household: Home,
  'Kitchen Storage': Utensils,
  'Kitchenware & Electronics': Droplets,
  'Pet Care': Dog,
  'Sports & Wellness': Dumbbell,
};

export default function CategoryTabs({
  categories,
  selected,
  onSelect,
}: CategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const allCategories = ['All', ...categories];

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide"
    >
      {allCategories.map((category) => {
        const Icon = categoryIcons[category] || Sparkles;
        const isActive = selected === category;

        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'border-simba-orange bg-simba-orange text-white shadow-md'
                : 'border-stone-200 bg-white text-simba-dark hover:border-simba-orange hover:text-simba-orange'
            }`}
          >
            <Icon className="h-4 w-4" />
            {category}
          </button>
        );
      })}
    </div>
  );
}