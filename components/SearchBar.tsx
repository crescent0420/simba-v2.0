'use client';

import { Search, X } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
      <input
        type="text"
        placeholder={t.nav.search}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-stone-200 dark:border-[#333] bg-white dark:bg-[#151515] py-2.5 pl-10 pr-10 text-sm text-simba-dark dark:text-[#f0f0f0] placeholder:text-stone-400 transition-colors focus:border-simba-orange focus:outline-none focus:ring-1 focus:ring-simba-orange"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-simba-dark dark:hover:text-[#f0f0f0]"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}