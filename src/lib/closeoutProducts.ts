import type { ShopifyProduct } from './shopify/types';

// Helper to create a mock closeout product
function makeCloseout(id: number, title: string, vendor: string, productType: string, price: number, wasPrice: number, category: string, imageUrl: string): ShopifyProduct {
  return {
    node: {
      id: `gid://shopify/Product/closeout-${id}`,
      title,
      description: `Closeout deal on ${title}. Limited quantities available.`,
      handle: `closeout-${id}`,
      vendor,
      productType,
      tags: ['closeout', category],
      priceRange: { minVariantPrice: { amount: price.toFixed(2), currencyCode: 'USD' } },
      compareAtPriceRange: { minVariantPrice: { amount: wasPrice.toFixed(2), currencyCode: 'USD' } },
      images: { edges: [{ node: { url: imageUrl, altText: title } }] },
      variants: {
        edges: [{
          node: {
            id: `gid://shopify/ProductVariant/closeout-${id}-1`,
            title: 'Default',
            price: { amount: price.toFixed(2), currencyCode: 'USD' },
            compareAtPrice: { amount: wasPrice.toFixed(2), currencyCode: 'USD' },
            availableForSale: true,
            selectedOptions: [{ name: 'Title', value: 'Default' }],
            sku: `CLO-${id}`
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

export interface CloseoutCategory {
  id: string;
  title: string;
}

export const closeoutCategories: CloseoutCategory[] = [
  { id: 'hand-tools', title: 'Hand Tools' },
  { id: 'power-tools', title: 'Power Tools' },
  { id: 'blades-abrasives', title: 'Blades & Abrasives' },
  { id: 'levels-measures', title: 'Levels & Measures' },
  { id: 'drill-bits', title: 'Drill Bits' },
  { id: 'fasteners', title: 'Fasteners' },
  { id: 'additional', title: 'Additional Closeouts' },
];

// Generate 20 products per category
function generateCategoryProducts(cat: CloseoutCategory, startId: number): ShopifyProduct[] {
  const products: ShopifyProduct[] = [];
  const templates: Record<string, { titles: string[]; vendors: string[]; type: string }> = {
    'hand-tools': {
      titles: ['Channellock Pliers Set', 'Crescent Adjustable Wrench 10"', 'Stanley Ratcheting Screwdriver', 'Irwin Vise-Grip Locking Pliers', 'Klein Wire Strippers', 'Estwing Framing Hammer 22oz', 'Knipex Cobra Pliers 10"', 'Wera Kraftform Screwdriver Set', 'Proto Combination Wrench Set', 'Wiha Precision Screwdriver Kit', 'Snap-on Ratchet 3/8"', 'Tekton Socket Set 1/2"', 'GearWrench Flex Head Ratchet', 'Bondhus Ball End Hex Set', 'Wright Tool Box Wrench Set', 'SK Hand Tools Screwdriver Set', 'Mayhew Punch and Chisel Set', 'Wilde Tool Slip Joint Pliers', 'Williams Open End Wrench Set', 'Armstrong Combination Set'],
      vendors: ['Channellock', 'Crescent', 'Stanley', 'Irwin', 'Klein', 'Estwing', 'Knipex', 'Wera', 'Proto', 'Wiha', 'Snap-on', 'Tekton', 'GearWrench', 'Bondhus', 'Wright', 'SK', 'Mayhew', 'Wilde', 'Williams', 'Armstrong'],
      type: 'Hand Tools'
    },
    'power-tools': {
      titles: ['DeWalt 20V Drill Kit', 'Milwaukee M18 Impact Driver', 'Makita 18V Circular Saw', 'Bosch Oscillating Multi-Tool', 'Ridgid 18V Router', 'Ryobi ONE+ Jigsaw', 'Metabo SDS Rotary Hammer', 'Hilti Cordless Drill', 'Festool Plunge Saw', 'Porter-Cable Brad Nailer', 'DeWalt Angle Grinder', 'Milwaukee Band Saw', 'Makita Reciprocating Saw', 'Bosch Palm Sander', 'Ridgid Pipe Threader', 'Hitachi Miter Saw', 'Black+Decker Drill Set', 'Craftsman Impact Wrench', 'Bauer Heat Gun', 'Wen Bench Grinder'],
      vendors: ['DeWalt', 'Milwaukee', 'Makita', 'Bosch', 'Ridgid', 'Ryobi', 'Metabo', 'Hilti', 'Festool', 'Porter-Cable', 'DeWalt', 'Milwaukee', 'Makita', 'Bosch', 'Ridgid', 'Hitachi', 'Black+Decker', 'Craftsman', 'Bauer', 'Wen'],
      type: 'Power Tools'
    },
    'blades-abrasives': {
      titles: ['Diablo 7-1/4" Framing Blade', 'Norton Grinding Wheel 6"', 'Lenox Bi-Metal Recip Blades 5pk', 'DeWalt Jigsaw Blade Set', 'Bosch Multi-Tool Blades 10pk', '3M Sanding Disc Assortment', 'Forrest Woodworker II 10"', 'Freud Box Joint Blade Set', 'Milwaukee Sawzall Blade Set', 'Makita Diamond Blade 4-1/2"', 'Dremel Cut-Off Wheels 5pk', 'Norton Flap Disc 4-1/2"', 'Walter Grinding Disc 5"', 'Pferd Cut-Off Wheel 6"', 'Weiler Wire Wheel 4"', 'Osborn Crimped Wire Cup', 'Sait Metal Cutting Disc', 'CGW Flap Disc 40 Grit', 'Klingspor Sanding Belt Set', 'VSM Ceramic Sanding Disc'],
      vendors: ['Diablo', 'Norton', 'Lenox', 'DeWalt', 'Bosch', '3M', 'Forrest', 'Freud', 'Milwaukee', 'Makita', 'Dremel', 'Norton', 'Walter', 'Pferd', 'Weiler', 'Osborn', 'Sait', 'CGW', 'Klingspor', 'VSM'],
      type: 'Blades & Abrasives'
    },
    'levels-measures': {
      titles: ['Stabila 48" Box Level', 'Stanley FatMax Tape 25\'', 'Empire True Blue 24" Level', 'Milwaukee REDSTICK Level 48"', 'Johnson Laser Level Kit', 'DeWalt Self-Leveling Laser', 'Bosch Laser Measure 165\'', 'Keson Chalk Line Reel', 'Swanson Speed Square 7"', 'Starrett Combination Square', 'Mitutoyo Digital Caliper 6"', 'Fowler Micrometer Set', 'Brown & Sharpe Depth Gauge', 'SPI Indicator Test Set', 'Lufkin Engineer Tape 100\'', 'Irwin Strait-Line Chalk Reel', 'CST/Berger Transit Level', 'Pacific Laser PLS 5G', 'Kapro Torpedo Level 9"', 'Checkpoint Ultra-Mag Level'],
      vendors: ['Stabila', 'Stanley', 'Empire', 'Milwaukee', 'Johnson', 'DeWalt', 'Bosch', 'Keson', 'Swanson', 'Starrett', 'Mitutoyo', 'Fowler', 'Brown & Sharpe', 'SPI', 'Lufkin', 'Irwin', 'CST/Berger', 'Pacific Laser', 'Kapro', 'Checkpoint'],
      type: 'Levels & Measures'
    },
    'drill-bits': {
      titles: ['DeWalt Titanium Drill Bit Set 21pc', 'Milwaukee Cobalt Drill Bits 15pc', 'Bosch SDS-Plus Bit Set', 'Irwin Speedbor Spade Bits 6pc', 'Makita SDS-MAX Bit 3/4"', 'Diablo Carbide Hole Saw Set', 'Klein Step Drill Bit 1/8"-1/2"', 'Norseman Hi-Moly Drill Set', 'Viking Drill SP Bit Set', 'Chicago-Latrobe Cobalt Set', 'Greenlee Step Drill Bit', 'Lenox Hole Saw Kit Plumber', 'Morse Bi-Metal Hole Saw', 'Starrett Diamond Grit Saw', 'Champion Annular Cutter Set', 'Hougen Rotabroach Cutter', 'Jancy Slugger Bit 1"', 'Uni-Bit Step Drill Set', 'Relton Hammer Drill Bit Set', 'SDS-Plus Masonry Bit Set 7pc'],
      vendors: ['DeWalt', 'Milwaukee', 'Bosch', 'Irwin', 'Makita', 'Diablo', 'Klein', 'Norseman', 'Viking', 'Chicago-Latrobe', 'Greenlee', 'Lenox', 'Morse', 'Starrett', 'Champion', 'Hougen', 'Jancy', 'Uni-Bit', 'Relton', 'Generic'],
      type: 'Drill Bits'
    },
    'fasteners': {
      titles: ['Grade 8 Hex Bolt Assortment', 'Stainless Steel Lag Screw Box', '#10 Drywall Screws 5lb Box', 'Concrete Wedge Anchors 50pk', 'Toggle Bolt Assortment Kit', 'Carriage Bolt Zinc 100pk', 'Self-Drilling Tek Screws 500pk', 'Split Lock Washers 1000pk', 'Nylon Insert Lock Nuts 250pk', 'Flange Bolts Grade 8 50pk', 'Structural Bolts A325 25pk', 'U-Bolt Assortment Kit', 'Eye Bolt Stainless 10pk', 'J-Bolt Anchor Set 25pk', 'Hanger Bolt Combo Pack', 'Threaded Rod Zinc 3/8"-16', 'Coupling Nut Zinc 50pk', 'Flat Washer USS 500pk', 'Socket Head Cap Screws 100pk', 'Set Screw Assortment Kit'],
      vendors: ['Intercorp', 'Hillman', 'ITW', 'Simpson', 'Powers', 'Nucor', 'Fastenal', 'Brighton-Best', 'Earnest', 'Porteous', 'Nucor', 'Chicago Hardware', 'National', 'Hampton', 'Monroe', 'All-Thread', 'Foreverbolt', 'Earnest', 'Holo-Krome', 'Alloy'],
      type: 'Fasteners'
    },
    'additional': {
      titles: ['Safety Glasses Clear 12pk', 'Work Gloves Leather XL 6pk', 'Hard Hat White Ratchet', 'Knee Pads Professional Gel', 'Ear Plugs Corded 200pk', 'Hi-Vis Safety Vest Class 2', 'Tool Belt 12-Pocket Leather', 'Extension Cord 100ft 12/3', 'Shop Vac 10 Gallon', 'LED Work Light Tripod', 'Tarps Heavy Duty 12x20', 'Bungee Cord Assortment', 'Cable Ties Black 1000pk', 'Spray Paint Flat Black 6pk', 'Duct Tape Silver 6pk', 'WD-40 Industrial 1 Gallon', 'Gorilla Glue Original 18oz', 'Sawhorses Folding Pair', 'Clamp Set 6-Piece Bar', 'Magnetic Parts Tray Set'],
      vendors: ['3M', 'Wells Lamont', 'MSA', 'Ergodyne', 'Moldex', 'Radians', 'Occidental', 'Southwire', 'Ridgid', 'Milwaukee', 'Erickson', 'Keeper', 'Thomas & Betts', 'Rust-Oleum', 'Nashua', 'WD-40', 'Gorilla', 'Stanley', 'Bessey', 'Titan'],
      type: 'General'
    }
  };

  const t = templates[cat.id] || templates['additional'];
  for (let i = 0; i < 20; i++) {
    const price = Math.round((15 + Math.random() * 280) * 100) / 100;
    const wasPrice = Math.round(price * (1.3 + Math.random() * 0.5) * 100) / 100;
    products.push(makeCloseout(startId + i, t.titles[i], t.vendors[i], t.type, price, wasPrice, cat.id, img(startId + i)));
  }
  return products;
}

// All closeout products, keyed by category
export const CLOSEOUT_PRODUCTS: Record<string, ShopifyProduct[]> = {};
closeoutCategories.forEach((cat, idx) => {
  CLOSEOUT_PRODUCTS[cat.id] = generateCategoryProducts(cat, idx * 20 + 1);
});

// Flat list of all closeout products
export const ALL_CLOSEOUT_PRODUCTS: ShopifyProduct[] = Object.values(CLOSEOUT_PRODUCTS).flat();
