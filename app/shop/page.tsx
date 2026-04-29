import { fetchProducts } from '@/lib/products';
import Header from '@/components/Header';
import ProductGrid from '@/components/ProductGrid';

export const dynamic = 'force-dynamic';

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const products = await fetchProducts();
  const category = params.category || 'All';

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#fafaf9] dark:bg-[#111] px-[3%] py-[24px]">
        <div className="mx-auto max-w-7xl">
          <ProductGrid products={products} initialCategory={category} />
        </div>
      </main>
    </>
  );
}