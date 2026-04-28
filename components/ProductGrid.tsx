'use client';

import { useState, useMemo, useEffect } from 'react';
import { Product } from '@/lib/types';
import { getCategories } from '@/lib/products';
import ProductCard from './ProductCard';
import CategoryTabs from './CategoryTabs';
import SearchBar from './SearchBar';
import FiltersPanel from './FiltersPanel';
import ProductModal from './ProductModal';
import { Frown } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
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

  return (
    <div className="flex flex-col gap-4">
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

      <div className="text-sm text-stone-600">
        Showing {filteredProducts.length} products
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
          <p className="mt-4 text-lg font-medium text-simba-dark">
            No products found
          </p>
          <p className="text-sm text-stone-500">
            Try adjusting your filters.
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