import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

interface CategoryItem {
  name: string;
  count: string;
  imageUrl: string;
  link: string;
}

const categories: CategoryItem[] = [
  {
    name: "Power Tools",
    count: "16.2K",
    imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=100&auto=format&fit=crop&q=60",
    link: "/category/power-tools"
  },
  {
    name: "Hand Tools",
    count: "15.2K",
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=100&auto=format&fit=crop&q=60",
    link: "/category/hand-tools"
  },
  {
    name: "Tool Accessories",
    count: "11.4K",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&auto=format&fit=crop&q=60",
    link: "/category/accessories"
  },
  {
    name: "Tool Boxes",
    count: "10.7K",
    imageUrl: "https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?w=100&auto=format&fit=crop&q=60",
    link: "/category/tool-boxes"
  },
  {
    name: "Safety Gear",
    count: "7.6K",
    imageUrl: "https://images.unsplash.com/photo-1545171182-541ce615c68c?w=100&auto=format&fit=crop&q=60",
    link: "/category/safety"
  },
  {
    name: "Saws",
    count: "7.0K",
    imageUrl: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=100&auto=format&fit=crop&q=60",
    link: "/category/saws"
  },
  {
    name: "Combo Kits",
    count: "6.6K",
    imageUrl: "https://images.unsplash.com/photo-1586864387789-628af9feed72?w=100&auto=format&fit=crop&q=60",
    link: "/category/combo-kits"
  },
  {
    name: "Air Compressors",
    count: "4.8K",
    imageUrl: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=100&auto=format&fit=crop&q=60",
    link: "/category/air-compressors"
  },
  {
    name: "Machine Tools",
    count: "4.8K",
    imageUrl: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=100&auto=format&fit=crop&q=60",
    link: "/category/machine-tools"
  },
  {
    name: "Impact Wrenches",
    count: "4.6K",
    imageUrl: "https://images.unsplash.com/photo-1609205807107-2498b3844cf5?w=100&auto=format&fit=crop&q=60",
    link: "/category/impact-wrenches"
  }
];

export function TrendingSidebar() {
  return (
    <div className="bg-white rounded-lg border border-header-border p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 text-header-primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
        <h3 className="font-bold text-header-text uppercase text-sm tracking-wide">
          Trending Categories
        </h3>
      </div>
      
      <div className="space-y-1">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.link}
            className="flex items-center gap-3 py-2 px-2 rounded-md hover:bg-gray-50 transition-colors group"
          >
            <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 shrink-0">
              <img 
                src={category.imageUrl} 
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium text-header-text group-hover:text-header-primary transition-colors line-clamp-1">
                {category.name}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-header-muted shrink-0">
              <Eye className="w-3 h-3" />
              <span>{category.count}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
