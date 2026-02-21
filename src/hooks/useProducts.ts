import { useState, useEffect } from 'react';
import { fetchProducts, fetchProductByHandle } from '@/lib/shopify/api';
import type { ShopifyProduct } from '@/lib/shopify/types';
import { MOCK_PRODUCTS } from '@/lib/mockProducts';

export function useProducts(first: number = 20, query?: string) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError(null);
      
      const response = await fetchProducts(first, query);
      
      if (response?.data?.products?.edges) {
        setProducts(response.data.products.edges);
      } else {
        setError('Failed to load products');
      }
      
      setLoading(false);
    }

    loadProducts();
  }, [first, query]);

  return { products, loading, error };
}

export function useProduct(handle: string) {
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      if (!handle) return;
      
      setLoading(true);
      setError(null);
      
      const response = await fetchProductByHandle(handle);
      
      if (response?.data?.product) {
        setProduct(response.data.product);
      } else {
        // Fallback to mock/test products for demo handles
        const mockProduct = MOCK_PRODUCTS.find(p => p.node.handle === handle);
        if (mockProduct) {
          setProduct(mockProduct.node as ShopifyProduct['node']);
        } else {
          setError('Product not found');
        }
      }
      
      setLoading(false);
    }

    loadProduct();
  }, [handle]);

  return { product, loading, error };
}
