import { storefrontApiRequest } from './api';

// Cart GraphQL Mutations
const CART_QUERY = `
  query cart($id: ID!) {
    cart(id: $id) { id totalQuantity }
  }
`;

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { id }
      userErrors { field message }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id }
      userErrors { field message }
    }
  }
`;

interface UserError {
  field: string[] | null;
  message: string;
}

function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set('channel', 'online_store');
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

function isCartNotFoundError(userErrors: UserError[]): boolean {
  return userErrors.some(e => 
    e.message.toLowerCase().includes('cart not found') || 
    e.message.toLowerCase().includes('does not exist')
  );
}

interface CartLine {
  node: {
    id: string;
    merchandise: { id: string };
  };
}

interface CartCreateResponse {
  data?: {
    cartCreate?: {
      cart?: {
        id: string;
        checkoutUrl: string;
        lines: { edges: CartLine[] };
      };
      userErrors?: UserError[];
    };
  };
}

interface CartLinesAddResponse {
  data?: {
    cartLinesAdd?: {
      cart?: {
        id: string;
        lines: { edges: CartLine[] };
      };
      userErrors?: UserError[];
    };
  };
}

interface CartLinesUpdateResponse {
  data?: {
    cartLinesUpdate?: {
      cart?: { id: string };
      userErrors?: UserError[];
    };
  };
}

interface CartLinesRemoveResponse {
  data?: {
    cartLinesRemove?: {
      cart?: { id: string };
      userErrors?: UserError[];
    };
  };
}

interface CartQueryResponse {
  data?: {
    cart?: {
      id: string;
      totalQuantity: number;
    };
  };
}

export async function createShopifyCart(variantId: string, quantity: number): Promise<{ cartId: string; checkoutUrl: string; lineId: string } | null> {
  const data = await storefrontApiRequest<CartCreateResponse>(CART_CREATE_MUTATION, {
    input: { lines: [{ quantity, merchandiseId: variantId }] },
  });

  if (data?.data?.cartCreate?.userErrors?.length) {
    console.error('Cart creation failed:', data.data.cartCreate.userErrors);
    return null;
  }

  const cart = data?.data?.cartCreate?.cart;
  if (!cart?.checkoutUrl) return null;

  const lineId = cart.lines.edges[0]?.node?.id;
  if (!lineId) return null;

  return { cartId: cart.id, checkoutUrl: formatCheckoutUrl(cart.checkoutUrl), lineId };
}

export async function addLineToShopifyCart(cartId: string, variantId: string, quantity: number): Promise<{ success: boolean; lineId?: string; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest<CartLinesAddResponse>(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [{ quantity, merchandiseId: variantId }],
  });

  const userErrors = data?.data?.cartLinesAdd?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) {
    console.error('Add line failed:', userErrors);
    return { success: false };
  }

  const lines = data?.data?.cartLinesAdd?.cart?.lines?.edges || [];
  const newLine = lines.find((l) => l.node.merchandise.id === variantId);
  return { success: true, lineId: newLine?.node?.id };
}

export async function updateShopifyCartLine(cartId: string, lineId: string, quantity: number): Promise<{ success: boolean; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest<CartLinesUpdateResponse>(CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });

  const userErrors = data?.data?.cartLinesUpdate?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) {
    console.error('Update line failed:', userErrors);
    return { success: false };
  }
  return { success: true };
}

export async function removeLineFromShopifyCart(cartId: string, lineId: string): Promise<{ success: boolean; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest<CartLinesRemoveResponse>(CART_LINES_REMOVE_MUTATION, {
    cartId,
    lineIds: [lineId],
  });

  const userErrors = data?.data?.cartLinesRemove?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) {
    console.error('Remove line failed:', userErrors);
    return { success: false };
  }
  return { success: true };
}

export async function fetchCart(cartId: string): Promise<{ exists: boolean; totalQuantity?: number }> {
  const data = await storefrontApiRequest<CartQueryResponse>(CART_QUERY, { id: cartId });
  if (!data?.data?.cart) return { exists: false };
  return { exists: true, totalQuantity: data.data.cart.totalQuantity };
}
