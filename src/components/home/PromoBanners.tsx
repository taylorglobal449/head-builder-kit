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
    bgColor: "bg-[hsl(350,74%,44%)]",
    brandName: "Milwaukee",
    linkUrl: "/brands/milwaukee",
    linkText: "SHOP NOW"
  },
  {
    title: "YARD WORK DEALS",
    subtitle: "Get up to $50 OFF select EGO outdoor power equipment",
    bgColor: "bg-[hsl(85,40%,45%)]",
    brandName: "EGO",
    linkUrl: "/brands/ego",
    linkText: "SHOP NOW"
  }
];

export function PromoBanners() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {promos.map((promo, index) => (
        <Link 
          key={index}
          to={promo.linkUrl}
          className={`${promo.bgColor} rounded-lg p-6 text-white hover:opacity-95 transition-opacity relative overflow-hidden group min-h-[180px] flex flex-col justify-between`}
        >
          {/* Brand Name */}
          {promo.brandName && (
            <div className="text-2xl font-black opacity-90 mb-auto">
              {promo.brandName}
            </div>
          )}
          
          <div>
            {/* Title */}
            <h3 className="text-2xl lg:text-3xl font-black leading-tight">
              {promo.title}
            </h3>
            
            {/* Subtitle */}
            <p className="text-sm mt-1 opacity-90 max-w-[250px]">
              {promo.subtitle}
            </p>
            
            {/* Code if present */}
            {promo.code && (
              <p className="text-xs mt-2 opacity-80">
                with code: <span className="font-bold">{promo.code}</span>
              </p>
            )}
            
            {/* CTA */}
            <div className="inline-flex items-center gap-2 mt-4 font-bold text-sm bg-white/20 px-4 py-2 rounded-lg group-hover:bg-white/30 transition-colors">
              {promo.linkText || "SHOP NOW"}
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
