import type { ShopifyProduct } from "./types";

/**
 * Check if a product has MAPP (Minimum Advertised Price Policy) pricing.
 * Products with "MAPP Pricing" in their tags should NOT show their price
 * anywhere except inside the cart.
 */
export function isMappPriced(product: ShopifyProduct | ShopifyProduct["node"]): boolean {
  const tags = "node" in product ? product.node.tags : product.tags;
  if (!tags || !Array.isArray(tags)) return false;
  return tags.some(tag => tag.toLowerCase().replace(/[\s_-]+/g, '') === 'mapppricing');
}
