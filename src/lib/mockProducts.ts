import type { ShopifyProduct } from './shopify/types';
import dcb609cMain from '@/assets/deals/dewalt-batteries.jpg';
import dcb609cAlt1 from '@/assets/deals/dewalt-flexvolt.jpg';
import dcb609cAlt2 from '@/assets/deals/dewalt-kits.jpg';
import dcb609cAlt3 from '@/assets/deals/dewalt-bare-tools.jpg';
import dcb609cAlt4 from '@/assets/deals/dewalt-outdoor.jpg';

// Extended product type with template info
export interface QuantityDiscount {
  minQty: number;
  maxQty: number | null;
  priceEach: number;
  discount?: number;
  label: string;
}

export interface MockProductExtras {
  templateType?: 'standard' | 'quantity';
  quantityDiscounts?: QuantityDiscount[];
  variantQuantityDiscounts?: Record<string, QuantityDiscount[]>;
  sku?: string;
  partNumber?: string;
  mfgPartNumber?: string;
  upc?: string;
  features?: string[];
  includes?: string[];
  specs?: { label: string; value: string }[];
}

export type MockShopifyProduct = ShopifyProduct & { extras?: MockProductExtras };

// Test products for product page development
export const TEST_PRODUCTS: MockShopifyProduct[] = [
  {
    node: {
      id: 'gid://shopify/Product/test-1',
      title: 'DEWALT FLEXVOLT 20V/60V MAX Battery, 9.0-Ah, 2-Pack (DCB609C)',
      description: `The DEWALT DCB609C FLEXVOLT 20V/60V MAX 9.0Ah Battery 2-Pack delivers unprecedented runtime and power for demanding jobsite applications. These dual-voltage batteries automatically change voltage when you switch between 20V MAX and 60V MAX tools, giving you the flexibility to power your entire DEWALT cordless tool lineup with a single battery platform.

FLEXVOLT TECHNOLOGY: Each battery seamlessly shifts between 20V MAX and 60V MAX operation. In 20V MAX mode, these batteries deliver 9.0Ah of capacity for extended runtime on drills, impact drivers, and other compact tools. When placed in a 60V MAX tool such as a table saw, miter saw, or grinder, they deliver 3.0Ah of capacity at 60 volts for the power needed to run high-draw equipment cordlessly.

MAXIMUM RUNTIME: With 9.0Ah of capacity in 20V MAX mode, these batteries provide up to 8x the runtime of a standard compact 1.5Ah pack. For professionals who work full shifts without access to power, this means fewer battery swaps and less downtime. The high-capacity cells are engineered for sustained discharge, maintaining consistent power output even under heavy loads.

CONSTRUCTION-GRADE DURABILITY: The DCB609 batteries feature a rugged housing with integrated impact-resistant end caps and a hang hook for convenient storage. The 3-LED fuel gauge lets you check charge level at a glance without inserting the battery into a tool. Each cell is individually monitored by DEWALT's built-in battery management system to prevent overheating, over-discharge, and overload.

FAST CHARGING: Included in this pack is one DCB1106 charger capable of fully recharging a 9.0Ah battery in approximately 90 minutes. The charger features a diagnostics system with LED indicator that communicates battery charge status — charging, fully charged, or replace pack. It is compatible with all DEWALT 12V MAX, 20V MAX, and 60V MAX battery packs, consolidating your charging station into a single unit.

SYSTEM COMPATIBILITY: These batteries are part of the DEWALT 20V MAX system — one of the largest cordless platforms in the world with over 300 products. Every DEWALT 20V MAX and 60V MAX tool, charger, and accessory is cross-compatible, protecting your investment as your tool collection grows. Whether you're running a framing nailer, a rotary hammer, or a portable power station, FLEXVOLT batteries deliver.

PROFESSIONAL VALUE: Purchasing batteries in a 2-pack delivers significant savings over buying individually. For crews and contractors outfitting multiple tools, this is the most cost-effective way to maintain all-day power across an entire cordless fleet. The included charger adds even more value by eliminating the need for a separate charger purchase.`,
      handle: 'stand-product',
      priceRange: {
        minVariantPrice: { amount: '299.00', currencyCode: 'USD' }
      },
      compareAtPriceRange: {
        minVariantPrice: { amount: '349.00', currencyCode: 'USD' }
      },
      images: {
        edges: [
          { node: { url: dcb609cMain, altText: 'DCB609C - Main View' } },
          { node: { url: dcb609cAlt1, altText: 'DCB609C - FLEXVOLT' } },
          { node: { url: dcb609cAlt2, altText: 'DCB609C - Kit' } },
          { node: { url: dcb609cAlt3, altText: 'DCB609C - Bare Tools' } },
          { node: { url: dcb609cAlt4, altText: 'DCB609C - Outdoor' } }
        ]
      },
      variants: {
        edges: [
          {
            node: {
              id: 'gid://shopify/ProductVariant/test-1-1',
              title: 'Default Title',
              price: { amount: '299.00', currencyCode: 'USD' },
              compareAtPrice: { amount: '349.00', currencyCode: 'USD' },
              availableForSale: true,
              selectedOptions: [{ name: 'Title', value: 'Default Title' }]
            }
          }
        ]
      },
      options: [{ name: 'Title', values: ['Default Title'] }],
      vendor: 'DEWALT',
      productType: 'Batteries & Chargers',
      tags: ['batteries', 'chargers', 'flexvolt', '20v', '60v', 'dewalt']
    },
    extras: {
      templateType: 'standard',
      sku: 'DCB609C',
      partNumber: 'DCB609C',
      mfgPartNumber: 'DCB609C',
      upc: '885911838504',
      features: [
        'FLEXVOLT dual-voltage technology automatically shifts between 20V MAX and 60V MAX',
        '9.0Ah capacity in 20V MAX mode for up to 8x runtime vs. compact 1.5Ah packs',
        '3.0Ah capacity in 60V MAX mode to power high-draw tools like table saws and miter saws',
        'Includes DCB1106 charger — fully recharges a 9.0Ah battery in approximately 90 minutes',
        'Built-in battery management system monitors each cell individually to prevent overheating, over-discharge, and overload',
        '3-LED fuel gauge on each battery for at-a-glance charge status without inserting into a tool',
        'Rugged housing with impact-resistant end caps withstands jobsite drops and abuse',
        'Integrated hang hook on each battery for convenient storage on pegboards and racks',
        'Compatible with the entire DEWALT 20V MAX and 60V MAX cordless tool platform — over 300 products',
        'High-capacity cells engineered for sustained discharge maintain consistent power under heavy loads',
        'Charger diagnostics LED communicates charge status, full charge, and replace-pack alerts',
        'Charger compatible with all DEWALT 12V MAX, 20V MAX, and 60V MAX batteries',
        '2-pack provides significant savings over purchasing batteries individually',
        'Ideal for crews and contractors outfitting multiple tools for all-day cordless operation'
      ],
      includes: [
        '(2) DCB609 FLEXVOLT 20V/60V MAX 9.0Ah Batteries',
        '(1) DCB1106 Charger',
        'Documentation Kit'
      ],
      specs: [
        { label: 'Battery Chemistry', value: 'Lithium Ion' },
        { label: 'Voltage', value: '20V MAX / 60V MAX' },
        { label: 'Amp Hours (20V)', value: '9.0 Ah' },
        { label: 'Amp Hours (60V)', value: '3.0 Ah' },
        { label: 'Watt Hours', value: '180 Wh per battery' },
        { label: 'Pack Quantity', value: '2 Batteries + 1 Charger' },
        { label: 'Charger Model', value: 'DCB1106' },
        { label: 'Charge Time (9.0Ah)', value: '~90 minutes' },
        { label: 'Charger Input', value: '120V AC' },
        { label: 'Fuel Gauge', value: '3-LED' },
        { label: 'Battery Weight', value: '3.49 lbs each' },
        { label: 'Platform Compatibility', value: '20V MAX & 60V MAX' },
        { label: 'Warranty', value: '3-Year Limited' },
        { label: 'Country of Origin', value: 'USA with global materials' },
        { label: 'UPC', value: '885911838504' },
        { label: 'Model #', value: 'DCB609C' }
      ]
    }
  },
  {
    node: {
      id: 'gid://shopify/Product/test-2',
      title: 'Qty Product',
      description: `Premium Grade 8 Hex Cap Screws - The ultimate choice for high-strength fastening applications requiring maximum tensile strength and durability. These fasteners are manufactured to the highest industry standards and are perfect for critical applications across automotive, construction, and industrial sectors.

SUPERIOR STRENGTH: Grade 8 fasteners are manufactured from medium carbon alloy steel, quenched and tempered to achieve a minimum tensile strength of 150,000 PSI. This makes them ideal for critical applications where failure is not an option. The high strength rating ensures reliable performance under heavy loads and dynamic stress conditions.

PRECISION MANUFACTURING: Each fastener is manufactured to meet or exceed SAE J429 specifications. The hex head design provides maximum wrenching surface for secure installation with standard tools. Threads are rolled, not cut, providing superior strength and fatigue resistance. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

CORROSION PROTECTION: These fasteners feature a yellow zinc chromate finish that provides excellent corrosion resistance for both indoor and outdoor applications. The finish also serves as a visual identifier for Grade 8 strength. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

VERSATILE APPLICATIONS: Perfect for automotive, heavy equipment, agricultural machinery, construction equipment, and any application requiring high-strength fastening. The coarse thread design provides excellent holding power in most materials. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

QUALITY ASSURANCE: Every batch is tested for hardness, tensile strength, and dimensional accuracy. Full traceability and certifications available upon request. Made in USA from domestic materials. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

BULK PRICING AVAILABLE: Take advantage of our quantity discount pricing for larger orders. The more you buy, the more you save! Contact us for custom quantities or special requirements. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      handle: 'qty-product',
      priceRange: {
        minVariantPrice: { amount: '0.45', currencyCode: 'USD' }
      },
      images: {
        edges: [
          { node: { url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=800&fit=crop', altText: 'Qty Product - Main View' } },
          { node: { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop', altText: 'Qty Product - Bulk Pack' } },
          { node: { url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=800&fit=crop', altText: 'Qty Product - Close Up' } },
          { node: { url: 'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=800&h=800&fit=crop', altText: 'Qty Product - Application' } }
        ]
      },
      variants: {
        edges: [
          {
            node: {
              id: 'gid://shopify/ProductVariant/test-2-1',
              title: '1/4"-20 x 1"',
              price: { amount: '0.45', currencyCode: 'USD' },
              availableForSale: true,
              selectedOptions: [{ name: 'Size', value: '1/4"-20 x 1"' }]
            }
          },
          {
            node: {
              id: 'gid://shopify/ProductVariant/test-2-2',
              title: '1/4"-20 x 1-1/2"',
              price: { amount: '0.52', currencyCode: 'USD' },
              availableForSale: true,
              selectedOptions: [{ name: 'Size', value: '1/4"-20 x 1-1/2"' }]
            }
          },
          {
            node: {
              id: 'gid://shopify/ProductVariant/test-2-3',
              title: '5/16"-18 x 1"',
              price: { amount: '0.68', currencyCode: 'USD' },
              availableForSale: true,
              selectedOptions: [{ name: 'Size', value: '5/16"-18 x 1"' }]
            }
          },
          {
            node: {
              id: 'gid://shopify/ProductVariant/test-2-4',
              title: '3/8"-16 x 1"',
              price: { amount: '0.89', currencyCode: 'USD' },
              availableForSale: true,
              selectedOptions: [{ name: 'Size', value: '3/8"-16 x 1"' }]
            }
          }
        ]
      },
      options: [{ name: 'Size', values: ['1/4"-20 x 1"', '1/4"-20 x 1-1/2"', '5/16"-18 x 1"', '3/8"-16 x 1"'] }],
      vendor: 'Fasteners Inc',
      productType: 'Fasteners',
      tags: ['fasteners', 'bolts', 'grade-8', 'hex-cap']
    },
    extras: {
      templateType: 'quantity',
      sku: 'GR8-HEX-CAP',
      variantQuantityDiscounts: {
        '1/4"-20 x 1"': [
          { minQty: 1, maxQty: 24, priceEach: 0.45, label: '1-24' },
          { minQty: 25, maxQty: 99, priceEach: 0.42, discount: 7, label: '25-99' },
          { minQty: 100, maxQty: 499, priceEach: 0.38, discount: 16, label: '100-499' },
          { minQty: 500, maxQty: 999, priceEach: 0.34, discount: 24, label: '500-999' },
          { minQty: 1000, maxQty: null, priceEach: 0.29, discount: 36, label: '1000+' }
        ],
        '1/4"-20 x 1-1/2"': [
          { minQty: 1, maxQty: 24, priceEach: 0.52, label: '1-24' },
          { minQty: 25, maxQty: 99, priceEach: 0.48, discount: 8, label: '25-99' },
          { minQty: 100, maxQty: 499, priceEach: 0.44, discount: 15, label: '100-499' },
          { minQty: 500, maxQty: 999, priceEach: 0.39, discount: 25, label: '500-999' },
          { minQty: 1000, maxQty: null, priceEach: 0.33, discount: 37, label: '1000+' }
        ],
        '5/16"-18 x 1"': [
          { minQty: 1, maxQty: 24, priceEach: 0.68, label: '1-24' },
          { minQty: 25, maxQty: 99, priceEach: 0.63, discount: 7, label: '25-99' },
          { minQty: 100, maxQty: 499, priceEach: 0.57, discount: 16, label: '100-499' },
          { minQty: 500, maxQty: 999, priceEach: 0.51, discount: 25, label: '500-999' },
          { minQty: 1000, maxQty: null, priceEach: 0.44, discount: 35, label: '1000+' }
        ],
        '3/8"-16 x 1"': [
          { minQty: 1, maxQty: 24, priceEach: 0.89, label: '1-24' },
          { minQty: 25, maxQty: 99, priceEach: 0.82, discount: 8, label: '25-99' },
          { minQty: 100, maxQty: 499, priceEach: 0.74, discount: 17, label: '100-499' },
          { minQty: 500, maxQty: 999, priceEach: 0.66, discount: 26, label: '500-999' },
          { minQty: 1000, maxQty: null, priceEach: 0.56, discount: 37, label: '1000+' }
        ]
      },
      features: [
        'Grade 8 medium carbon alloy steel construction',
        'Minimum tensile strength: 150,000 PSI',
        'Yellow zinc chromate finish for corrosion resistance',
        'Meets or exceeds SAE J429 specifications',
        'Rolled threads for superior strength and fatigue resistance',
        'Full traceability and certifications available',
        'Made in USA from domestic materials'
      ],
      includes: [
        'Hex Cap Screws (quantity as ordered)',
        'Material certification available upon request'
      ]
    }
  }
];

// Mock power tool products for layout testing
export const MOCK_PRODUCTS: MockShopifyProduct[] = [
  ...TEST_PRODUCTS,
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
export function searchMockProducts(query: string): MockShopifyProduct[] {
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

// Get mock product by handle (returns full product with extras)
export function getMockProductByHandle(handle: string): MockShopifyProduct | null {
  return MOCK_PRODUCTS.find(p => p.node.handle === handle) || null;
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
