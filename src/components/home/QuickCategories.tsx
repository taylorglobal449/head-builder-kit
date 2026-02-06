import { Link } from "react-router-dom";
import { Wrench, HardHat, Hammer, Cog, Lightbulb, Shield, Drill, Box, Zap, Settings } from "lucide-react";

interface QuickCategory {
  name: string;
  icon: React.ReactNode;
  link: string;
}

const categories: QuickCategory[] = [
  { name: "Power Tools", icon: <Drill className="w-5 h-5" />, link: "/category/power-tools" },
  { name: "Hand Tools", icon: <Wrench className="w-5 h-5" />, link: "/category/hand-tools" },
  { name: "Fasteners", icon: <Settings className="w-5 h-5" />, link: "/category/fasteners" },
  { name: "Storage", icon: <Box className="w-5 h-5" />, link: "/category/storage" },
  { name: "Safety", icon: <Shield className="w-5 h-5" />, link: "/category/safety" },
  { name: "Electrical", icon: <Zap className="w-5 h-5" />, link: "/category/electrical" },
  { name: "Outdoor", icon: <HardHat className="w-5 h-5" />, link: "/category/outdoor" },
  { name: "All Products", icon: <Cog className="w-5 h-5" />, link: "/products" },
];

export function QuickCategories() {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {categories.map((category) => (
        <Link
          key={category.name}
          to={category.link}
          className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-lg hover:border-header-primary hover:bg-header-primary/5 transition-colors shrink-0 group"
        >
          <span className="text-muted-foreground group-hover:text-header-primary transition-colors">
            {category.icon}
          </span>
          <span className="text-sm font-medium text-foreground group-hover:text-header-primary transition-colors whitespace-nowrap">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
