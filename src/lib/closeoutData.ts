export interface CloseoutCategory {
  id: string;
  title: string;
  externalHref: string;
}

export const closeoutCategories: CloseoutCategory[] = [
  { id: "hand-tools", title: "Hand Tools", externalHref: "https://www.fastenersinc.net/pages/closeouts-and-liquidations#" },
  { id: "power-tools", title: "Power Tools", externalHref: "https://www.fastenersinc.net/pages/closeouts-and-liquidations#" },
  { id: "blades-abrasives", title: "Blades & Abrasives", externalHref: "https://www.fastenersinc.net/pages/closeouts-and-liquidations#" },
  { id: "levels-measures", title: "Levels & Measures", externalHref: "https://www.fastenersinc.net/pages/closeouts-and-liquidations#" },
  { id: "drill-bits", title: "Drill Bits", externalHref: "https://www.fastenersinc.net/pages/closeouts-and-liquidations#" },
  { id: "fasteners", title: "Fasteners", externalHref: "https://www.fastenersinc.net/pages/closeouts-and-liquidations#" },
  { id: "additional", title: "Additional Closeouts", externalHref: "https://www.fastenersinc.net/pages/closeouts-and-liquidations#" },
];
