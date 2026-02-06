import { Link } from "react-router-dom";
import { ChevronRight, Snowflake, Home, Wrench, SprayCan, Zap } from "lucide-react";

interface Subcategory {
  name: string;
  href: string;
}

interface CategoryColumn {
  title: string;
  icon: React.ReactNode;
  color: string;
  subcategories: Subcategory[];
}

const categories: CategoryColumn[] = [
  {
    title: "OUTDOOR LIVING",
    icon: <Snowflake className="w-5 h-5" />,
    color: "bg-header-secondary",
    subcategories: [
      { name: "Coolers & Drinkware", href: "/category/coolers" },
      { name: "Outdoor Cooking", href: "/category/outdoor-cooking" },
      { name: "Sporting Goods", href: "/category/sporting-goods" },
      { name: "Outdoor Repellents", href: "/category/repellents" },
      { name: "Outdoor Shelters", href: "/category/shelters" },
    ]
  },
  {
    title: "HOME IMPROVEMENT",
    icon: <Home className="w-5 h-5" />,
    color: "bg-header-secondary",
    subcategories: [
      { name: "Lighting & Electrical", href: "/category/lighting" },
      { name: "Bathroom", href: "/category/bathroom" },
      { name: "Door Hardware", href: "/category/door-hardware" },
      { name: "Kitchen", href: "/category/kitchen" },
      { name: "Ceiling Fans", href: "/category/ceiling-fans" },
    ]
  },
  {
    title: "EQUIPMENT",
    icon: <Wrench className="w-5 h-5" />,
    color: "bg-header-secondary",
    subcategories: [
      { name: "Parts & Attachments", href: "/category/parts" },
      { name: "Aerial Lifts", href: "/category/aerial-lifts" },
      { name: "Skid Steer Loaders", href: "/category/skid-steer" },
      { name: "Snow Removal Equipment", href: "/category/snow-removal" },
      { name: "Compact Equipment", href: "/category/compact-equipment" },
    ]
  },
  {
    title: "CLEANING SUPPLIES",
    icon: <SprayCan className="w-5 h-5" />,
    color: "bg-header-secondary",
    subcategories: [
      { name: "Vacuums", href: "/category/vacuums" },
      { name: "Cleaning Tools", href: "/category/cleaning-tools" },
      { name: "Trash & Recycling", href: "/category/trash-recycling" },
      { name: "Floor Cleaning", href: "/category/floor-cleaning" },
      { name: "Accessories", href: "/category/cleaning-accessories" },
    ]
  },
  {
    title: "OUTDOOR POWER",
    icon: <Zap className="w-5 h-5" />,
    color: "bg-header-secondary",
    subcategories: [
      { name: "Chainsaws", href: "/category/chainsaws" },
      { name: "Lawn Mowers", href: "/category/lawn-mowers" },
      { name: "Trimmers & Edgers", href: "/category/trimmers" },
      { name: "Generators", href: "/category/generators" },
      { name: "Leaf Blowers & Vacs", href: "/category/leaf-blowers" },
    ]
  },
];

export function CategoryMegaGrid() {
  // Split into 2 rows: 3 categories on top, 2 on bottom
  const row1 = categories.slice(0, 3);
  const row2 = categories.slice(3, 5);

  return (
    <section className="py-8">
      {/* Row 1: 3 categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {row1.map((category, idx) => (
          <div key={idx} className="bg-card border border-border rounded-lg overflow-hidden">
            {/* Category Header */}
            <div className={`${category.color} px-4 py-3 flex items-center gap-2`}>
              <span className="text-primary-foreground">{category.icon}</span>
              <h3 className="text-primary-foreground font-bold text-xs uppercase tracking-wide">
                {category.title}
              </h3>
            </div>
            
            {/* Subcategories */}
            <div className="p-2">
              {category.subcategories.map((sub, subIdx) => (
                <Link
                  key={subIdx}
                  to={sub.href}
                  className="flex items-center justify-between px-3 py-2 hover:bg-muted rounded-md transition-colors group"
                >
                  <span className="text-sm text-foreground group-hover:text-header-primary transition-colors">
                    {sub.name}
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-header-primary transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: 2 categories centered */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 max-w-4xl mx-auto lg:max-w-none lg:grid-cols-2 lg:px-[16.67%]">
        {row2.map((category, idx) => (
          <div key={idx} className="bg-card border border-border rounded-lg overflow-hidden">
            {/* Category Header */}
            <div className={`${category.color} px-4 py-3 flex items-center gap-2`}>
              <span className="text-primary-foreground">{category.icon}</span>
              <h3 className="text-primary-foreground font-bold text-xs uppercase tracking-wide">
                {category.title}
              </h3>
            </div>
            
            {/* Subcategories */}
            <div className="p-2">
              {category.subcategories.map((sub, subIdx) => (
                <Link
                  key={subIdx}
                  to={sub.href}
                  className="flex items-center justify-between px-3 py-2 hover:bg-muted rounded-md transition-colors group"
                >
                  <span className="text-sm text-foreground group-hover:text-header-primary transition-colors">
                    {sub.name}
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-header-primary transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
