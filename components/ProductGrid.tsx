'use client';

import { useState, useMemo, useEffect, use } from 'react';
import { Product } from '@/lib/types';
import { getCategories } from '@/lib/products';
import ProductCard from './ProductCard';
import CategoryTabs from './CategoryTabs';
import SearchBar from './SearchBar';
import FiltersPanel from './FiltersPanel';
import ProductModal from './ProductModal';
import { Frown } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { CATEGORY_BANNERS } from '@/lib/banners';

interface ProductGridProps {
  products: Product[];
  initialCategory?: string;
}

export default function ProductGrid({ products, initialCategory = 'All' }: ProductGridProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [sortBy, setSortBy] = useState('default');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = getCategories(products);

  const maxPrice = useMemo(() => {
    return Math.max(...products.map((p) => p.price), 0);
  }, [products]);

  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  useEffect(() => {
    if (initialCategory && initialCategory !== 'All') {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(query));
    }

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (showInStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [products, searchQuery, selectedCategory, showInStockOnly, priceRange, sortBy]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const bannerUrl = CATEGORY_BANNERS[selectedCategory] || CATEGORY_BANNERS['All'];

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-stone-200 dark:border-[#333] bg-white dark:bg-[#111] p-4">
      {selectedCategory !== 'All' && (
        <div className="relative h-48 w-full overflow-hidden rounded-2xl">
          <img
            src={bannerUrl}
            alt={selectedCategory}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <h2 className="text-3xl font-bold text-white">{selectedCategory}</h2>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <FiltersPanel
          maxPrice={maxPrice}
          showInStockOnly={showInStockOnly}
          onInStockChange={setShowInStockOnly}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      <CategoryTabs
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

       <div className="text-sm text-stone-600 dark:text-stone-400">
         {t.showing.replace('{count}', filteredProducts.length.toString())} {t.products}
       </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={handleProductClick}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Frown className="h-12 w-12 text-stone-400" />
           <p className="mt-4 text-lg font-medium text-simba-dark dark:text-white">
             {t.empty.noResults}
           </p>
           <p className="text-sm text-stone-500 dark:text-stone-400">
             {t.empty.adjustFilters}
           </p>
        </div>
      )}

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}