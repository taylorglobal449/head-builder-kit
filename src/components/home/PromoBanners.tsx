import { Link } from "react-router-dom";

interface PromoBannerProps {
  title: string;
  subtitle: string;
  description?: string;
  code?: string;
  bgColor: string;
  logoUrl?: string;
  brandName?: string;
  linkUrl: string;
  linkText?: string;
}

const promos: PromoBannerProps[] = [
  {
    title: "SAVE $80-$400",
    subtitle: "on select Milwaukee M18 orders of $350+",
    bgColor: "bg-red-700",
    brandName: "Milwaukee",
    linkUrl: "/brands/milwaukee",
    linkText: "SHOP NOW"
  },
  {
    title: "YARD WORK DEALS",
    subtitle: "Get up to $50 OFF select EGO outdoor power equipment",
    bgColor: "bg-green-700",
    brandName: "EGO",
    linkUrl: "/brands/ego",
    linkText: "SHOP NOW"
  },
  {
    title: "FREE SHIPPING",
    subtitle: "On orders over $99 — Fast delivery to your door",
    bgColor: "bg-blue-700",
    brandName: "All Orders",
    linkUrl: "/shipping",
    linkText: "LEARN MORE"
  },
  {
    title: "BULK DISCOUNTS",
    subtitle: "Save more when you buy more — Custom quotes available",
    bgColor: "bg-amber-600",
    brandName: "Contractors",
    linkUrl: "/bulk-pricing",
    linkText: "GET A QUOTE"
  }
];

export function PromoBanners() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {promos.map((promo, index) => (
        <Link 
          key={index}
          to={promo.linkUrl}
          className={`${promo.bgColor} rounded-lg p-4 text-white hover:opacity-95 transition-opacity relative overflow-hidden group min-h-[140px] flex flex-col justify-between`}
        >
          {/* Brand Name */}
          {promo.brandName && (
            <div className="text-sm font-bold opacity-80 uppercase tracking-wide">
              {promo.brandName}
            </div>
          )}
          
          <div>
            {/* Title */}
            <h3 className="text-lg lg:text-xl font-black leading-tight">
              {promo.title}
            </h3>
            
            {/* Subtitle */}
            <p className="text-xs mt-1 opacity-90 line-clamp-2">
              {promo.subtitle}
            </p>
            
            {/* Code if present */}
            {promo.code && (
              <p className="text-xs mt-1 opacity-80">
                code: <span className="font-bold">{promo.code}</span>
              </p>
            )}
            
            {/* CTA */}
            <div className="inline-flex items-center gap-1 mt-3 font-bold text-xs bg-white/20 px-3 py-1.5 rounded group-hover:bg-white/30 transition-colors">
              {promo.linkText || "SHOP NOW"}
              <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
