export interface DealBanner {
  id: string;
  title: string;
  image: string;
  href: string;
  brand: "dewalt" | "milwaukee" | "makita" | "flex" | "other";
}

export const dealBanners: DealBanner[] = [
  // DeWalt
  { id: "dw-bare", title: "DeWalt Low Price Bare Tools", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Q1_DEWALT_TILES_DEWALT_LOW_PRICE_BARE_TOOLS.png?v=1767046987", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-dewalt-low-price-bare-tools", brand: "dewalt" },
  { id: "dw-kits", title: "DeWalt Low Price Kits", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Q1_DEWALT_TILES_DEWALT_LOW_PRICE_KITS.png?v=1767046987", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-dewalt-kits", brand: "dewalt" },
  { id: "dw-ope", title: "DeWalt Outdoor Power Tools", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Q1_DEWALT_TILES_DEWALT_OPE.png?v=1767046986", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-dewalt-ope-deals", brand: "dewalt" },
  { id: "dw-batteries", title: "DeWalt Battery & Charger Deals", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Q1_DEWALT_TILES_DEWALT_BATTERY_DEALS.png?v=1767046987", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-dewalt-battery-charger-deals", brand: "dewalt" },
  { id: "dw-hand", title: "DeWalt Hand Tools & Mechanic Sets", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Q1_DEWALT_TILES_DEWALT_HAND_TOOLS.png?v=1767046987", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-dewalt-hand-tool-mech-set-deals", brand: "dewalt" },
  { id: "dw-flexvolt", title: "DeWalt FlexVolt", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Q1_DEWALT_TILES_DEWALT_FLEXVOLT.png?v=1767046986", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-dewalt-flexvolt", brand: "dewalt" },
  { id: "dw-lighting", title: "DeWalt Lighting", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Q1_DEWALT_TILES_DEWALT_LIGHTING.png?v=1767046986", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-dewalt-lighting-deals", brand: "dewalt" },
  { id: "dw-usbc", title: "DeWalt USB-C Rechargeables", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Q1_DEWALT_TILES_DEWALT_USBC_RECHARGABLES.png?v=1767046986", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-dewalt-usb-deals", brand: "dewalt" },
  { id: "dw-lasers", title: "DeWalt Lasers", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Q1_DEWALT_TILES_DEWALT_LASERS.png?v=1767046987", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-dewalt-laser-deals", brand: "dewalt" },
  { id: "dw-toughsystem", title: "DeWalt ToughSystem Storage", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Q1_DEWALT_TILES_DEWALT_TOUGHSYSTEM_STORAGE.png?v=1767046986", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-tough-systems", brand: "dewalt" },

  // Flex
  { id: "fx-circ", title: "Flex Buy FX2141R-Z Get FX0421-1H Free", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Q1_DEWALT_TILES_FLEX_BUY_FX2141R-Z_GET_FX0421-1H_FREE.png?v=1767046986", href: "https://www.fastenersinc.net/products/flex-fx2141r-z-24v-7-1-4in-circular-saw-rear-handle-stacked-lithium-bare-tool?_pos=1&_sid=ced2545bb&_ss=r", brand: "flex" },
  { id: "fx-bare-c", title: "Flex Buy Bare Tool Get FX0411-1C Free", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Q1_DEWALT_TILES_FLEX_BUY_A_BARETOOL_GET_FX0411-1C_FREE.png?v=1767046986", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-flex-buy-a-bare-tool-get-fx0411-1c-free", brand: "flex" },
  { id: "fx-bare-a", title: "Flex Buy Bare Tool Get FX0411-1A Free", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Q1_DEWALT_TILES_FLEX_BUY_A_BARETOOL_GET_FX0411-1A_FREE.png?v=1767046986", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-buy-a-bare-tool-get-fx0411-1a-free", brand: "flex" },
  { id: "fx-kits", title: "Flex Kit Deals", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Q1_DEWALT_TILES_FLEX_KITS.png?v=1767046987", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-flex-kit-deals", brand: "flex" },
  { id: "fx-storage", title: "Flex Storage", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Q1_DEWALT_FLEX_TILES_FLEX-STORAGE.png?v=1767822941", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-flex-storage", brand: "flex" },

  // Milwaukee
  { id: "mw-m12-bmsm", title: "Milwaukee M12 Buy More Save More", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/P1_MILWAUKEE_TILES_BMSM_M12_Deals.png?v=1769723957", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-milwaukee-buy-more-get-more", brand: "milwaukee" },
  { id: "mw-m18-bmsm", title: "Milwaukee M18 Buy More Save More", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/P1_MILWAUKEE_TILES_BMSM_M18_Deals.png?v=1769723956", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-milwaukee-m18-buy-more-save-more", brand: "milwaukee" },
  { id: "mw-bare-2420", title: "Milwaukee Buy Select Bare Tool Get 48-11-2420 Free", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/P1_MILWAUKEE_TILES_buy_light_get_free_48-11-2420.png?v=1769723955", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-milwaukee-buy-select-bare-tool-get-48-11-2420-battery-free", brand: "milwaukee" },
  { id: "mw-m12-less", title: "Milwaukee M12 Tools for Less", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/P1_MILWAUKEE_TILES_m12_for_less.png?v=1769723956", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-milwaukee-low-price-m12-tool-deals", brand: "milwaukee" },
  { id: "mw-lighting", title: "Milwaukee Lighting Deals", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/P1_MILWAUKEE_TILES_lighitng.png?v=1769723956", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-milwaukee-light-deals", brand: "milwaukee" },
  { id: "mw-lasers", title: "Milwaukee Buy Select Laser Get Free Headlamp", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/P1_MILWAUKEE_TILES_lasers.png?v=1769723957", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-milwaukee-buy-select-laser-get-free-headlamp", brand: "milwaukee" },
  { id: "mw-2695-kit", title: "Milwaukee 2695-24 Kit Get 48-11-1852 Free", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/P1_MILWAUKEE_TILES_buy_this_kit_get_48-11-1852_free.png?v=1769723956", href: "https://www.fastenersinc.net/products/milwaukee-2695-24-m18-cordless-lithium-ion-4-tool-combo-kit", brand: "milwaukee" },
  { id: "mw-1865", title: "Milwaukee Buy Select Get 48-11-1865 Free", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/P1_MILWAUKEE_TILES_buy_these_get_48-11-1865.png?v=1769723957", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-milwaukee-buy-select-item-get-48-11-1865-free", brand: "milwaukee" },
  { id: "mw-3697-kit", title: "Milwaukee 3697-25 Kit Get Choice Free Tool", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/P1_MILWAUKEE_TILES_buy_this_kit_get_your_choiuce_48-11-1881_2836-20_2854-20.png?v=1769723957", href: "https://www.fastenersinc.net/products/milwaukee-3697-25-m18-fuel-5-tool-combo-kit", brand: "milwaukee" },
  { id: "mw-m18-low", title: "Milwaukee Low Price M18 Deals", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/P1_MILWAUKEE_TILES_Low_price_m18_deals.png?v=1769723956", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-milwaukee-low-price-m18", brand: "milwaukee" },
  { id: "mw-nailer", title: "Milwaukee Duplex Nailer Kit Get Free Box", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/P1_MILWAUKEE_TILES_buy_nailer_kit_get_free_box.png?v=1769723956", href: "https://www.fastenersinc.net/products/milwaukee-2844-21-m18-fuel-duplex-nailer-kit-1", brand: "milwaukee" },
  { id: "mw-choice", title: "Milwaukee Buy Select Get Choice Free Item", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/P1_MILWAUKEE_TILES_Buy_one_of_these_get_your_choice_48-11-1865_or_2880-20.png?v=1769723957", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-milwaukee-buy-select-item-get-select-item-free", brand: "milwaukee" },
  { id: "mw-charger-packout", title: "Milwaukee Select Charger Get Free Packout", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/P1_MILWAUKEE_TILES_buy_these_get_your_chocie_free_48-22-8425_or_48-22-8315.png?v=1769723956", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-milwaukee-a-select-m18-charger-get-1-free-select-packout-item", brand: "milwaukee" },
  { id: "mw-starter", title: "Milwaukee Starter Kit Get Bare Tool Free", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/P1_MILWAUKEE_TILES_Buy_this_starter_kit_get_bare_tool_free.png?v=1769723956", href: "https://www.fastenersinc.net/products/milwaukee-48-59-1850-m18-redlithium-xc-5-0ah-battery-and-charger-starter-kit", brand: "milwaukee" },
  { id: "mw-mech", title: "Milwaukee Low Price Mechanics Tools", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/P1_MILWAUKEE_TILES_low_price_mech.png?v=1769723957", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-milwaukee-mechanics-tools", brand: "milwaukee" },
  { id: "mw-new", title: "Milwaukee New Product Deals", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/P1_MILWAUKEE_TILES_New_products.png?v=1769723956", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-milwaukee-new-item-deals", brand: "milwaukee" },
  { id: "mw-stiletto", title: "Milwaukee Stiletto Deals", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/P1_MILWAUKEE_TILES_stiletto.png?v=1769723956", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-milwaukee-stiletto", brand: "milwaukee" },

  // Makita
  { id: "mk-bl4025", title: "Makita Buy Kit Get BL4025 Free", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/P1_makita_TILES_buy_kit_get_BL4025_FREE.png?v=1769755073", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-makita-buy-1-select-kit-get-1-bl4025-battery-free", brand: "makita" },
  { id: "mk-bl4040", title: "Makita Buy Saw Get BL4040 Free", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/P1_Makita_TILES_buy_saw_get_BL4040_free.png?v=1769755088", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-makita-buy-1-select-kit-get-1-bl4040", brand: "makita" },
  { id: "mk-grt01d", title: "Makita GRT01D Deal", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/P1_Makita_TILES_GRT01D_deal.png?v=1769755100", href: "https://www.fastenersinc.net/products/makita-grt01d-40v-max-xgt-lithium-ion-brushless-16-gauge-rebar-tying-tool-kit-2-5-ah", brand: "makita" },
  { id: "mk-bl1850b-2", title: "Makita Buy BL1850B-2 Get Choice Free", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/P1_Makita_TILES_buy_BL1850B-2_get_your_choice_free.png?v=1769755131", href: "https://www.fastenersinc.net/products/makita-18v-lxt-lithiumion-50ah-battery-2pk-bl1850b-2-i-g0070430", brand: "makita" },
  { id: "mk-bare", title: "Makita Buy 2 Bare Tools Get BL1850B Free", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/P1_Makita_TILES_buy_2_bare_tool_get_BL1850B.png?v=1769755114", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-makita-buy-2-select-bare-tools-get-bl1850b-free", brand: "makita" },

  // Other
  { id: "bosch-lasers", title: "Bosch Lasers Deal", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Q1_DEWALT_TILES_BOSCH_LDMS_dc5020ef-8d53-4545-939c-c0544e457d31.png?v=1768602437", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-bosch-laser-deal", brand: "other" },
  { id: "bosch-ldm", title: "Bosch Laser Distance Measures", image: "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Q1_DEWALT_TILES_BOSCH_LASERS_cc90bbe5-1306-4889-99b7-9c7e3a54f977.png?v=1768602437", href: "https://www.fastenersinc.net/pages/search-results-page?collection=q126-bosch-laser-deals", brand: "other" },
];

export const brandTabs = [
  { id: "all", label: "All" },
  { id: "dewalt", label: "DeWalt" },
  { id: "milwaukee", label: "Milwaukee" },
  { id: "makita", label: "Makita" },
  { id: "flex", label: "Flex" },
  { id: "other", label: "Other" },
] as const;
