export interface CloseoutCategory {
  id: string;
  title: string;
  searchQuery: string;
}

export const closeoutCategories: CloseoutCategory[] = [
  { id: "hand-tools", title: "Hand Tools", searchQuery: "closeout hand tools" },
  { id: "power-tools", title: "Power Tools", searchQuery: "closeout power tools" },
  { id: "blades-abrasives", title: "Blades & Abrasives", searchQuery: "closeout blades abrasives" },
  { id: "levels-measures", title: "Levels & Measures", searchQuery: "closeout levels measures" },
  { id: "drill-bits", title: "Drill Bits", searchQuery: "closeout drill bits" },
  { id: "fasteners", title: "Fasteners", searchQuery: "closeout fasteners" },
  { id: "additional", title: "Additional Closeouts", searchQuery: "closeout" },
];
