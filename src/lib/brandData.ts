import dewaltLogo from "@/assets/brands/dewalt.png";
import milwaukeeLogo from "@/assets/brands/milwaukee.png";
import makitaLogo from "@/assets/brands/makita.png";
import knipexLogo from "@/assets/brands/knipex.png";
import diabloLogo from "@/assets/brands/diablo.png";
import ironcladLogo from "@/assets/brands/ironclad.png";
import occidentalLogo from "@/assets/brands/occidental.png";
import dewaltHero from "@/assets/brands/dewalt-hero.jpg";
import milwaukeeHero from "@/assets/brands/milwaukee-hero.jpg";
import makitaHero from "@/assets/brands/makita-hero.jpg";

export interface BrandSeries {
  name: string;
  href: string;
}

export interface BrandCategory {
  name: string;
  href: string;
}

export interface BrandPromo {
  title: string;
  subtitle: string;
  cta: string;
  href: string;
}

export interface BrandConfig {
  slug: string;
  name: string;
  logo: string;
  heroImage: string;
  accentColor: string;
  accentHover: string;
  tagline: string;
  description: string;
  shopAllHref: string;
  quickLinks: Array<{ label: string; href: string }>;
  series: BrandSeries[];
  categories: BrandCategory[];
  promos: BrandPromo[];
  pillars: Array<{ title: string; subtitle: string }>;
}

export const brandConfigs: Record<string, BrandConfig> = {
  dewalt: {
    slug: "dewalt",
    name: "DeWalt",
    logo: dewaltLogo,
    heroImage: dewaltHero,
    accentColor: "bg-[#febd17]",
    accentHover: "hover:bg-[#e5aa14]",
    tagline: "Guaranteed Tough",
    description: "Professional-grade power tools and accessories built for the jobsite. DeWalt has been a trusted name in construction and woodworking since 1924.",
    shopAllHref: "https://www.fastenersinc.net/pages/dewalt-tools-power-tools-accessories",
    quickLinks: [
      { label: "Shop 20V MAX", href: "https://www.fastenersinc.net/pages/search-results-page?q=dewalt%2020v" },
      { label: "Shop FlexVolt", href: "https://www.fastenersinc.net/pages/search-results-page?q=dewalt%20flexvolt" },
      { label: "Shop Deals", href: "https://www.fastenersinc.net/pages/top-deals-promotions" },
      { label: "Shop All DeWalt", href: "https://www.fastenersinc.net/pages/dewalt-tools-power-tools-accessories" },
    ],
    series: [
      { name: "20V MAX", href: "https://www.fastenersinc.net/pages/search-results-page?q=dewalt%2020v%20max" },
      { name: "FLEXVOLT 60V", href: "https://www.fastenersinc.net/pages/search-results-page?q=dewalt%20flexvolt" },
      { name: "ATOMIC", href: "https://www.fastenersinc.net/pages/search-results-page?q=dewalt%20atomic" },
      { name: "XTREME 12V", href: "https://www.fastenersinc.net/pages/search-results-page?q=dewalt%20xtreme" },
      { name: "XR POWERSTACK", href: "https://www.fastenersinc.net/pages/search-results-page?q=dewalt%20powerstack" },
      { name: "ToughSystem 2.0", href: "https://www.fastenersinc.net/pages/search-results-page?q=dewalt%20toughsystem" },
    ],
    categories: [
      { name: "Drills & Drivers", href: "https://www.fastenersinc.net/pages/search-results-page?q=dewalt%20drill" },
      { name: "Saws", href: "https://www.fastenersinc.net/pages/search-results-page?q=dewalt%20saw" },
      { name: "Grinders", href: "https://www.fastenersinc.net/pages/search-results-page?q=dewalt%20grinder" },
      { name: "Nailers", href: "https://www.fastenersinc.net/pages/search-results-page?q=dewalt%20nailer" },
      { name: "Hand Tools", href: "https://www.fastenersinc.net/pages/search-results-page?q=dewalt%20hand%20tools" },
      { name: "Outdoor Power", href: "https://www.fastenersinc.net/pages/search-results-page?q=dewalt%20outdoor" },
      { name: "Storage", href: "https://www.fastenersinc.net/pages/search-results-page?q=dewalt%20storage" },
    ],
    promos: [
      { title: "Free Battery Included", subtitle: "With select 20V MAX tool or charger purchase", cta: "Shop Now", href: "https://www.fastenersinc.net/pages/dewalt-tools-power-tools-accessories" },
      { title: "More Tools For Less", subtitle: "Save on select cordless combo kits", cta: "Shop Now", href: "https://www.fastenersinc.net/pages/top-deals-promotions" },
    ],
    pillars: [
      { title: "Guaranteed Tough", subtitle: "Tools built for the jobsite" },
      { title: "Since 1924", subtitle: "A century of excellence" },
      { title: "For the Future", subtitle: "Engineered to move forward" },
      { title: "Iconic Design", subtitle: "Black & Yellow reliability" },
    ],
  },
  milwaukee: {
    slug: "milwaukee",
    name: "Milwaukee",
    logo: milwaukeeLogo,
    heroImage: milwaukeeHero,
    accentColor: "bg-[#db0032]",
    accentHover: "hover:bg-[#b8002a]",
    tagline: "Nothing But Heavy Duty",
    description: "Milwaukee Tool delivers innovative solutions for professional tradespeople. Industry-leading M18 and M12 cordless systems, hand tools, and accessories.",
    shopAllHref: "https://www.fastenersinc.net/pages/milwaukee-tools",
    quickLinks: [
      { label: "Shop M18", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20m18" },
      { label: "Shop M12", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20m12" },
      { label: "Shop Deals", href: "https://www.fastenersinc.net/pages/top-deals-promotions" },
      { label: "Shop All Milwaukee", href: "https://www.fastenersinc.net/pages/milwaukee-tools" },
    ],
    series: [
      { name: "M18 FUEL", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20m18%20fuel" },
      { name: "M12 FUEL", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20m12%20fuel" },
      { name: "MX FUEL", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20mx%20fuel" },
      { name: "PACKOUT", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20packout" },
      { name: "FORGE", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20forge" },
      { name: "ONE-KEY", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20one-key" },
    ],
    categories: [
      { name: "Drills & Drivers", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20drill" },
      { name: "Impact Wrenches", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20impact" },
      { name: "Saws", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20saw" },
      { name: "Lighting", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20light" },
      { name: "Hand Tools", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20hand%20tools" },
      { name: "Storage", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20packout" },
      { name: "Safety & PPE", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20safety" },
    ],
    promos: [
      { title: "Buy More, Save More", subtitle: "Get a FREE battery with select tool purchase", cta: "Shop Now", href: "https://www.fastenersinc.net/pages/milwaukee-tools" },
      { title: "PACKOUT Deals", subtitle: "Save on the #1 modular storage system", cta: "Shop Now", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20packout" },
    ],
    pillars: [
      { title: "Heavy Duty", subtitle: "Built for the trades" },
      { title: "Innovation", subtitle: "Leading cordless technology" },
      { title: "Productivity", subtitle: "Faster, longer runtime" },
      { title: "Durability", subtitle: "Engineered to last" },
    ],
  },
  makita: {
    slug: "makita",
    name: "Makita",
    logo: makitaLogo,
    heroImage: makitaHero,
    accentColor: "bg-[#00a0af]",
    accentHover: "hover:bg-[#008c99]",
    tagline: "Rule The Outdoors",
    description: "Makita is the innovation leader in power tools, accessories, and outdoor power equipment. The world's largest 18V cordless tool system with 325+ solutions.",
    shopAllHref: "https://www.fastenersinc.net/pages/makita-tools-makita-power-tools-accessories",
    quickLinks: [
      { label: "Shop LXT", href: "https://www.fastenersinc.net/pages/search-results-page?q=makita%20lxt" },
      { label: "Shop XGT 40V", href: "https://www.fastenersinc.net/pages/search-results-page?q=makita%20xgt" },
      { label: "Shop Deals", href: "https://www.fastenersinc.net/pages/top-deals-promotions" },
      { label: "Shop All Makita", href: "https://www.fastenersinc.net/pages/makita-tools-makita-power-tools-accessories" },
    ],
    series: [
      { name: "18V LXT", href: "https://www.fastenersinc.net/pages/search-results-page?q=makita%20lxt" },
      { name: "40V MAX XGT", href: "https://www.fastenersinc.net/pages/search-results-page?q=makita%20xgt" },
      { name: "18V X2 (36V)", href: "https://www.fastenersinc.net/pages/search-results-page?q=makita%2036v" },
      { name: "CXT 12V MAX", href: "https://www.fastenersinc.net/pages/search-results-page?q=makita%20cxt" },
      { name: "ConnectX", href: "https://www.fastenersinc.net/pages/search-results-page?q=makita%20connectx" },
      { name: "Outdoor Adventure", href: "https://www.fastenersinc.net/pages/search-results-page?q=makita%20outdoor" },
    ],
    categories: [
      { name: "Drills & Drivers", href: "https://www.fastenersinc.net/pages/search-results-page?q=makita%20drill" },
      { name: "Saws", href: "https://www.fastenersinc.net/pages/search-results-page?q=makita%20saw" },
      { name: "Grinders", href: "https://www.fastenersinc.net/pages/search-results-page?q=makita%20grinder" },
      { name: "Outdoor Power", href: "https://www.fastenersinc.net/pages/search-results-page?q=makita%20outdoor" },
      { name: "Blowers & Vacuums", href: "https://www.fastenersinc.net/pages/search-results-page?q=makita%20blower" },
      { name: "Accessories", href: "https://www.fastenersinc.net/pages/search-results-page?q=makita%20accessories" },
      { name: "Batteries", href: "https://www.fastenersinc.net/pages/search-results-page?q=makita%20battery" },
    ],
    promos: [
      { title: "Free Tool With Purchase", subtitle: "Buy a qualifying kit, get a bonus tool FREE", cta: "Shop Now", href: "https://www.fastenersinc.net/pages/makita-tools-makita-power-tools-accessories" },
      { title: "Outdoor Season Deals", subtitle: "Save on chainsaws, blowers & mowers", cta: "Shop Now", href: "https://www.fastenersinc.net/pages/search-results-page?q=makita%20outdoor" },
    ],
    pillars: [
      { title: "Innovation Leader", subtitle: "325+ cordless solutions" },
      { title: "Since 1915", subtitle: "Over a century of quality" },
      { title: "Eco Friendly", subtitle: "Zero emission outdoor tools" },
      { title: "Pro Performance", subtitle: "Built for professionals" },
    ],
  },
};

// Brands index page data
export const allBrands = [
  { slug: "dewalt", name: "DeWalt", logo: dewaltLogo, href: "/brands/dewalt" },
  { slug: "milwaukee", name: "Milwaukee", logo: milwaukeeLogo, href: "/brands/milwaukee" },
  { slug: "makita", name: "Makita", logo: makitaLogo, href: "/brands/makita" },
  { slug: "knipex", name: "Knipex", logo: knipexLogo, href: "https://www.fastenersinc.net/pages/knipex-tools-pliers" },
  { slug: "diablo", name: "Diablo", logo: diabloLogo, href: "https://www.fastenersinc.net/pages/search-results-page?collection=diablo" },
  { slug: "ironclad", name: "IronClad", logo: ironcladLogo, href: "https://www.fastenersinc.net/pages/ironclad-performance-wear-ironclad-gloves-for-professionals" },
  { slug: "occidental", name: "Occidental Leather", logo: occidentalLogo, href: "https://www.fastenersinc.net/pages/occidental-leather-tool-belt-systems" },
];
