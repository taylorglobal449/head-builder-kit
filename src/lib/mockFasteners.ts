import type { MockShopifyProduct } from './mockProducts';

// Fastener attribute dimensions
export const FASTENER_TYPES = [
  'Wood Screws', 'Machine Screws', 'Self-Tapping Screws', 'Drywall Screws',
  'Hex Bolts', 'Carriage Bolts', 'Lag Bolts', 'Anchor Bolts',
  'Hex Nuts', 'Lock Nuts', 'Wing Nuts',
  'Flat Washers', 'Lock Washers', 'Fender Washers',
  'Concrete Anchors', 'Toggle Bolts', 'Sleeve Anchors',
  'Pop Rivets', 'Blind Rivets',
];

export const FASTENER_DIAMETERS = [
  '#4', '#6', '#8', '#10', '#12',
  '1/4"', '5/16"', '3/8"', '7/16"', '1/2"', '5/8"', '3/4"', '1"',
];

export const FASTENER_LENGTHS = [
  '1/2"', '3/4"', '1"', '1-1/4"', '1-1/2"', '2"', '2-1/2"', '3"', '3-1/2"', '4"', '5"', '6"',
];

export const FASTENER_MATERIALS = [
  'Steel', 'Stainless Steel (18-8)', 'Stainless Steel (316)', 'Silicon Bronze',
  'Brass', 'Aluminum', 'Alloy Steel', 'Nylon',
];

export const FASTENER_HEADS = [
  'Flat', 'Pan', 'Round', 'Oval', 'Hex', 'Hex Flange',
  'Button', 'Truss', 'Fillister', 'Socket Cap',
];

export const FASTENER_DRIVES = [
  'Phillips', 'Slotted', 'Combo', 'Square (Robertson)',
  'Torx (Star)', 'Hex Socket', 'Pozidrive', 'One-Way',
];

export const FASTENER_FINISHES = [
  'Zinc Plated', 'Hot Dip Galvanized', 'Yellow Zinc', 'Black Oxide',
  'Plain', 'Phosphate', 'Chrome', 'Nickel Plated', 'Dacromet',
];

// Parsed tag structure
export interface FastenerAttributes {
  type?: string;
  diameter?: string;
  length?: string;
  material?: string;
  head?: string;
  drive?: string;
  finish?: string;
}

export function parseFastenerTags(tags: string[]): FastenerAttributes {
  const attrs: FastenerAttributes = {};
  for (const tag of tags) {
    const [key, ...rest] = tag.split(':');
    const val = rest.join(':');
    if (!val) continue;
    switch (key) {
      case 'type': attrs.type = val; break;
      case 'diameter': attrs.diameter = val; break;
      case 'length': attrs.length = val; break;
      case 'material': attrs.material = val; break;
      case 'head': attrs.head = val; break;
      case 'drive': attrs.drive = val; break;
      case 'finish': attrs.finish = val; break;
    }
  }
  return attrs;
}

// Generate a set of mock fastener products
function makeFastener(
  id: number, type: string, diameter: string, length: string,
  material: string, head: string, drive: string, finish: string,
  price: string, vendor = 'Fasteners Inc'
): MockShopifyProduct {
  const title = `${vendor} ${diameter} x ${length} ${head} ${drive} ${type} - ${material} ${finish}`;
  return {
    node: {
      id: `gid://shopify/Product/fastener-${id}`,
      title,
      description: `${type} — ${diameter} x ${length}, ${head} head, ${drive} drive, ${material}, ${finish} finish.`,
      handle: `fastener-${id}`,
      vendor,
      productType: 'Fasteners',
      tags: [
        'fasteners',
        `type:${type}`,
        `diameter:${diameter}`,
        `length:${length}`,
        `material:${material}`,
        `head:${head}`,
        `drive:${drive}`,
        `finish:${finish}`,
      ],
      priceRange: { minVariantPrice: { amount: price, currencyCode: 'USD' } },
      images: {
        edges: [
          { node: { url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&h=500&fit=crop', altText: title } },
        ],
      },
      variants: {
        edges: [
          {
            node: {
              id: `gid://shopify/ProductVariant/fastener-${id}-1`,
              title: `${diameter} x ${length}`,
              price: { amount: price, currencyCode: 'USD' },
              availableForSale: true,
              selectedOptions: [{ name: 'Size', value: `${diameter} x ${length}` }],
            },
          },
        ],
      },
      options: [{ name: 'Size', values: [`${diameter} x ${length}`] }],
    },
    extras: { templateType: 'quantity', sku: `FAST-${id}` },
  };
}

export const MOCK_FASTENERS: MockShopifyProduct[] = [
  makeFastener(1, 'Wood Screws', '#8', '1"', 'Steel', 'Flat', 'Phillips', 'Zinc Plated', '0.08'),
  makeFastener(2, 'Wood Screws', '#8', '1-1/2"', 'Steel', 'Flat', 'Phillips', 'Zinc Plated', '0.10'),
  makeFastener(3, 'Wood Screws', '#8', '2"', 'Steel', 'Flat', 'Phillips', 'Zinc Plated', '0.12'),
  makeFastener(4, 'Wood Screws', '#10', '1-1/2"', 'Steel', 'Flat', 'Phillips', 'Yellow Zinc', '0.14'),
  makeFastener(5, 'Wood Screws', '#10', '2"', 'Steel', 'Flat', 'Square (Robertson)', 'Yellow Zinc', '0.16'),
  makeFastener(6, 'Wood Screws', '#10', '3"', 'Steel', 'Flat', 'Torx (Star)', 'Yellow Zinc', '0.22'),
  makeFastener(7, 'Wood Screws', '#10', '2"', 'Stainless Steel (18-8)', 'Flat', 'Square (Robertson)', 'Plain', '0.35'),
  makeFastener(8, 'Drywall Screws', '#6', '1"', 'Steel', 'Pan', 'Phillips', 'Phosphate', '0.04'),
  makeFastener(9, 'Drywall Screws', '#6', '1-1/4"', 'Steel', 'Pan', 'Phillips', 'Phosphate', '0.05'),
  makeFastener(10, 'Drywall Screws', '#8', '2"', 'Steel', 'Pan', 'Phillips', 'Phosphate', '0.06'),
  makeFastener(11, 'Machine Screws', '1/4"', '1"', 'Steel', 'Pan', 'Phillips', 'Zinc Plated', '0.15'),
  makeFastener(12, 'Machine Screws', '1/4"', '1-1/2"', 'Steel', 'Pan', 'Slotted', 'Zinc Plated', '0.18'),
  makeFastener(13, 'Machine Screws', '5/16"', '1"', 'Stainless Steel (18-8)', 'Hex', 'Hex Socket', 'Plain', '0.42'),
  makeFastener(14, 'Machine Screws', '3/8"', '2"', 'Stainless Steel (316)', 'Socket Cap', 'Hex Socket', 'Plain', '0.85'),
  makeFastener(15, 'Self-Tapping Screws', '#8', '3/4"', 'Steel', 'Hex Flange', 'Hex Socket', 'Zinc Plated', '0.12'),
  makeFastener(16, 'Self-Tapping Screws', '#10', '1"', 'Steel', 'Hex Flange', 'Hex Socket', 'Zinc Plated', '0.14'),
  makeFastener(17, 'Self-Tapping Screws', '#12', '1-1/2"', 'Stainless Steel (18-8)', 'Pan', 'Phillips', 'Plain', '0.38'),
  makeFastener(18, 'Hex Bolts', '1/4"', '1"', 'Steel', 'Hex', 'Hex Socket', 'Zinc Plated', '0.22'),
  makeFastener(19, 'Hex Bolts', '1/4"', '2"', 'Steel', 'Hex', 'Hex Socket', 'Zinc Plated', '0.30'),
  makeFastener(20, 'Hex Bolts', '3/8"', '1-1/2"', 'Steel', 'Hex', 'Hex Socket', 'Yellow Zinc', '0.45'),
  makeFastener(21, 'Hex Bolts', '3/8"', '3"', 'Steel', 'Hex', 'Hex Socket', 'Hot Dip Galvanized', '0.68'),
  makeFastener(22, 'Hex Bolts', '1/2"', '2"', 'Alloy Steel', 'Hex', 'Hex Socket', 'Plain', '0.89'),
  makeFastener(23, 'Hex Bolts', '1/2"', '4"', 'Stainless Steel (18-8)', 'Hex', 'Hex Socket', 'Plain', '1.85'),
  makeFastener(24, 'Hex Bolts', '5/8"', '3"', 'Alloy Steel', 'Hex', 'Hex Socket', 'Yellow Zinc', '1.45'),
  makeFastener(25, 'Carriage Bolts', '1/4"', '2"', 'Steel', 'Round', 'Square (Robertson)', 'Zinc Plated', '0.28'),
  makeFastener(26, 'Carriage Bolts', '3/8"', '3"', 'Steel', 'Round', 'Square (Robertson)', 'Hot Dip Galvanized', '0.55'),
  makeFastener(27, 'Carriage Bolts', '1/2"', '4"', 'Stainless Steel (18-8)', 'Round', 'Square (Robertson)', 'Plain', '1.65'),
  makeFastener(28, 'Lag Bolts', '1/4"', '2"', 'Steel', 'Hex', 'Hex Socket', 'Zinc Plated', '0.25'),
  makeFastener(29, 'Lag Bolts', '3/8"', '3"', 'Steel', 'Hex', 'Hex Socket', 'Hot Dip Galvanized', '0.52'),
  makeFastener(30, 'Lag Bolts', '1/2"', '5"', 'Steel', 'Hex', 'Hex Socket', 'Hot Dip Galvanized', '1.15'),
  makeFastener(31, 'Concrete Anchors', '1/4"', '2"', 'Steel', 'Hex', 'Hex Socket', 'Zinc Plated', '0.65'),
  makeFastener(32, 'Concrete Anchors', '3/8"', '3"', 'Steel', 'Hex', 'Hex Socket', 'Zinc Plated', '0.95'),
  makeFastener(33, 'Concrete Anchors', '1/2"', '4"', 'Steel', 'Hex', 'Hex Socket', 'Zinc Plated', '1.45'),
  makeFastener(34, 'Flat Washers', '1/4"', '1/2"', 'Steel', 'Flat', 'Phillips', 'Zinc Plated', '0.04'),
  makeFastener(35, 'Flat Washers', '3/8"', '1/2"', 'Stainless Steel (18-8)', 'Flat', 'Phillips', 'Plain', '0.08'),
  makeFastener(36, 'Lock Washers', '1/4"', '1/2"', 'Steel', 'Flat', 'Phillips', 'Zinc Plated', '0.05'),
  makeFastener(37, 'Hex Nuts', '1/4"', '1/2"', 'Steel', 'Hex', 'Hex Socket', 'Zinc Plated', '0.06'),
  makeFastener(38, 'Hex Nuts', '3/8"', '1/2"', 'Stainless Steel (18-8)', 'Hex', 'Hex Socket', 'Plain', '0.12'),
  makeFastener(39, 'Lock Nuts', '1/4"', '1/2"', 'Steel', 'Hex', 'Hex Socket', 'Zinc Plated', '0.08'),
  makeFastener(40, 'Lock Nuts', '3/8"', '1/2"', 'Steel', 'Hex', 'Hex Socket', 'Yellow Zinc', '0.14'),
];

// Extract unique values for each attribute from a product set
export function getAvailableAttributes(products: MockShopifyProduct[]) {
  const sets = {
    types: new Set<string>(),
    diameters: new Set<string>(),
    lengths: new Set<string>(),
    materials: new Set<string>(),
    heads: new Set<string>(),
    drives: new Set<string>(),
    finishes: new Set<string>(),
  };

  for (const p of products) {
    const attrs = parseFastenerTags(p.node.tags || []);
    if (attrs.type) sets.types.add(attrs.type);
    if (attrs.diameter) sets.diameters.add(attrs.diameter);
    if (attrs.length) sets.lengths.add(attrs.length);
    if (attrs.material) sets.materials.add(attrs.material);
    if (attrs.head) sets.heads.add(attrs.head);
    if (attrs.drive) sets.drives.add(attrs.drive);
    if (attrs.finish) sets.finishes.add(attrs.finish);
  }

  return {
    types: Array.from(sets.types).sort(),
    diameters: Array.from(sets.diameters).sort(),
    lengths: Array.from(sets.lengths).sort(),
    materials: Array.from(sets.materials).sort(),
    heads: Array.from(sets.heads).sort(),
    drives: Array.from(sets.drives).sort(),
    finishes: Array.from(sets.finishes).sort(),
  };
}

// Filter products by selected attributes
export function filterFasteners(
  products: MockShopifyProduct[],
  filters: Partial<Record<keyof FastenerAttributes, string[]>>
): MockShopifyProduct[] {
  return products.filter((p) => {
    const attrs = parseFastenerTags(p.node.tags || []);
    for (const [key, values] of Object.entries(filters)) {
      if (!values || values.length === 0) continue;
      const attrVal = attrs[key as keyof FastenerAttributes];
      if (!attrVal || !values.includes(attrVal)) return false;
    }
    return true;
  });
}
