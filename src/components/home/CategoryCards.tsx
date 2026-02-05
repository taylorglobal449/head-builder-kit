import { Link } from "react-router-dom";
import { Wrench, HardHat, Hammer, Cog, Lightbulb, Shield } from "lucide-react";

interface CategoryCard {
  name: string;
  icon: React.ReactNode;
  imageUrl: string;
  linkUrl: string;
}

const categories: CategoryCard[] = [
  {
    name: "All Tools",
    icon: <Wrench className="w-6 h-6" />,
    imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&auto=format&fit=crop&q=60",
    linkUrl: "/category/all-tools"
  },
  {
    name: "Outdoor Living",
    icon: <HardHat className="w-6 h-6" />,
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop&q=60",
    linkUrl: "/category/outdoor"
  },
  {
    name: "Lawn & Garden",
    icon: <Hammer className="w-6 h-6" />,
    imageUrl: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400&auto=format&fit=crop&q=60",
    linkUrl: "/category/lawn-garden"
  },
  {
    name: "Storage & Workspace",
    icon: <Cog className="w-6 h-6" />,
    imageUrl: "https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?w=400&auto=format&fit=crop&q=60",
    linkUrl: "/category/storage"
  },
  {
    name: "Home Improvement",
    icon: <Lightbulb className="w-6 h-6" />,
    imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&auto=format&fit=crop&q=60",
    linkUrl: "/category/home-improvement"
  },
  {
    name: "PPE & Safety",
    icon: <Shield className="w-6 h-6" />,
    imageUrl: "https://images.unsplash.com/photo-1545171182-541ce615c68c?w=400&auto=format&fit=crop&q=60",
    linkUrl: "/category/safety"
  }
];

export function CategoryCards() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
      {categories.map((category) => (
        <Link
          key={category.name}
          to={category.linkUrl}
          className="group relative overflow-hidden rounded-xl aspect-square"
        >
          {/* Background Image */}
          <img 
            src={category.imageUrl}
            alt={category.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-end p-3 pb-4">
            <span className="text-white text-xs md:text-sm font-bold text-center leading-tight">
              {category.name}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
