import dewaltBareTools from "@/assets/deals/dewalt-bare-tools.jpg";
import dewaltKits from "@/assets/deals/dewalt-kits.jpg";
import dewaltFlexvolt from "@/assets/deals/dewalt-flexvolt.jpg";
import dewaltBatteries from "@/assets/deals/dewalt-batteries.jpg";
import dewaltHandTools from "@/assets/deals/dewalt-hand-tools.jpg";
import dewaltOutdoor from "@/assets/deals/dewalt-outdoor.jpg";
import milwaukeeM18 from "@/assets/deals/milwaukee-m18.jpg";
import milwaukeeM12 from "@/assets/deals/milwaukee-m12.jpg";
import milwaukeeLighting from "@/assets/deals/milwaukee-lighting.jpg";
import milwaukeePackout from "@/assets/deals/milwaukee-packout.jpg";
import milwaukeeNew from "@/assets/deals/milwaukee-new.jpg";
import makitaKitBattery from "@/assets/deals/makita-kit-battery.jpg";
import makitaBareTools from "@/assets/deals/makita-bare-tools.jpg";
import makitaXgt from "@/assets/deals/makita-xgt.jpg";

export interface DealBanner {
  id: string;
  title: string;
  image: string;
  href: string;
  brand: "dewalt" | "milwaukee" | "makita" | "other";
}

export const dealBanners: DealBanner[] = [
  // DeWalt
  { id: "dw-bare", title: "DeWalt Low Price Bare Tools", image: dewaltBareTools, href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-dewalt-low-price-bare-tools", brand: "dewalt" },
  { id: "dw-kits", title: "DeWalt Low Price Kits", image: dewaltKits, href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-dewalt-kits", brand: "dewalt" },
  { id: "dw-flexvolt", title: "DeWalt FlexVolt Deals", image: dewaltFlexvolt, href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-dewalt-flexvolt", brand: "dewalt" },
  { id: "dw-batteries", title: "DeWalt Battery & Charger Deals", image: dewaltBatteries, href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-dewalt-battery-charger-deals", brand: "dewalt" },
  { id: "dw-hand", title: "DeWalt Hand Tools & Mechanic Sets", image: dewaltHandTools, href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-dewalt-hand-tool-mech-set-deals", brand: "dewalt" },
  { id: "dw-outdoor", title: "DeWalt Outdoor Power Tools", image: dewaltOutdoor, href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-dewalt-ope-deals", brand: "dewalt" },

  // Milwaukee
  { id: "mw-m18", title: "Milwaukee M18 Buy More Save More", image: milwaukeeM18, href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-milwaukee-m18-buy-more-save-more", brand: "milwaukee" },
  { id: "mw-m12", title: "Milwaukee M12 Deals", image: milwaukeeM12, href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-milwaukee-low-price-m12-tool-deals", brand: "milwaukee" },
  { id: "mw-lighting", title: "Milwaukee Lighting Deals", image: milwaukeeLighting, href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-milwaukee-light-deals", brand: "milwaukee" },
  { id: "mw-packout", title: "Milwaukee PACKOUT Storage", image: milwaukeePackout, href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-milwaukee-packout", brand: "milwaukee" },
  { id: "mw-new", title: "Milwaukee New Product Deals", image: milwaukeeNew, href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-milwaukee-new-item-deals", brand: "milwaukee" },

  // Makita
  { id: "mk-kit", title: "Makita Buy Kit Get Battery Free", image: makitaKitBattery, href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-makita-buy-1-select-kit-get-1-bl4025-battery-free", brand: "makita" },
  { id: "mk-bare", title: "Makita Buy 2 Bare Tools Get Battery Free", image: makitaBareTools, href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-makita-buy-2-select-bare-tools-get-bl1850b-free", brand: "makita" },
  { id: "mk-xgt", title: "Makita XGT 40V Deals", image: makitaXgt, href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-makita-xgt", brand: "makita" },
];

export const brandTabs = [
  { id: "all", label: "All" },
  { id: "dewalt", label: "DeWalt" },
  { id: "milwaukee", label: "Milwaukee" },
  { id: "makita", label: "Makita" },
] as const;
