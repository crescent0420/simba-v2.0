'use client';

import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-10 pr-10 text-sm text-simba-dark placeholder:text-stone-400 transition-colors focus:border-simba-orange focus:outline-none focus:ring-1 focus:ring-simba-orange"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-simba-dark"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}