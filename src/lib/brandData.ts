import dewaltLogo from "@/assets/brands/dewalt.png";
import milwaukeeLogo from "@/assets/brands/milwaukee.png";
import makitaLogo from "@/assets/brands/makita.png";
import knipexLogo from "@/assets/brands/knipex.png";
import diabloLogo from "@/assets/brands/diablo.png";
import ironcladLogo from "@/assets/brands/ironclad.png";
import occidentalLogo from "@/assets/brands/occidental.png";
import kleinLogo from "@/assets/brands/klein.png";
import dewaltHero from "@/assets/brands/dewalt-hero.jpg";
import milwaukeeHero from "@/assets/brands/milwaukee-hero.jpg";
import makitaHero from "@/assets/brands/makita-hero.jpg";
import knipexHero from "@/assets/brands/knipex-hero.jpg";
import diabloHero from "@/assets/brands/diablo-hero.jpg";
import ironcladHero from "@/assets/brands/ironclad-hero.jpg";
import occidentalHero from "@/assets/brands/occidental-hero.jpg";
import kleinHero from "@/assets/brands/klein-hero.jpg";

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
  "klein-tools": {
    slug: "klein-tools",
    name: "Klein Tools",
    logo: kleinLogo,
    heroImage: kleinHero,
    accentColor: "bg-[#f7941d]",
    accentHover: "hover:bg-[#d97e18]",
    tagline: "For Professionals Since 1857",
    description: "Klein Tools manufactures professional-grade hand tools for electricians, linemen, and tradespeople. American-made quality trusted by professionals for over 165 years.",
    shopAllHref: "https://www.fastenersinc.net/pages/klein-tools",
    quickLinks: [
      { label: "Shop Pliers", href: "https://www.fastenersinc.net/pages/search-results-page?q=klein%20pliers" },
      { label: "Shop Testers", href: "https://www.fastenersinc.net/pages/search-results-page?q=klein%20tester" },
      { label: "Shop Deals", href: "https://www.fastenersinc.net/pages/top-deals-promotions" },
      { label: "Shop All Klein", href: "https://www.fastenersinc.net/pages/klein-tools" },
    ],
    series: [
      { name: "Pliers", href: "https://www.fastenersinc.net/pages/search-results-page?q=klein%20pliers" },
      { name: "Screwdrivers", href: "https://www.fastenersinc.net/pages/search-results-page?q=klein%20screwdriver" },
      { name: "Wire Strippers", href: "https://www.fastenersinc.net/pages/search-results-page?q=klein%20wire%20stripper" },
      { name: "Testers & Meters", href: "https://www.fastenersinc.net/pages/search-results-page?q=klein%20tester" },
      { name: "Insulated Tools", href: "https://www.fastenersinc.net/pages/search-results-page?q=klein%20insulated" },
      { name: "Tool Bags", href: "https://www.fastenersinc.net/pages/search-results-page?q=klein%20bag" },
    ],
    categories: [
      { name: "Pliers", href: "https://www.fastenersinc.net/pages/search-results-page?q=klein%20pliers" },
      { name: "Screwdrivers & Nut Drivers", href: "https://www.fastenersinc.net/pages/search-results-page?q=klein%20screwdriver" },
      { name: "Wire Strippers & Cutters", href: "https://www.fastenersinc.net/pages/search-results-page?q=klein%20wire%20stripper" },
      { name: "Electrical Testers", href: "https://www.fastenersinc.net/pages/search-results-page?q=klein%20tester" },
      { name: "Insulated Tools", href: "https://www.fastenersinc.net/pages/search-results-page?q=klein%20insulated" },
      { name: "Tool Storage", href: "https://www.fastenersinc.net/pages/search-results-page?q=klein%20storage" },
      { name: "Conduit Tools", href: "https://www.fastenersinc.net/pages/search-results-page?q=klein%20conduit" },
    ],
    promos: [
      { title: "Electrician Essentials", subtitle: "Top-selling pliers, strippers & testers in one kit", cta: "Shop Now", href: "https://www.fastenersinc.net/pages/klein-tools" },
      { title: "Insulated Tool Safety", subtitle: "1000V rated tools for live electrical work", cta: "Shop Now", href: "https://www.fastenersinc.net/pages/search-results-page?q=klein%20insulated" },
    ],
    pillars: [
      { title: "Since 1857", subtitle: "165+ years of quality" },
      { title: "American Made", subtitle: "Manufactured in the USA" },
      { title: "For Electricians", subtitle: "Built for the trades" },
      { title: "Pro Grade", subtitle: "Trusted by professionals" },
    ],
  },
  knipex: {
    slug: "knipex",
    name: "Knipex",
    logo: knipexLogo,
    heroImage: knipexHero,
    accentColor: "bg-[#003d7c]",
    accentHover: "hover:bg-[#002d5c]",
    tagline: "German Precision Pliers",
    description: "KNIPEX is the world's leading manufacturer of professional pliers. Made in Germany since 1882, KNIPEX tools are engineered for maximum performance and durability.",
    shopAllHref: "https://www.fastenersinc.net/pages/knipex-tools-pliers",
    quickLinks: [
      { label: "Shop Pliers", href: "https://www.fastenersinc.net/pages/search-results-page?q=knipex%20pliers" },
      { label: "Shop Cutters", href: "https://www.fastenersinc.net/pages/search-results-page?q=knipex%20cutter" },
      { label: "Shop Deals", href: "https://www.fastenersinc.net/pages/top-deals-promotions" },
      { label: "Shop All Knipex", href: "https://www.fastenersinc.net/pages/knipex-tools-pliers" },
    ],
    series: [
      { name: "Cobra", href: "https://www.fastenersinc.net/pages/search-results-page?q=knipex%20cobra" },
      { name: "Pliers Wrench", href: "https://www.fastenersinc.net/pages/search-results-page?q=knipex%20pliers%20wrench" },
      { name: "TwinGrip", href: "https://www.fastenersinc.net/pages/search-results-page?q=knipex%20twingrip" },
      { name: "Diagonal Cutters", href: "https://www.fastenersinc.net/pages/search-results-page?q=knipex%20diagonal" },
      { name: "Insulated VDE", href: "https://www.fastenersinc.net/pages/search-results-page?q=knipex%20vde" },
      { name: "Needle Nose", href: "https://www.fastenersinc.net/pages/search-results-page?q=knipex%20needle%20nose" },
    ],
    categories: [
      { name: "Combination Pliers", href: "https://www.fastenersinc.net/pages/search-results-page?q=knipex%20combination" },
      { name: "Water Pump Pliers", href: "https://www.fastenersinc.net/pages/search-results-page?q=knipex%20cobra" },
      { name: "Cutting Pliers", href: "https://www.fastenersinc.net/pages/search-results-page?q=knipex%20cutting" },
      { name: "Insulated Tools", href: "https://www.fastenersinc.net/pages/search-results-page?q=knipex%20insulated" },
      { name: "Circlip Pliers", href: "https://www.fastenersinc.net/pages/search-results-page?q=knipex%20circlip" },
      { name: "Pliers Sets", href: "https://www.fastenersinc.net/pages/search-results-page?q=knipex%20set" },
    ],
    promos: [
      { title: "Cobra Pliers", subtitle: "The world's best water pump pliers — push button adjustment", cta: "Shop Now", href: "https://www.fastenersinc.net/pages/search-results-page?q=knipex%20cobra" },
      { title: "Pliers Wrench", subtitle: "Replaces your wrench — smooth jaw, no marring", cta: "Shop Now", href: "https://www.fastenersinc.net/pages/search-results-page?q=knipex%20pliers%20wrench" },
    ],
    pillars: [
      { title: "Made in Germany", subtitle: "Precision engineered" },
      { title: "Since 1882", subtitle: "140+ years of expertise" },
      { title: "World Leader", subtitle: "#1 in professional pliers" },
      { title: "Innovation", subtitle: "Patented designs" },
    ],
  },
  occidental: {
    slug: "occidental",
    name: "Occidental Leather",
    logo: occidentalLogo,
    heroImage: occidentalHero,
    accentColor: "bg-[#8b4513]",
    accentHover: "hover:bg-[#6d350f]",
    tagline: "The Finest Tool Belt Systems",
    description: "Occidental Leather manufactures the finest tool belt systems in the world. Handcrafted in the USA from premium leather with unmatched quality and durability.",
    shopAllHref: "https://www.fastenersinc.net/pages/occidental-leather-tool-belt-systems",
    quickLinks: [
      { label: "Shop Tool Belts", href: "https://www.fastenersinc.net/pages/search-results-page?q=occidental%20belt" },
      { label: "Shop Pouches", href: "https://www.fastenersinc.net/pages/search-results-page?q=occidental%20pouch" },
      { label: "Shop Deals", href: "https://www.fastenersinc.net/pages/top-deals-promotions" },
      { label: "Shop All Occidental", href: "https://www.fastenersinc.net/pages/occidental-leather-tool-belt-systems" },
    ],
    series: [
      { name: "FatLip", href: "https://www.fastenersinc.net/pages/search-results-page?q=occidental%20fatlip" },
      { name: "Pro Framer", href: "https://www.fastenersinc.net/pages/search-results-page?q=occidental%20framer" },
      { name: "Adjust-to-Fit", href: "https://www.fastenersinc.net/pages/search-results-page?q=occidental%20adjust" },
      { name: "SuspendaVest", href: "https://www.fastenersinc.net/pages/search-results-page?q=occidental%20suspendavest" },
      { name: "Stronghold", href: "https://www.fastenersinc.net/pages/search-results-page?q=occidental%20stronghold" },
      { name: "Nylon & Industrial", href: "https://www.fastenersinc.net/pages/search-results-page?q=occidental%20nylon" },
    ],
    categories: [
      { name: "Tool Belt Sets", href: "https://www.fastenersinc.net/pages/search-results-page?q=occidental%20belt%20set" },
      { name: "Tool Pouches", href: "https://www.fastenersinc.net/pages/search-results-page?q=occidental%20pouch" },
      { name: "Suspenders & Vests", href: "https://www.fastenersinc.net/pages/search-results-page?q=occidental%20suspender" },
      { name: "Tool Bags", href: "https://www.fastenersinc.net/pages/search-results-page?q=occidental%20bag" },
      { name: "Accessories", href: "https://www.fastenersinc.net/pages/search-results-page?q=occidental%20accessories" },
      { name: "Belts & Liners", href: "https://www.fastenersinc.net/pages/search-results-page?q=occidental%20belt" },
    ],
    promos: [
      { title: "Pro Framer Sets", subtitle: "Complete framing tool belt systems for professionals", cta: "Shop Now", href: "https://www.fastenersinc.net/pages/search-results-page?q=occidental%20framer" },
      { title: "Premium Leather Pouches", subtitle: "Handcrafted pouches that last a lifetime", cta: "Shop Now", href: "https://www.fastenersinc.net/pages/search-results-page?q=occidental%20pouch" },
    ],
    pillars: [
      { title: "Handcrafted", subtitle: "Made in the USA" },
      { title: "Premium Leather", subtitle: "Finest materials" },
      { title: "Lifetime Quality", subtitle: "Built to last" },
      { title: "Pro Choice", subtitle: "Trusted by framers" },
    ],
  },
  diablo: {
    slug: "diablo",
    name: "Diablo",
    logo: diabloLogo,
    heroImage: diabloHero,
    accentColor: "bg-[#cc0000]",
    accentHover: "hover:bg-[#a30000]",
    tagline: "Cut Everything",
    description: "Diablo produces high-performance cutting tools, abrasives, and power tool accessories. Engineered for speed, precision, and long life across all materials.",
    shopAllHref: "https://www.fastenersinc.net/pages/search-results-page?collection=diablo",
    quickLinks: [
      { label: "Shop Saw Blades", href: "https://www.fastenersinc.net/pages/search-results-page?q=diablo%20saw%20blade" },
      { label: "Shop Drill Bits", href: "https://www.fastenersinc.net/pages/search-results-page?q=diablo%20drill%20bit" },
      { label: "Shop Deals", href: "https://www.fastenersinc.net/pages/top-deals-promotions" },
      { label: "Shop All Diablo", href: "https://www.fastenersinc.net/pages/search-results-page?collection=diablo" },
    ],
    series: [
      { name: "Circular Saw Blades", href: "https://www.fastenersinc.net/pages/search-results-page?q=diablo%20circular" },
      { name: "Reciprocating Blades", href: "https://www.fastenersinc.net/pages/search-results-page?q=diablo%20reciprocating" },
      { name: "Hole Saws", href: "https://www.fastenersinc.net/pages/search-results-page?q=diablo%20hole%20saw" },
      { name: "Jigsaw Blades", href: "https://www.fastenersinc.net/pages/search-results-page?q=diablo%20jigsaw" },
      { name: "Drill Bits", href: "https://www.fastenersinc.net/pages/search-results-page?q=diablo%20drill%20bit" },
      { name: "Abrasives", href: "https://www.fastenersinc.net/pages/search-results-page?q=diablo%20abrasive" },
    ],
    categories: [
      { name: "Saw Blades", href: "https://www.fastenersinc.net/pages/search-results-page?q=diablo%20saw%20blade" },
      { name: "Drill Bits", href: "https://www.fastenersinc.net/pages/search-results-page?q=diablo%20drill%20bit" },
      { name: "Hole Saws", href: "https://www.fastenersinc.net/pages/search-results-page?q=diablo%20hole%20saw" },
      { name: "Recip Blades", href: "https://www.fastenersinc.net/pages/search-results-page?q=diablo%20reciprocating" },
      { name: "Sanding Discs", href: "https://www.fastenersinc.net/pages/search-results-page?q=diablo%20sanding" },
      { name: "Router Bits", href: "https://www.fastenersinc.net/pages/search-results-page?q=diablo%20router" },
    ],
    promos: [
      { title: "Demo Demon Blades", subtitle: "The fastest cutting recip blades on the market", cta: "Shop Now", href: "https://www.fastenersinc.net/pages/search-results-page?q=diablo%20demo%20demon" },
      { title: "TiCo Carbide Blades", subtitle: "Up to 50X longer life than standard blades", cta: "Shop Now", href: "https://www.fastenersinc.net/pages/search-results-page?q=diablo%20carbide" },
    ],
    pillars: [
      { title: "Performance", subtitle: "Fastest cuts guaranteed" },
      { title: "Durability", subtitle: "Up to 50X longer life" },
      { title: "Precision", subtitle: "Clean, accurate cuts" },
      { title: "Innovation", subtitle: "Patented tooth designs" },
    ],
  },
  ironclad: {
    slug: "ironclad",
    name: "IronClad",
    logo: ironcladLogo,
    heroImage: ironcladHero,
    accentColor: "bg-[#f26522]",
    accentHover: "hover:bg-[#d4571d]",
    tagline: "Performance Work Gloves",
    description: "IronClad manufactures the most advanced performance work gloves and safety gear for professionals. Designed for every trade and application.",
    shopAllHref: "https://www.fastenersinc.net/pages/ironclad-performance-wear-ironclad-gloves-for-professionals",
    quickLinks: [
      { label: "Shop Work Gloves", href: "https://www.fastenersinc.net/pages/search-results-page?q=ironclad%20gloves" },
      { label: "Shop Safety", href: "https://www.fastenersinc.net/pages/search-results-page?q=ironclad%20safety" },
      { label: "Shop Deals", href: "https://www.fastenersinc.net/pages/top-deals-promotions" },
      { label: "Shop All IronClad", href: "https://www.fastenersinc.net/pages/ironclad-performance-wear-ironclad-gloves-for-professionals" },
    ],
    series: [
      { name: "General Utility", href: "https://www.fastenersinc.net/pages/search-results-page?q=ironclad%20general%20utility" },
      { name: "Heavy Utility", href: "https://www.fastenersinc.net/pages/search-results-page?q=ironclad%20heavy%20utility" },
      { name: "Impact", href: "https://www.fastenersinc.net/pages/search-results-page?q=ironclad%20impact" },
      { name: "Cut Resistant", href: "https://www.fastenersinc.net/pages/search-results-page?q=ironclad%20cut%20resistant" },
      { name: "Cold Condition", href: "https://www.fastenersinc.net/pages/search-results-page?q=ironclad%20cold" },
      { name: "Heatworx", href: "https://www.fastenersinc.net/pages/search-results-page?q=ironclad%20heatworx" },
    ],
    categories: [
      { name: "Work Gloves", href: "https://www.fastenersinc.net/pages/search-results-page?q=ironclad%20work%20gloves" },
      { name: "Impact Gloves", href: "https://www.fastenersinc.net/pages/search-results-page?q=ironclad%20impact" },
      { name: "Cut Resistant", href: "https://www.fastenersinc.net/pages/search-results-page?q=ironclad%20cut" },
      { name: "Cold Weather", href: "https://www.fastenersinc.net/pages/search-results-page?q=ironclad%20cold" },
      { name: "Heat Resistant", href: "https://www.fastenersinc.net/pages/search-results-page?q=ironclad%20heat" },
      { name: "Touchscreen", href: "https://www.fastenersinc.net/pages/search-results-page?q=ironclad%20touchscreen" },
    ],
    promos: [
      { title: "General Utility Gloves", subtitle: "The original performance work glove — all-purpose protection", cta: "Shop Now", href: "https://www.fastenersinc.net/pages/search-results-page?q=ironclad%20general%20utility" },
      { title: "Winter Work Gloves", subtitle: "Stay warm and protected in extreme cold", cta: "Shop Now", href: "https://www.fastenersinc.net/pages/search-results-page?q=ironclad%20cold" },
    ],
    pillars: [
      { title: "Performance", subtitle: "Engineered protection" },
      { title: "Comfort", subtitle: "All-day wearability" },
      { title: "Durability", subtitle: "Built to last" },
      { title: "Innovation", subtitle: "Task-specific design" },
    ],
  },
};

// Brands index page data
export const allBrands = [
  { slug: "dewalt", name: "DeWalt", logo: dewaltLogo, href: "/brands/dewalt" },
  { slug: "milwaukee", name: "Milwaukee", logo: milwaukeeLogo, href: "/brands/milwaukee" },
  { slug: "makita", name: "Makita", logo: makitaLogo, href: "/brands/makita" },
  { slug: "klein-tools", name: "Klein Tools", logo: kleinLogo, href: "/brands/klein-tools" },
  { slug: "knipex", name: "Knipex", logo: knipexLogo, href: "/brands/knipex" },
  { slug: "occidental", name: "Occidental Leather", logo: occidentalLogo, href: "/brands/occidental" },
  { slug: "diablo", name: "Diablo", logo: diabloLogo, href: "/brands/diablo" },
  { slug: "ironclad", name: "IronClad", logo: ironcladLogo, href: "/brands/ironclad" },
];
