import { ChevronRight, Snowflake, Home, Wrench, SprayCan, Zap, Hammer, HardHat, Cable, Bolt, Package } from "lucide-react";

interface Subcategory {
  name: string;
  href: string;
}

interface CategoryColumn {
  title: string;
  icon: React.ReactNode;
  subcategories: Subcategory[];
}

const BASE = "https://www.fastenersinc.net/pages/search-results-page";

const categories: CategoryColumn[] = [
  {
    title: "OUTDOOR LIVING",
    icon: <Snowflake className="w-5 h-5" />,
    subcategories: [
      { name: "Coolers & Drinkware", href: `${BASE}?q=coolers` },
      { name: "Outdoor Cooking", href: `${BASE}?q=outdoor%20cooking` },
      { name: "Sporting Goods", href: `${BASE}?q=sporting%20goods` },
      { name: "Outdoor Repellents", href: `${BASE}?q=repellent` },
      { name: "Outdoor Shelters", href: `${BASE}?q=shelter` },
    ]
  },
  {
    title: "HOME IMPROVEMENT",
    icon: <Home className="w-5 h-5" />,
    subcategories: [
      { name: "Lighting & Electrical", href: `${BASE}?q=lighting` },
      { name: "Bathroom", href: `${BASE}?q=bathroom` },
      { name: "Door Hardware", href: `${BASE}?q=door%20hardware` },
      { name: "Kitchen", href: `${BASE}?q=kitchen` },
      { name: "Ceiling Fans", href: `${BASE}?q=ceiling%20fan` },
    ]
  },
  {
    title: "EQUIPMENT",
    icon: <Wrench className="w-5 h-5" />,
    subcategories: [
      { name: "Parts & Attachments", href: `${BASE}?q=parts` },
      { name: "Aerial Lifts", href: `${BASE}?q=aerial%20lift` },
      { name: "Skid Steer Loaders", href: `${BASE}?q=skid%20steer` },
      { name: "Snow Removal Equipment", href: `${BASE}?q=snow%20removal` },
      { name: "Compact Equipment", href: `${BASE}?q=compact%20equipment` },
    ]
  },
  {
    title: "CLEANING SUPPLIES",
    icon: <SprayCan className="w-5 h-5" />,
    subcategories: [
      { name: "Vacuums", href: `${BASE}?q=vacuum` },
      { name: "Cleaning Tools", href: `${BASE}?q=cleaning` },
      { name: "Trash & Recycling", href: `${BASE}?q=trash` },
      { name: "Floor Cleaning", href: `${BASE}?q=floor%20cleaning` },
      { name: "Accessories", href: `${BASE}?q=cleaning%20accessories` },
    ]
  },
  {
    title: "OUTDOOR POWER",
    icon: <Zap className="w-5 h-5" />,
    subcategories: [
      { name: "Chainsaws", href: `${BASE}?q=chainsaw` },
      { name: "Lawn Mowers", href: `${BASE}?q=lawn%20mower` },
      { name: "Trimmers & Edgers", href: `${BASE}?q=trimmer` },
      { name: "Generators", href: `${BASE}?q=generator` },
      { name: "Leaf Blowers & Vacs", href: `${BASE}?q=leaf%20blower` },
    ]
  },
  {
    title: "HAND TOOLS",
    icon: <Hammer className="w-5 h-5" />,
    subcategories: [
      { name: "Wrenches & Sockets", href: `${BASE}?q=wrench` },
      { name: "Screwdrivers", href: `${BASE}?q=screwdriver` },
      { name: "Pliers & Cutters", href: `${BASE}?q=pliers` },
      { name: "Measuring Tools", href: `${BASE}?q=measuring` },
      { name: "Tool Storage", href: `${BASE}?q=storage` },
    ]
  },
  {
    title: "SAFETY & PPE",
    icon: <HardHat className="w-5 h-5" />,
    subcategories: [
      { name: "Safety Glasses", href: `${BASE}?q=safety%20glasses` },
      { name: "Hearing Protection", href: `${BASE}?q=hearing%20protection` },
      { name: "Work Gloves", href: `${BASE}?q=gloves` },
      { name: "Hard Hats", href: `${BASE}?q=hard%20hat` },
      { name: "Hi-Vis Clothing", href: `${BASE}?q=hi-vis` },
    ]
  },
  {
    title: "ELECTRICAL",
    icon: <Cable className="w-5 h-5" />,
    subcategories: [
      { name: "Wire & Cable", href: `${BASE}?q=wire%20cable` },
      { name: "Conduit & Fittings", href: `${BASE}?q=conduit` },
      { name: "Electrical Boxes", href: `${BASE}?q=electrical%20box` },
      { name: "Switches & Outlets", href: `${BASE}?q=switch%20outlet` },
      { name: "Testing Equipment", href: `${BASE}?q=tester` },
    ]
  },
  {
    title: "FASTENERS",
    icon: <Bolt className="w-5 h-5" />,
    subcategories: [
      { name: "Screws", href: `${BASE}?q=screws` },
      { name: "Bolts & Nuts", href: `${BASE}?q=bolts` },
      { name: "Anchors", href: `${BASE}?q=anchors` },
      { name: "Nails & Staples", href: `${BASE}?q=nails` },
      { name: "Rivets", href: `${BASE}?q=rivets` },
    ]
  },
  {
    title: "STORAGE",
    icon: <Package className="w-5 h-5" />,
    subcategories: [
      { name: "Tool Boxes", href: `${BASE}?q=tool%20box` },
      { name: "Tool Chests", href: `${BASE}?q=tool%20chest` },
      { name: "Workbenches", href: `${BASE}?q=workbench` },
      { name: "Cabinets", href: `${BASE}?q=cabinet` },
      { name: "Organizers", href: `${BASE}?q=organizer` },
    ]
  },
];

export function CategoryMegaGrid() {
  return (
    <section className="py-6">
      {/* 5 columns on desktop (2 rows of 5), 3 on tablet, 2 on mobile */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {categories.map((category, idx) => (
          <div key={idx} className="bg-card border border-border rounded-lg overflow-hidden">
            {/* Category Header */}
            <div className="bg-header-secondary px-3 py-2 flex items-center gap-2">
              <span className="text-primary-foreground">{category.icon}</span>
              <h3 className="text-primary-foreground font-bold text-xs uppercase tracking-wide">
                {category.title}
              </h3>
            </div>
            
            {/* Subcategories */}
            <div className="p-1">
              {category.subcategories.map((sub, subIdx) => (
                <a
                  key={subIdx}
                  href={sub.href}
                  className="flex items-center justify-between px-2 py-1.5 hover:bg-muted rounded-md transition-colors group"
                >
                  <span className="text-xs text-foreground group-hover:text-header-primary transition-colors">
                    {sub.name}
                  </span>
                  <ChevronRight className="w-3 h-3 text-muted-foreground group-hover:text-header-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
