export interface DirectoryBrand {
  name: string;
  logo: string;
  href: string;
}

// Cloud storage base URL for brand logos
const S = "https://sqepmxyzbratccnlzwtk.supabase.co/storage/v1/object/public/brand-logos";

export const brandsDirectory: Record<string, DirectoryBrand[]> = {
  A: [
    { name: "Aervoe", logo: "https://www.fastenersinc.net/cdn/shop/files/Aervoe_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=aervoe" },
    { name: "Aignep", logo: "https://www.fastenersinc.net/cdn/shop/files/Aignep_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=aignep" },
    { name: "Amana Tool", logo: "https://www.fastenersinc.net/cdn/shop/files/Amana_Tool_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=amana+tool" },
    { name: "Avanti", logo: "https://www.fastenersinc.net/cdn/shop/files/Avanti_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=avanti" },
  ],
  B: [
    { name: "Bay Standard", logo: "https://www.fastenersinc.net/cdn/shop/files/Bay_Standard_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=bay+standard" },
    { name: "Bessey", logo: "https://www.fastenersinc.net/cdn/shop/files/Bessey_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=bessey" },
    { name: "Black + Decker", logo: "https://www.fastenersinc.net/cdn/shop/files/Black_Decker_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=black+decker" },
    { name: "Blacklader", logo: `${S}/blacklader.png`, href: "https://www.fastenersinc.net/pages/search-results-page?q=blacklader" },
    { name: "BN Products", logo: "https://www.fastenersinc.net/cdn/shop/files/BN_Products_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=bn+products" },
    { name: "Bora", logo: "https://www.fastenersinc.net/cdn/shop/files/Bora_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=bora" },
    { name: "Bostitch", logo: "https://www.fastenersinc.net/cdn/shop/files/Bostitch_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=bostitch" },
    { name: "Boxer Tools", logo: "https://www.fastenersinc.net/cdn/shop/files/Boxer_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=boxer+tools" },
    { name: "Brighton Best", logo: "https://www.fastenersinc.net/cdn/shop/files/Brighton_Best_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=brighton+best" },
    { name: "Bosch Tools", logo: "https://www.fastenersinc.net/cdn/shop/files/Bosch_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=bosch" },
  ],
  C: [
    { name: "Charman", logo: "https://www.fastenersinc.net/cdn/shop/files/Charman_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=charman" },
    { name: "Chicago Hardware", logo: "https://www.fastenersinc.net/cdn/shop/files/Chicago_Hardware_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=chicago+hardware" },
    { name: "Coil Hose Pneumatics", logo: "https://www.fastenersinc.net/cdn/shop/files/Coilhose_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=coilhose" },
    { name: "Cooper B-Line", logo: "https://www.fastenersinc.net/cdn/shop/files/Cooper_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=cooper+b-line" },
    { name: "Crescent Tools", logo: "https://www.fastenersinc.net/cdn/shop/files/Crescent_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=crescent" },
    { name: "CLC Work Gear", logo: "https://www.fastenersinc.net/cdn/shop/files/CLC_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=clc" },
    { name: "Crocodile Cloth", logo: "https://www.fastenersinc.net/cdn/shop/files/Crocodile_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=crocodile+cloth" },
  ],
  D: [
    { name: "DeWalt", logo: "https://www.fastenersinc.net/cdn/shop/files/dewalt_534x.png?v=1678310464", href: "/brands/dewalt" },
    { name: "Diablo", logo: "https://www.fastenersinc.net/cdn/shop/files/Diablo_1880x.png?v=1678308735", href: "/brands/diablo" },
    { name: "Diamond Products", logo: "https://www.fastenersinc.net/cdn/shop/files/Diamond_Products_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=diamond+products" },
    { name: "Dremel", logo: "https://www.fastenersinc.net/cdn/shop/files/Dremel_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=dremel" },
  ],
  E: [
    { name: "Empire", logo: "https://www.fastenersinc.net/cdn/shop/files/Empire_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=empire" },
    { name: "Evolution Tools", logo: "https://www.fastenersinc.net/cdn/shop/files/Evolution_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=evolution" },
  ],
  F: [
    { name: "FallTech", logo: "https://www.fastenersinc.net/cdn/shop/files/FallTech_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=falltech" },
    { name: "Fasteners Inc", logo: "https://www.fastenersinc.net/cdn/shop/files/Fasteners_Inc_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/" },
    { name: "Fein Tools", logo: "https://www.fastenersinc.net/cdn/shop/files/Fein_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=fein" },
    { name: "Festool", logo: "https://www.fastenersinc.net/cdn/shop/files/Festool_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=festool" },
    { name: "Flex Tool", logo: "https://www.fastenersinc.net/cdn/shop/files/Flex_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=flex" },
    { name: "Foremost", logo: "https://www.fastenersinc.net/cdn/shop/files/Foremost_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=foremost" },
    { name: "Freud", logo: "https://www.fastenersinc.net/cdn/shop/files/Freud_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=freud" },
  ],
  G: [
    { name: "GearWrench", logo: `${S}/gearwrench.png`, href: "https://www.fastenersinc.net/pages/search-results-page?q=gearwrench" },
    { name: "Generac", logo: "https://www.fastenersinc.net/cdn/shop/files/Generac_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=generac" },
    { name: "GenTent", logo: "https://www.fastenersinc.net/cdn/shop/files/GenTent_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=gentent" },
    { name: "Greenlee", logo: "https://www.fastenersinc.net/cdn/shop/files/Greenlee_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=greenlee" },
    { name: "GRK Fasteners", logo: "https://www.fastenersinc.net/cdn/shop/files/GRK_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=grk" },
    { name: "Grip-Rite", logo: "https://www.fastenersinc.net/cdn/shop/files/GripRite_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=grip-rite" },
  ],
  H: [
    { name: "CH Hanson", logo: "https://www.fastenersinc.net/cdn/shop/files/CH_Hanson_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=ch+hanson" },
    { name: "Honda", logo: "https://www.fastenersinc.net/cdn/shop/files/Honda_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=honda" },
    { name: "Huck", logo: "https://www.fastenersinc.net/cdn/shop/files/Huck_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=huck" },
    { name: "Hultafors", logo: "https://www.fastenersinc.net/cdn/shop/files/Hultafors_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=hultafors" },
    { name: "Huttig Grip", logo: "https://www.fastenersinc.net/cdn/shop/files/Huttig_1880x.png?v=1678308735", href: "https://www.fastenersinc.net/pages/search-results-page?q=huttig" },
  ],
  I: [
    { name: "Intercorp", logo: `${S}/intercorp.png`, href: "https://www.fastenersinc.net/pages/search-results-page?q=intercorp" },
    { name: "IronClad", logo: `${S}/ironclad.png`, href: "/brands/ironclad" },
    { name: "Irwin", logo: `${S}/irwin.png`, href: "https://www.fastenersinc.net/pages/search-results-page?q=irwin" },
  ],
  J: [
    { name: "JET", logo: `${S}/jet.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?q=jet" },
    { name: "Johnson Tools", logo: `${S}/johnson-tools.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?q=Johnson%20Level%20and%20Tool" },
  ],
  K: [
    { name: "Kapro", logo: `${S}/kapro.png`, href: "https://www.fastenersinc.net/pages/search-results-page?q=kapro" },
    { name: "Ken Forging", logo: `${S}/ken-forging.png`, href: "https://www.fastenersinc.net/pages/search-results-page?q=ken+forging" },
    { name: "Kishigo", logo: `${S}/kishigo.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?q=kishigo" },
    { name: "Klein Tools", logo: `${S}/klein.png`, href: "/brands/klein-tools" },
    { name: "Knipex", logo: `${S}/knipex.png`, href: "/brands/knipex" },
    { name: "Kreg", logo: `${S}/kreg.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?q=kreg" },
  ],
  L: [
    { name: "Landmann Wire Rope", logo: `${S}/landmann.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?q=landmann" },
    { name: "Lenox", logo: `${S}/lenox.png`, href: "https://www.fastenersinc.net/pages/search-results-page?q=lenox" },
    { name: "Lift Safety", logo: `${S}/lift-safety.png`, href: "https://www.fastenersinc.net/pages/search-results-page?q=lift+safety" },
    { name: "Lift-All", logo: `${S}/lift-all.png`, href: "https://www.fastenersinc.net/pages/search-results-page?q=lift-all" },
    { name: "Lindstrom Metric", logo: `${S}/lindstrom.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?q=lindstrom" },
  ],
  M: [
    { name: "Makita Tools", logo: `${S}/makita.png`, href: "/brands/makita" },
    { name: "Marson", logo: `${S}/marson.png`, href: "https://www.fastenersinc.net/pages/search-results-page?q=marson" },
    { name: "Marshalltown", logo: `${S}/marshalltown.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?q=marshalltown" },
    { name: "Martinez Tools", logo: `${S}/martinez.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?q=martinez" },
    { name: "Max Straps", logo: `${S}/max-straps.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?q=max+straps" },
    { name: "Max USA Corp", logo: `${S}/max-usa.png`, href: "https://www.fastenersinc.net/pages/search-results-page?q=max+usa" },
    { name: "MetaboHPT", logo: `${S}/metabo.png`, href: "https://www.fastenersinc.net/pages/search-results-page?q=metabo" },
    { name: "Milwaukee Tools", logo: `${S}/milwaukee.png`, href: "/brands/milwaukee" },
    { name: "Make It Snappy", logo: `${S}/make-it-snappy.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?page=1&rb_vendor=SNAPPY" },
  ],
  N: [
    { name: "Norseman Viking", logo: `${S}/norseman.png`, href: "https://www.fastenersinc.net/pages/search-results-page?q=norseman" },
  ],
  O: [
    { name: "Occidental", logo: `${S}/occidental.png`, href: "/brands/occidental" },
    { name: "OX Pro", logo: `${S}/ox-pro.png`, href: "https://www.fastenersinc.net/pages/search-results-page?q=ox+pro" },
  ],
  P: [
    { name: "Pearl Abrasive", logo: `${S}/pearl-abrasive.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?q=pearl+abrasive" },
    { name: "Pica", logo: `${S}/pica.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?q=pica" },
    { name: "Porter Cable", logo: `${S}/porter-cable.png`, href: "https://www.fastenersinc.net/pages/coming-soon" },
    { name: "Powermatic", logo: `${S}/powermatic.webp`, href: "https://www.fastenersinc.net/pages/search-results-page?q=powermatic" },
  ],
  R: [
    { name: "Radians", logo: `${S}/radians.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?q=radians" },
    { name: "Revco", logo: `${S}/revco.png`, href: "https://www.fastenersinc.net/pages/coming-soon" },
    { name: "Rolair", logo: `${S}/rolair.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?q=rolair" },
    { name: "Roost", logo: `${S}/roost.png`, href: "https://www.fastenersinc.net/pages/search-results-page?q=roost" },
  ],
  S: [
    { name: "Senco", logo: `${S}/senco.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?q=senco" },
    { name: "Shurtape", logo: `${S}/shurtape.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?q=shurtape" },
    { name: "SkilSaw", logo: `${S}/skilsaw.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?page=1&rb_vendor=Skilsaw" },
    { name: "Stabila", logo: `${S}/stabila.png`, href: "https://www.fastenersinc.net/pages/search-results-page?q=stabila" },
    { name: "Star Stainless", logo: `${S}/star-stainless.png`, href: "https://www.fastenersinc.net/pages/search-results-page?q=star+stainless" },
    { name: "Starbond", logo: `${S}/starbond.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?q=starbond" },
    { name: "StealthMounts", logo: `${S}/stealthmounts.webp`, href: "https://www.fastenersinc.net/pages/search-results-page?q=stealthmounts" },
    { name: "Stiletto", logo: `${S}/stiletto.webp`, href: "https://www.fastenersinc.net/pages/search-results-page?q=stiletto" },
    { name: "Stanley", logo: `${S}/stanley.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?page=1&rb_vendor=Stanley" },
  ],
  T: [
    { name: "Tajima", logo: `${S}/tajima.png`, href: "https://www.fastenersinc.net/pages/search-results-page?q=tajima" },
    { name: "Tru-Cut", logo: `${S}/tru-cut.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?q=tru-cut" },
  ],
  U: [
    { name: "United Abrasives", logo: `${S}/united-abrasives.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?q=united+abrasives" },
  ],
  V: [
    { name: "Vanguard Safety", logo: `${S}/vanguard.png`, href: "https://www.fastenersinc.net/pages/search-results-page?q=vanguard" },
    { name: "Vaughan", logo: `${S}/vaughan.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?q=vaughan" },
    { name: "Vega", logo: `${S}/vega.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?q=vega" },
    { name: "Vessel", logo: `${S}/vessel.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?page=1&rb_vendor=Vessel" },
    { name: "Veto", logo: `${S}/veto.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?q=veto" },
    { name: "Voltec Power & Lighting", logo: `${S}/voltec.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?q=voltec" },
    { name: "Vulcan", logo: `${S}/vulcan.png`, href: "https://www.fastenersinc.net/pages/search-results-page?q=vulcan" },
  ],
  W: [
    { name: "Wiha", logo: `${S}/wiha.png`, href: "https://www.fastenersinc.net/pages/search-results-page?page=1&rb_vendor=Wiha" },
    { name: "Wera", logo: `${S}/wera.png`, href: "https://www.fastenersinc.net/pages/search-results-page?page=1&rb_vendor=Wera%20Tools" },
    { name: "Wilde", logo: `${S}/wilde.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?q=wilde" },
    { name: "Wilton", logo: `${S}/wilton.jpg`, href: "https://www.fastenersinc.net/pages/search-results-page?q=wilton" },
  ],
};

export const alphabetLetters = Object.keys(brandsDirectory);
