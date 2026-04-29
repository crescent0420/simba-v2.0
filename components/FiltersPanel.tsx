'use client';

import { useState, useEffect } from 'react';
import { SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface FiltersPanelProps {
  maxPrice: number;
  showInStockOnly: boolean;
  onInStockChange: (value: boolean) => void;
  priceRange: [number, number];
  onPriceRangeChange: (value: [number, number]) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export default function FiltersPanel({
  maxPrice,
  showInStockOnly,
  onInStockChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortChange,
}: FiltersPanelProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [localMin, setLocalMin] = useState(priceRange[0]);
  const [localMax, setLocalMax] = useState(priceRange[1]);

  useEffect(() => {
    setLocalMin(priceRange[0]);
    setLocalMax(priceRange[1]);
  }, [priceRange]);

  const handleMinChange = (value: number) => {
    const newMin = Math.min(value, localMax - 1000);
    setLocalMin(newMin);
    onPriceRangeChange([newMin, localMax]);
  };

  const handleMaxChange = (value: number) => {
    const newMax = Math.max(value, localMin + 1000);
    setLocalMax(newMax);
    onPriceRangeChange([localMin, newMax]);
  };

  const formatPrice = (price: number) => price.toLocaleString('en-RW');

  const sortOptions = [
    { value: 'default', label: t.filters.default },
    { value: 'price-asc', label: t.filters.priceLowHigh },
    { value: 'price-desc', label: t.filters.priceHighLow },
    { value: 'name-asc', label: t.filters.nameAZ },
  ];

  return (
    <div className="rounded-xl border border-stone-200 dark:border-[#2a2a2a] bg-white dark:bg-[#1e1e1e] p-4 transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-sm font-medium text-simba-dark dark:text-[#f0f0f0]"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          {t.filters.sortBy}
        </span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4 animate-fade-in">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-simba-dark dark:text-[#f0f0f0]">
            <input
              type="checkbox"
              checked={showInStockOnly}
              onChange={(e) => onInStockChange(e.target.checked)}
              className="h-4 w-4 rounded border-stone-300 text-simba-orange focus:ring-simba-orange"
            />
            {t.filters.inStockOnly}
          </label>

          <div className="space-y-2">
            <div className="text-sm font-medium text-simba-dark dark:text-[#f0f0f0]">
              {t.filters.priceRange}: RWF {formatPrice(localMin)} — {formatPrice(localMax)}
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-xs text-stone-500 dark:text-[#aaa]">Min</label>
                <input
                  type="range"
                  min={0}
                  max={maxPrice}
                  step={1000}
                  value={localMin}
                  onChange={(e) => handleMinChange(Number(e.target.value))}
                  className="w-full accent-simba-orange"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-stone-500 dark:text-[#aaa]">Max</label>
                <input
                  type="range"
                  min={0}
                  max={maxPrice}
                  step={1000}
                  value={localMax}
                  onChange={(e) => handleMaxChange(Number(e.target.value))}
                  className="w-full accent-simba-orange"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-simba-dark dark:text-[#f0f0f0]">{t.filters.sortBy}</label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full rounded-lg border border-stone-200 dark:border-[#333] bg-white dark:bg-[#151515] px-3 py-2 text-sm text-simba-dark dark:text-[#f0f0f0] focus:border-simba-orange focus:outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}