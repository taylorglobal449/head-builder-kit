import type { ShopifyProduct } from './shopify/types';

function makeNewProduct(id: number, title: string, vendor: string, productType: string, price: number, category: string, imageUrl: string): ShopifyProduct {
  return {
    node: {
      id: `gid://shopify/Product/new-${id}`,
      title,
      description: `New arrival: ${title}. Just released and ready to ship.`,
      handle: `new-product-${id}`,
      vendor,
      productType,
      tags: ['new', 'new-arrival', category],
      priceRange: { minVariantPrice: { amount: price.toFixed(2), currencyCode: 'USD' } },
      compareAtPriceRange: null,
      images: { edges: [{ node: { url: imageUrl, altText: title } }] },
      variants: {
        edges: [{
          node: {
            id: `gid://shopify/ProductVariant/new-${id}-1`,
            title: 'Default',
            price: { amount: price.toFixed(2), currencyCode: 'USD' },
            compareAtPrice: null,
            availableForSale: true,
            selectedOptions: [{ name: 'Title', value: 'Default' }],
            sku: `NEW-${id}`
          }
        }]
      },
      options: [{ name: 'Title', values: ['Default'] }]
    }
  };
}

const imgs = [
  'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1426927308491-6380b6a9936f?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1586864387789-628af9feed72?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500&h=500&fit=crop',
];

const img = (i: number) => imgs[i % imgs.length];

export interface NewProductCategory {
  id: string;
  title: string;
}

export const newProductCategories: NewProductCategory[] = [
  { id: 'just-arrived', title: 'Just Arrived' },
  { id: 'new-power-tools', title: 'New Power Tools' },
  { id: 'new-hand-tools', title: 'New Hand Tools' },
  { id: 'new-outdoor', title: 'New Outdoor Equipment' },
  { id: 'new-accessories', title: 'New Accessories' },
  { id: 'new-safety', title: 'New Safety & Workwear' },
];

function generateCategoryProducts(cat: NewProductCategory, startId: number): ShopifyProduct[] {
  const products: ShopifyProduct[] = [];
  const templates: Record<string, { titles: string[]; vendors: string[]; type: string }> = {
    'just-arrived': {
      titles: ['Milwaukee M18 FUEL 2-Tool Combo Kit', 'DeWalt XTREME 12V Impact Driver', 'Makita 40V XGT Circular Saw', 'Bosch ProFactor 18V SDS-MAX Hammer', 'Klein Digital Clamp Meter', 'Knipex TwinGrip Slip Joint Pliers', 'Wera Joker Ratcheting Wrench Set', 'Channellock SpeedGrip Pliers', 'Diablo Carbide Recip Blade Set', 'Stanley FATMAX 35ft Tape', 'Ridgid 18V Subcompact Drill', 'Festool SYS3 Systainer', 'Hilti Nuron SIW 6AT Impact', 'Metabo HPT MultiVolt Grinder', 'Ryobi 40V Brushless Blower', 'Proto Anti-Vibe Ball Peen', 'Snap-on Digital Torque Wrench', 'Irwin QUICK-GRIP XP Clamp', 'Empire UltraView LED Level', 'Estwing Ultra Series Hammer'],
      vendors: ['Milwaukee', 'DeWalt', 'Makita', 'Bosch', 'Klein', 'Knipex', 'Wera', 'Channellock', 'Diablo', 'Stanley', 'Ridgid', 'Festool', 'Hilti', 'Metabo HPT', 'Ryobi', 'Proto', 'Snap-on', 'Irwin', 'Empire', 'Estwing'],
      type: 'Tools'
    },
    'new-power-tools': {
      titles: ['Milwaukee M18 FUEL Hammer Drill Gen 4', 'DeWalt 20V MAX XR Brushless Router', 'Makita 40V XGT Reciprocating Saw', 'Bosch 18V EC Planer', 'Ridgid 18V Octane Mega Drill', 'Ryobi ONE+ HP Brushless Jigsaw', 'Metabo 18V LTX Angle Grinder', 'Hilti SFC 22-A Drill Driver', 'Festool TPC 18/4 Cordless Drill', 'Porter-Cable 20V Oscillating Tool', 'Milwaukee M12 FUEL Ratchet 3/8"', 'DeWalt ATOMIC 20V Compact Saw', 'Makita 18V LXT Band Saw', 'Bosch 12V Rotary Tool', 'Ridgid Octane Circ Saw', 'Craftsman V20 Impact Driver', 'Black+Decker 20V Sander', 'Wen Variable Speed Scroll Saw', 'Bauer 20V Hammer Drill', 'SKIL PWR CORE 20 Drill Driver'],
      vendors: ['Milwaukee', 'DeWalt', 'Makita', 'Bosch', 'Ridgid', 'Ryobi', 'Metabo', 'Hilti', 'Festool', 'Porter-Cable', 'Milwaukee', 'DeWalt', 'Makita', 'Bosch', 'Ridgid', 'Craftsman', 'Black+Decker', 'Wen', 'Bauer', 'SKIL'],
      type: 'Power Tools'
    },
    'new-hand-tools': {
      titles: ['Knipex Pliers Wrench 10" Chrome', 'Wera Zyklop Speed Ratchet 1/2"', 'Klein Journeyman Pliers Set', 'Channellock CODE BLUE Pliers', 'Proto Industrial Pry Bar Set', 'Snap-on Flank Drive Wrench Set', 'Tekton 3/8" Drive Socket Set', 'GearWrench 120XP Ratchet', 'Williams Supercombo Wrench Set', 'Wright Grip 2.0 Wrench Set', 'Wiha Insulated Screwdriver Kit', 'Bondhus ProGuard Hex Key Set', 'SK Professional Ratchet 1/4"', 'Armstrong Combination Set SAE', 'Wilde Angle Nose Pliers 6.5"', 'Crescent X6 Pass-Thru Ratchet', 'Stanley FatMax Chisel Set', 'Irwin Marples Chisel Set', 'Mayhew Pro Pry Bar 3pc', 'Estwing Sure Strike Hammer'],
      vendors: ['Knipex', 'Wera', 'Klein', 'Channellock', 'Proto', 'Snap-on', 'Tekton', 'GearWrench', 'Williams', 'Wright', 'Wiha', 'Bondhus', 'SK', 'Armstrong', 'Wilde', 'Crescent', 'Stanley', 'Irwin', 'Mayhew', 'Estwing'],
      type: 'Hand Tools'
    },
    'new-outdoor': {
      titles: ['Milwaukee M18 FUEL Chainsaw 16"', 'DeWalt 60V FlexVolt Blower', 'Makita 40V XGT String Trimmer', 'Ryobi 40V Brushless Mower 21"', 'EGO Power+ 56V Hedge Trimmer', 'Stihl MSA 220 C Battery Saw', 'Husqvarna 540i XP Chainsaw', 'ECHO 58V Leaf Blower', 'Greenworks 80V Snow Blower', 'Milwaukee M18 FUEL Pole Saw', 'DeWalt 20V Pruner Shears', 'Makita 18V Grass Shear', 'Black+Decker 40V Edger', 'Worx 20V Trimmer/Edger', 'Sun Joe 48V Mower 17"', 'Toro 60V Recycler Mower', 'Kobalt 80V Blower', 'Craftsman V60 Chainsaw', 'SKIL PWR CORE 40 Mower', 'Oregon 40V Pole Saw'],
      vendors: ['Milwaukee', 'DeWalt', 'Makita', 'Ryobi', 'EGO', 'Stihl', 'Husqvarna', 'ECHO', 'Greenworks', 'Milwaukee', 'DeWalt', 'Makita', 'Black+Decker', 'Worx', 'Sun Joe', 'Toro', 'Kobalt', 'Craftsman', 'SKIL', 'Oregon'],
      type: 'Outdoor Equipment'
    },
    'new-accessories': {
      titles: ['DeWalt ToughSystem 2.0 Large Box', 'Milwaukee PACKOUT Rolling Tool Box', 'Makita Interlocking Tool Case', 'Bosch L-BOXX Carrying Case System', 'Diablo 10" Table Saw Blade 60T', 'Freud Premier Fusion Blade 12"', 'Lenox Gold Recip Blade 12" 10pk', 'Norton Quantum3 Grinding Wheel', '3M Cubitron II Cut-Off Wheel', 'Irwin SPEEDBOR MAX Spade Bit Set', 'DeWalt MAXFIT Driving Bit Set 35pc', 'Milwaukee SHOCKWAVE Impact Set', 'Makita IMPACT GOLD Bit Set', 'Bosch Daredevil Spade Bit Set', 'Klein Hollow Shaft Nut Driver Set', 'Wera Bit-Check BC 30 Set', 'Knipex Tool Tethering Adapters', 'Channellock Tool Roll 5-Pocket', 'Stanley FatMax Tool Bag 20"', 'Veto Pro Pac OT-XL Tool Bag'],
      vendors: ['DeWalt', 'Milwaukee', 'Makita', 'Bosch', 'Diablo', 'Freud', 'Lenox', 'Norton', '3M', 'Irwin', 'DeWalt', 'Milwaukee', 'Makita', 'Bosch', 'Klein', 'Wera', 'Knipex', 'Channellock', 'Stanley', 'Veto Pro Pac'],
      type: 'Accessories'
    },
    'new-safety': {
      titles: ['3M SecureFit Safety Glasses 400', 'Ergodyne ProFlex 18" Knee Pads', 'MSA V-Gard Full Brim Hard Hat', 'Mechanix M-Pact Impact Gloves', 'Honeywell Howard Leight Ear Muffs', 'Carhartt Washed Duck Work Pants', 'Timberland PRO Boondock Boots 8"', 'Red Wing Iron Ranger Boots', 'Duluth Trading Fire Hose Pants', 'Caterpillar Second Shift Boots', 'Pyramex I-Force Safety Goggles', 'MCR Safety Predator Gloves', 'Radians Mirage Safety Glasses', 'PIP MaxiFlex Cut Gloves', 'Ironclad Heatworx Gloves', 'Bulwark FR Coveralls', 'Tyndale FRC Big Bill Pants', 'National Safety Apparel Arc Kit', 'Klein Tradesman Pro Backpack', 'Ergodyne Chill-Its Cooling Towel'],
      vendors: ['3M', 'Ergodyne', 'MSA', 'Mechanix', 'Honeywell', 'Carhartt', 'Timberland PRO', 'Red Wing', 'Duluth Trading', 'Caterpillar', 'Pyramex', 'MCR Safety', 'Radians', 'PIP', 'Ironclad', 'Bulwark', 'Tyndale', 'NSA', 'Klein', 'Ergodyne'],
      type: 'Safety & Workwear'
    }
  };

  const t = templates[cat.id] || templates['just-arrived'];
  for (let i = 0; i < 20; i++) {
    const price = Math.round((25 + Math.random() * 400) * 100) / 100;
    products.push(makeNewProduct(startId + i, t.titles[i], t.vendors[i], t.type, price, cat.id, img(startId + i)));
  }
  return products;
}

export const NEW_PRODUCTS: Record<string, ShopifyProduct[]> = {};
newProductCategories.forEach((cat, idx) => {
  NEW_PRODUCTS[cat.id] = generateCategoryProducts(cat, idx * 20 + 1);
});

export const ALL_NEW_PRODUCTS: ShopifyProduct[] = Object.values(NEW_PRODUCTS).flat();
