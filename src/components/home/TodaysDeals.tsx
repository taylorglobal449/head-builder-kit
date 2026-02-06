import { Link } from "react-router-dom";
import { Tag } from "lucide-react";

interface DealCard {
  brand: string;
  brandColor: string;
  title: string;
  description: string;
  code?: string;
  imageUrl: string;
  linkUrl: string;
}

const deals: DealCard[] = [
  {
    brand: "BOSCH",
    brandColor: "bg-[hsl(210,100%,35%)]",
    title: "BUY MORE FOR LESS",
    description: "Save $20 - $150 on select Bosch orders of $100+",
    imageUrl: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=300&auto=format&fit=crop&q=60",
    linkUrl: "/brands/bosch"
  },
  {
    brand: "Milwaukee",
    brandColor: "bg-[hsl(350,74%,44%)]",
    title: "GET UP TO $200 OFF",
    description: "select Milwaukee purchases",
    imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&auto=format&fit=crop&q=60",
    linkUrl: "/brands/milwaukee"
  },
  {
    brand: "Metabo HPT",
    brandColor: "bg-[hsl(145,60%,35%)]",
    title: "FREE 2PK SAWHORSES",
    description: "with select Metabo HPT miter saw",
    imageUrl: "https://images.unsplash.com/photo-1586864387789-628af9feed72?w=300&auto=format&fit=crop&q=60",
    linkUrl: "/brands/metabo"
  },
  {
    brand: "DEWALT",
    brandColor: "bg-[hsl(45,100%,45%)]",
    title: "FREE BATTERY",
    description: "with purchase of select DEWALT tool or charger",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&auto=format&fit=crop&q=60",
    linkUrl: "/brands/dewalt"
  },
  {
    brand: "Makita",
    brandColor: "bg-[hsl(180,100%,30%)]",
    title: "CREATE YOUR KIT",
    description: "Get a FREE tool with purchase of select Makita battery 2pk",
    imageUrl: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=300&auto=format&fit=crop&q=60",
    linkUrl: "/brands/makita"
  },
  {
    brand: "Klein Tools",
    brandColor: "bg-[hsl(35,100%,50%)]",
    title: "SAVE 14%",
    description: "on select Klein Tools items with code: 14SWEETKLEIN",
    code: "14SWEETKLEIN",
    imageUrl: "https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?w=300&auto=format&fit=crop&q=60",
    linkUrl: "/brands/klein"
  }
];

export function TodaysDeals() {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Tag className="w-5 h-5 text-header-primary" />
          <h2 className="text-xl font-black text-header-text uppercase tracking-wide">
            Today's Top Deals
          </h2>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {deals.map((deal, index) => (
          <Link
            key={index}
            to={deal.linkUrl}
            className="group relative overflow-hidden rounded-lg bg-gradient-to-b from-muted to-muted-foreground/20 flex flex-col"
          >
            {/* Brand Badge */}
            <div className={`${deal.brandColor} px-3 py-1.5 text-white text-xs font-bold uppercase tracking-wide m-3 rounded self-start`}>
              {deal.brand}
            </div>
            
            {/* Image - Square */}
            <div className="aspect-square mx-3 overflow-hidden rounded">
              <img 
                src={deal.imageUrl}
                alt={deal.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Content */}
            <div className="p-4 pt-2">
              <h3 className="text-white font-black text-sm leading-tight mb-1">
                {deal.title}
              </h3>
              <p className="text-white/80 text-xs leading-tight">
                {deal.description}
              </p>
            </div>
            
            {/* Hover Arrow */}
            <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
