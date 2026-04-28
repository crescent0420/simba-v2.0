import { Product } from './types';
import productsData from '../public/simba_products.json';

export async function fetchProducts(): Promise<Product[]> {
  return productsData.products as Product[];
}

export function getCategories(products: Product[]): string[] {
  const categories = new Set(products.map((p) => p.category));
  return Array.from(categories).sort();
}

export function groupByCategory(products: Product[]): Record<string, Product[]> {
  return products.reduce(
    (acc, product) => {
      const category = product.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    },
    {} as Record<string, Product[]>
  );
}