import { useState, useEffect, useCallback } from 'react';
import type { ShopifyProduct } from '@/lib/shopify/types';

const STORAGE_KEY = 'recently-viewed-products';
const MAX_ITEMS = 10;

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<ShopifyProduct[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecentlyViewed(JSON.parse(stored));
      } catch {
        setRecentlyViewed([]);
      }
    }
  }, []);

  const addToRecentlyViewed = useCallback((product: ShopifyProduct) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.node.id !== product.node.id);
      const updated = [product, ...filtered].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { recentlyViewed, addToRecentlyViewed };
}
