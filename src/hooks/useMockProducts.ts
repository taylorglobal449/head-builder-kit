import { MOCK_PRODUCTS, getMockProductByHandle, searchMockProducts } from '@/lib/mockProducts';
import type { ShopifyProduct } from '@/lib/shopify/types';

// Hook to use mock products for development/preview
export function useMockProducts(first: number = 20, query?: string) {
  let products = query ? searchMockProducts(query) : MOCK_PRODUCTS;
  products = products.slice(0, first);
  
  return { 
    products, 
    loading: false, 
    error: null 
  };
}

export function useMockProduct(handle: string) {
  const product = getMockProductByHandle(handle);
  
  return { 
    product, 
    loading: false, 
    error: product ? null : 'Product not found' 
  };
}
