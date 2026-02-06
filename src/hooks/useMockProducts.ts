import { MOCK_PRODUCTS, TEST_PRODUCTS, getMockProductByHandle, searchMockProducts, type MockShopifyProduct } from '@/lib/mockProducts';
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

// Hook to get only the test products for product page development
export function useTestProducts() {
  return {
    products: TEST_PRODUCTS,
    loading: false,
    error: null
  };
}

export function useMockProduct(handle: string) {
  const fullProduct = getMockProductByHandle(handle);
  
  return { 
    product: fullProduct?.node || null,
    extras: fullProduct?.extras || null,
    loading: false, 
    error: fullProduct ? null : 'Product not found' 
  };
}
