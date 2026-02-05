import type { ShopifyProduct } from './shopify/types';

// Mock power tool products for layout testing
export const MOCK_PRODUCTS: ShopifyProduct[] = [
  {
    node: {
      id: 'gid://shopify/Product/1',
      title: 'Metabo HPT 18V Cordless Hammer Drill Kit',
      description: 'Professional-grade 18V cordless hammer drill with brushless motor, 2-speed transmission, and LED work light. Includes two 5.0Ah batteries and rapid charger.',
      handle: 'metabo-hpt-18v-hammer-drill',
      vendor: 'Metabo HPT',
      productType: 'Power Tools',
      tags: ['cordless', 'drill', '18v', 'hammer drill'],
      priceRange: {
        minVariantPrice: { amount: '179.99', currencyCode: 'USD' }
      },
      compareAtPriceRange: {
        minVariantPrice: { amount: '229.99', currencyCode: 'USD' }
      },
      images: {
        edges: [
          { node: { url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&h=500&fit=crop', altText: 'Cordless Hammer Drill' } }
        ]
      },
      variants: {
        edges: [
          { node: { id: 'variant-1', title: 'Kit with 2 Batteries', price: { amount: '179.99', currencyCode: 'USD' }, compareAtPrice: { amount: '229.99', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Configuration', value: 'Kit with 2 Batteries' }] } },
          { node: { id: 'variant-2', title: 'Tool Only', price: { amount: '129.99', currencyCode: 'USD' }, compareAtPrice: null, availableForSale: true, selectedOptions: [{ name: 'Configuration', value: 'Tool Only' }] } }
        ]
      },
      options: [{ name: 'Configuration', values: ['Kit with 2 Batteries', 'Tool Only'] }]
    }
  },
  {
    node: {
      id: 'gid://shopify/Product/2',
      title: 'DeWalt 20V MAX 7-1/4" Circular Saw',
      description: 'Powerful circular saw with 5,200 RPM motor for fast cuts through 2x lumber. Features integrated dust blower and LED cut line indicator.',
      handle: 'dewalt-20v-circular-saw',
      vendor: 'DeWalt',
      productType: 'Power Tools',
      tags: ['cordless', 'saw', '20v', 'circular saw'],
      priceRange: {
        minVariantPrice: { amount: '199.00', currencyCode: 'USD' }
      },
      compareAtPriceRange: null,
      images: {
        edges: [
          { node: { url: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500&h=500&fit=crop', altText: 'Circular Saw' } }
        ]
      },
      variants: {
        edges: [
          { node: { id: 'variant-3', title: 'Default', price: { amount: '199.00', currencyCode: 'USD' }, compareAtPrice: null, availableForSale: true, selectedOptions: [] } }
        ]
      },
      options: []
    }
  },
  {
    node: {
      id: 'gid://shopify/Product/3',
      title: 'Milwaukee M18 FUEL Angle Grinder',
      description: '4-1/2" / 5" grinder with POWERSTATE brushless motor delivers up to 8,500 RPM. REDLINK PLUS intelligence provides optimized performance and overload protection.',
      handle: 'milwaukee-m18-angle-grinder',
      vendor: 'Milwaukee',
      productType: 'Power Tools',
      tags: ['cordless', 'grinder', '18v', 'angle grinder'],
      priceRange: {
        minVariantPrice: { amount: '249.00', currencyCode: 'USD' }
      },
      compareAtPriceRange: {
        minVariantPrice: { amount: '299.00', currencyCode: 'USD' }
      },
      images: {
        edges: [
          { node: { url: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=500&h=500&fit=crop', altText: 'Angle Grinder' } }
        ]
      },
      variants: {
        edges: [
          { node: { id: 'variant-4', title: '4-1/2 inch', price: { amount: '249.00', currencyCode: 'USD' }, compareAtPrice: { amount: '299.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Size', value: '4-1/2"' }] } },
          { node: { id: 'variant-5', title: '5 inch', price: { amount: '269.00', currencyCode: 'USD' }, compareAtPrice: { amount: '319.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Size', value: '5"' }] } }
        ]
      },
      options: [{ name: 'Size', values: ['4-1/2"', '5"'] }]
    }
  },
  {
    node: {
      id: 'gid://shopify/Product/4',
      title: 'Makita 18V LXT Brushless Impact Driver',
      description: 'Compact impact driver with variable speed (0-3,600 RPM) for fastening applications. Features 4-speed power selection for ultimate control.',
      handle: 'makita-18v-impact-driver',
      vendor: 'Makita',
      productType: 'Power Tools',
      tags: ['cordless', 'impact driver', '18v'],
      priceRange: {
        minVariantPrice: { amount: '159.00', currencyCode: 'USD' }
      },
      compareAtPriceRange: null,
      images: {
        edges: [
          { node: { url: 'https://images.unsplash.com/photo-1426927308491-6380b6a9936f?w=500&h=500&fit=crop', altText: 'Impact Driver' } }
        ]
      },
      variants: {
        edges: [
          { node: { id: 'variant-6', title: 'Default', price: { amount: '159.00', currencyCode: 'USD' }, compareAtPrice: null, availableForSale: true, selectedOptions: [] } }
        ]
      },
      options: []
    }
  },
  {
    node: {
      id: 'gid://shopify/Product/5',
      title: 'Bosch 12V Max Oscillating Multi-Tool',
      description: 'Versatile multi-tool for cutting, sanding, scraping, and grout removal. Features Starlock tool-free accessory change system.',
      handle: 'bosch-12v-oscillating-tool',
      vendor: 'Bosch',
      productType: 'Power Tools',
      tags: ['cordless', 'multi-tool', '12v', 'oscillating'],
      priceRange: {
        minVariantPrice: { amount: '129.00', currencyCode: 'USD' }
      },
      compareAtPriceRange: {
        minVariantPrice: { amount: '149.00', currencyCode: 'USD' }
      },
      images: {
        edges: [
          { node: { url: 'https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=500&h=500&fit=crop', altText: 'Oscillating Multi-Tool' } }
        ]
      },
      variants: {
        edges: [
          { node: { id: 'variant-7', title: 'Tool Only', price: { amount: '129.00', currencyCode: 'USD' }, compareAtPrice: { amount: '149.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Configuration', value: 'Tool Only' }] } },
          { node: { id: 'variant-8', title: 'With Accessories Kit', price: { amount: '179.00', currencyCode: 'USD' }, compareAtPrice: { amount: '209.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Configuration', value: 'With Accessories Kit' }] } }
        ]
      },
      options: [{ name: 'Configuration', values: ['Tool Only', 'With Accessories Kit'] }]
    }
  },
  {
    node: {
      id: 'gid://shopify/Product/6',
      title: 'Festool 18V Cordless Jigsaw CARVEX',
      description: 'Premium jigsaw with triple blade guidance for precise, splinter-free cuts. Features dust extraction connection and tool-free blade change.',
      handle: 'festool-18v-jigsaw',
      vendor: 'Festool',
      productType: 'Power Tools',
      tags: ['cordless', 'jigsaw', '18v', 'precision'],
      priceRange: {
        minVariantPrice: { amount: '445.00', currencyCode: 'USD' }
      },
      compareAtPriceRange: null,
      images: {
        edges: [
          { node: { url: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=500&h=500&fit=crop', altText: 'Cordless Jigsaw' } }
        ]
      },
      variants: {
        edges: [
          { node: { id: 'variant-9', title: 'Default', price: { amount: '445.00', currencyCode: 'USD' }, compareAtPrice: null, availableForSale: true, selectedOptions: [] } }
        ]
      },
      options: []
    }
  },
  {
    node: {
      id: 'gid://shopify/Product/7',
      title: 'Ridgid 18V Compact Router Kit',
      description: 'Compact fixed-base router with 1-1/2 peak HP motor. Features soft-start technology, micro-adjust depth control, and LED work lights.',
      handle: 'ridgid-18v-compact-router',
      vendor: 'Ridgid',
      productType: 'Power Tools',
      tags: ['cordless', 'router', '18v', 'woodworking'],
      priceRange: {
        minVariantPrice: { amount: '189.00', currencyCode: 'USD' }
      },
      compareAtPriceRange: {
        minVariantPrice: { amount: '219.00', currencyCode: 'USD' }
      },
      images: {
        edges: [
          { node: { url: 'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=500&h=500&fit=crop', altText: 'Compact Router' } }
        ]
      },
      variants: {
        edges: [
          { node: { id: 'variant-10', title: 'Default', price: { amount: '189.00', currencyCode: 'USD' }, compareAtPrice: { amount: '219.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [] } }
        ]
      },
      options: []
    }
  },
  {
    node: {
      id: 'gid://shopify/Product/8',
      title: 'Hilti SFC 22-A Cordless Drill Driver',
      description: 'Professional 22V drill driver with 4-speed gearbox and Active Torque Control. Designed for demanding jobsite conditions.',
      handle: 'hilti-22v-drill-driver',
      vendor: 'Hilti',
      productType: 'Power Tools',
      tags: ['cordless', 'drill', '22v', 'professional'],
      priceRange: {
        minVariantPrice: { amount: '329.00', currencyCode: 'USD' }
      },
      compareAtPriceRange: null,
      images: {
        edges: [
          { node: { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop', altText: 'Professional Drill Driver' } }
        ]
      },
      variants: {
        edges: [
          { node: { id: 'variant-11', title: 'Default', price: { amount: '329.00', currencyCode: 'USD' }, compareAtPrice: null, availableForSale: true, selectedOptions: [] } }
        ]
      },
      options: []
    }
  },
  {
    node: {
      id: 'gid://shopify/Product/9',
      title: 'Ryobi ONE+ 18V Reciprocating Saw',
      description: 'Powerful recip saw with anti-vibe handle and adjustable pivoting shoe. Compatible with all Ryobi ONE+ batteries.',
      handle: 'ryobi-18v-reciprocating-saw',
      vendor: 'Ryobi',
      productType: 'Power Tools',
      tags: ['cordless', 'saw', '18v', 'reciprocating'],
      priceRange: {
        minVariantPrice: { amount: '79.00', currencyCode: 'USD' }
      },
      compareAtPriceRange: {
        minVariantPrice: { amount: '99.00', currencyCode: 'USD' }
      },
      images: {
        edges: [
          { node: { url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebb6122?w=500&h=500&fit=crop', altText: 'Reciprocating Saw' } }
        ]
      },
      variants: {
        edges: [
          { node: { id: 'variant-12', title: 'Tool Only', price: { amount: '79.00', currencyCode: 'USD' }, compareAtPrice: { amount: '99.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Configuration', value: 'Tool Only' }] } },
          { node: { id: 'variant-13', title: 'With Battery', price: { amount: '149.00', currencyCode: 'USD' }, compareAtPrice: { amount: '179.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Configuration', value: 'With Battery' }] } }
        ]
      },
      options: [{ name: 'Configuration', values: ['Tool Only', 'With Battery'] }]
    }
  },
  {
    node: {
      id: 'gid://shopify/Product/10',
      title: 'Metabo 36V Brushless SDS-Plus Rotary Hammer',
      description: 'High-performance rotary hammer with 2.0J impact energy. Features Vibration Reduction System (VRS) for reduced fatigue.',
      handle: 'metabo-36v-rotary-hammer',
      vendor: 'Metabo',
      productType: 'Power Tools',
      tags: ['cordless', 'hammer', '36v', 'rotary hammer', 'sds'],
      priceRange: {
        minVariantPrice: { amount: '399.00', currencyCode: 'USD' }
      },
      compareAtPriceRange: {
        minVariantPrice: { amount: '479.00', currencyCode: 'USD' }
      },
      images: {
        edges: [
          { node: { url: 'https://images.unsplash.com/photo-1586864387789-628af9feed72?w=500&h=500&fit=crop', altText: 'Rotary Hammer' } }
        ]
      },
      variants: {
        edges: [
          { node: { id: 'variant-14', title: 'Default', price: { amount: '399.00', currencyCode: 'USD' }, compareAtPrice: { amount: '479.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [] } }
        ]
      },
      options: []
    }
  },
  {
    node: {
      id: 'gid://shopify/Product/11',
      title: 'DeWalt 60V MAX FlexVolt Table Saw',
      description: 'Portable jobsite table saw with 8-1/4" blade capacity. Rack and pinion fence system for fast, accurate adjustments.',
      handle: 'dewalt-60v-table-saw',
      vendor: 'DeWalt',
      productType: 'Power Tools',
      tags: ['cordless', 'saw', '60v', 'table saw', 'flexvolt'],
      priceRange: {
        minVariantPrice: { amount: '599.00', currencyCode: 'USD' }
      },
      compareAtPriceRange: null,
      images: {
        edges: [
          { node: { url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&h=500&fit=crop', altText: 'Cordless Table Saw' } }
        ]
      },
      variants: {
        edges: [
          { node: { id: 'variant-15', title: 'Default', price: { amount: '599.00', currencyCode: 'USD' }, compareAtPrice: null, availableForSale: true, selectedOptions: [] } }
        ]
      },
      options: []
    }
  },
  {
    node: {
      id: 'gid://shopify/Product/12',
      title: 'Milwaukee M12 FUEL Installation Drill/Driver',
      description: 'Ultra-compact drill designed for tight spaces. 3/8" chuck with 300 in-lbs of torque in a 6" head length.',
      handle: 'milwaukee-m12-installation-drill',
      vendor: 'Milwaukee',
      productType: 'Power Tools',
      tags: ['cordless', 'drill', '12v', 'compact', 'installation'],
      priceRange: {
        minVariantPrice: { amount: '169.00', currencyCode: 'USD' }
      },
      compareAtPriceRange: {
        minVariantPrice: { amount: '199.00', currencyCode: 'USD' }
      },
      images: {
        edges: [
          { node: { url: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500&h=500&fit=crop', altText: 'Compact Installation Drill' } }
        ]
      },
      variants: {
        edges: [
          { node: { id: 'variant-16', title: 'Tool Only', price: { amount: '169.00', currencyCode: 'USD' }, compareAtPrice: { amount: '199.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Configuration', value: 'Tool Only' }] } },
          { node: { id: 'variant-17', title: 'Kit', price: { amount: '249.00', currencyCode: 'USD' }, compareAtPrice: { amount: '289.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [{ name: 'Configuration', value: 'Kit' }] } }
        ]
      },
      options: [{ name: 'Configuration', values: ['Tool Only', 'Kit'] }]
    }
  }
];

// Search function that mimics Searchanise-style behavior
export function searchMockProducts(query: string): ShopifyProduct[] {
  if (!query.trim()) return MOCK_PRODUCTS;
  
  const searchTerms = query.toLowerCase().split(' ').filter(Boolean);
  
  return MOCK_PRODUCTS.filter(product => {
    const searchableText = [
      product.node.title,
      product.node.description,
      product.node.vendor,
      product.node.productType,
      ...(product.node.tags || [])
    ].join(' ').toLowerCase();
    
    return searchTerms.every(term => searchableText.includes(term));
  });
}

// Get mock product by handle
export function getMockProductByHandle(handle: string): ShopifyProduct['node'] | null {
  const product = MOCK_PRODUCTS.find(p => p.node.handle === handle);
  return product?.node || null;
}

// Get brand/vendor filter options
export function getMockBrands(): string[] {
  const brands = new Set(MOCK_PRODUCTS.map(p => p.node.vendor).filter(Boolean));
  return Array.from(brands).sort();
}

// Price range for filters
export function getMockPriceRange(): { min: number; max: number } {
  const prices = MOCK_PRODUCTS.map(p => parseFloat(p.node.priceRange.minVariantPrice.amount));
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
}
