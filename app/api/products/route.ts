import { NextRequest, NextResponse } from 'next/server';
import productsData from '../../../public/simba_products.json';
import { Product } from '@/lib/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const inStock = searchParams.get('inStock');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const sort = searchParams.get('sort');

  let products: Product[] = productsData.products as Product[];

  if (category && category !== 'All') {
    products = products.filter(p => p.category === category);
  }

  if (search) {
    const query = search.toLowerCase();
    products = products.filter(p => p.name.toLowerCase().includes(query));
  }

  if (inStock === 'true') {
    products = products.filter(p => p.inStock);
  }

  if (minPrice) {
    products = products.filter(p => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    products = products.filter(p => p.price <= Number(maxPrice));
  }

  if (sort) {
    switch (sort) {
      case 'price_asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'name_asc':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
  }

  const response = NextResponse.json({
    products,
    total: products.length,
  });

  response.headers.set('Cache-Control', 'public, max-age=3600');

  return response;
}