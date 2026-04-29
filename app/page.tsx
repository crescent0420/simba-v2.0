import { fetchProducts } from '@/lib/products';
import Header from '@/components/Header';
import ProductGrid from '@/components/ProductGrid';

export default async function Home() {
  const products = await fetchProducts();

  return (
    <main className="min-h-screen bg-simba-cream dark:bg-[#111111]">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <ProductGrid products={products} />
      </div>
    </main>
  );
}