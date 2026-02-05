import { Link } from "react-router-dom";
import { FlameKindling } from "lucide-react";

interface HeroBannerProps {
  title?: string;
  subtitle?: string;
  code?: string;
  imageUrl?: string;
  linkUrl?: string;
  linkText?: string;
}

export function HeroBanner({
  title = "FLASH SALE",
  subtitle = "ORGANIZE FOR LESS",
  code = "STORAGE10",
  imageUrl = "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&auto=format&fit=crop&q=60",
  linkUrl = "/deals",
  linkText = "SHOP NOW"
}: HeroBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-header-primary to-[hsl(350,60%,35%)] min-h-[280px] lg:min-h-[360px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={imageUrl}
          alt="Featured promotion"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-header-primary/90 via-header-primary/60 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-6 lg:p-10 flex flex-col justify-center h-full min-h-[280px] lg:min-h-[360px]">
        {/* Flash Sale Badge */}
        <div className="inline-flex items-center gap-2 bg-[hsl(45,100%,50%)] text-black px-4 py-1.5 rounded-full w-fit mb-4">
          <FlameKindling className="w-4 h-4" />
          <span className="font-bold text-sm tracking-wide">{title}</span>
        </div>
        
        {/* Main Title */}
        <h2 className="text-white text-3xl lg:text-5xl font-black mb-3 max-w-md leading-tight">
          {subtitle}
        </h2>
        
        {/* Promo Code */}
        <p className="text-white/90 text-base lg:text-lg mb-2">
          Get <span className="font-bold text-[hsl(45,100%,50%)]">10% OFF</span> select tool storage
        </p>
        <p className="text-white/80 text-sm mb-6">
          with code: <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded">{code}</span>
        </p>
        
        {/* CTA Button */}
        <Link 
          to={linkUrl}
          className="inline-flex items-center gap-2 bg-white text-header-primary font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors w-fit group"
        >
          {linkText}
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
