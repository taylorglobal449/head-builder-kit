import { useState } from "react";
import { Search, User, Menu, X, FlameKindling, DollarSign, Sparkles, ShoppingBag, Tag, Truck } from "lucide-react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchModal } from "@/components/search/SearchModal";

// Image map for subcategory thumbnails
const subcategoryImages: Record<string, string> = {
  // Power Tools
  "Drills & Drivers": "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=120&h=120&fit=crop",
  "Saws": "https://images.unsplash.com/photo-1580402427914-a6cc60d7afc5?w=120&h=120&fit=crop",
  "Grinders & Sanders": "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=120&h=120&fit=crop",
  "Rotary Tools": "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=120&h=120&fit=crop",
  "Multi-Tools": "https://images.unsplash.com/photo-1586864387789-628af9feed72?w=120&h=120&fit=crop",
  // Hand Tools
  "Wrenches": "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=120&h=120&fit=crop",
  "Pliers & Cutters": "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=120&h=120&fit=crop",
  "Screwdrivers": "https://images.unsplash.com/photo-1426927308491-6380b6a9936f?w=120&h=120&fit=crop",
  "Hammers": "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=120&h=120&fit=crop",
  "Clamps & Vises": "https://images.unsplash.com/photo-1530124566582-a45a7c6ec40f?w=120&h=120&fit=crop",
  // Tool Accessories
  "Drill Bits": "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=120&h=120&fit=crop",
  "Saw Blades": "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=120&h=120&fit=crop",
  "Abrasives": "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=120&h=120&fit=crop",
  "Batteries & Chargers": "https://images.unsplash.com/photo-1609692814857-d1b8d0c5e8c8?w=120&h=120&fit=crop",
  "Router Bits": "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=120&h=120&fit=crop",
  // Fasteners
  "Screws": "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=120&h=120&fit=crop",
  "Bolts & Nuts": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=120&h=120&fit=crop",
  "Anchors": "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=120&h=120&fit=crop",
  "Nails & Staples": "https://images.unsplash.com/photo-1586864387789-628af9feed72?w=120&h=120&fit=crop",
  "Rivets & Washers": "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=120&h=120&fit=crop",
  // Strut & Accessories
  "Strut Channel": "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=120&h=120&fit=crop",
  "Strut Fittings": "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=120&h=120&fit=crop",
  "Pipe Hangers": "https://images.unsplash.com/photo-1530124566582-a45a7c6ec40f?w=120&h=120&fit=crop",
  "Hardware": "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=120&h=120&fit=crop",
  "Mounting": "https://images.unsplash.com/photo-1586864387789-628af9feed72?w=120&h=120&fit=crop",
  // Safety & Workwear
  "Eye Protection": "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=120&h=120&fit=crop",
  "Hearing Protection": "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=120&h=120&fit=crop",
  "Gloves": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=120&h=120&fit=crop",
  "Workwear": "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=120&h=120&fit=crop",
  "Respiratory": "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=120&h=120&fit=crop",
  // Machine Tools
  "Lathes": "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=120&h=120&fit=crop",
  "Milling": "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=120&h=120&fit=crop",
  "Metalworking": "https://images.unsplash.com/photo-1616401784845-180882c6e4ea?w=120&h=120&fit=crop",
  "Woodworking": "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=120&h=120&fit=crop",
  "CNC & Digital": "https://images.unsplash.com/photo-1619641805634-98e89225b996?w=120&h=120&fit=crop",
  // Other
  "Air Tools & Compressors": "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=120&h=120&fit=crop",
  "Storage & Workspace": "https://images.unsplash.com/photo-1530124566582-a45a7c6ec40f?w=120&h=120&fit=crop",
  "Jobsite Supplies": "https://images.unsplash.com/photo-1586864387789-628af9feed72?w=120&h=120&fit=crop",
  "Measuring Tools": "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=120&h=120&fit=crop",
  "Welding": "https://images.unsplash.com/photo-1616401784845-180882c6e4ea?w=120&h=120&fit=crop",
};

const navCategories = [
  { 
    name: "POWER TOOLS",
    subcategories: [
      { title: "Drills & Drivers", items: ["Cordless Drills", "Impact Drivers", "Hammer Drills", "Drill Presses"] },
      { title: "Saws", items: ["Circular Saws", "Miter Saws", "Table Saws", "Reciprocating Saws"] },
      { title: "Grinders & Sanders", items: ["Angle Grinders", "Bench Grinders", "Belt Sanders", "Orbital Sanders"] },
      { title: "Rotary Tools", items: ["Rotary Hammers", "Demolition Hammers", "Die Grinders", "Oscillating Tools"] },
      { title: "Multi-Tools", items: ["Oscillating Multi-Tools", "Combo Kits", "Cordless Systems", "Accessories"] },
    ]
  },
  { 
    name: "HAND TOOLS",
    subcategories: [
      { title: "Wrenches", items: ["Adjustable Wrenches", "Combination Wrenches", "Socket Sets", "Torque Wrenches"] },
      { title: "Pliers & Cutters", items: ["Needle Nose Pliers", "Lineman's Pliers", "Wire Strippers", "Diagonal Cutters"] },
      { title: "Screwdrivers", items: ["Phillips Screwdrivers", "Flathead Screwdrivers", "Precision Sets", "Insulated Sets"] },
      { title: "Hammers", items: ["Claw Hammers", "Ball Peen Hammers", "Sledgehammers", "Mallets"] },
      { title: "Clamps & Vises", items: ["Bar Clamps", "C-Clamps", "Bench Vises", "Spring Clamps"] },
    ]
  },
  { 
    name: "TOOL ACCESSORIES",
    subcategories: [
      { title: "Drill Bits", items: ["Twist Bits", "Spade Bits", "Hole Saws", "Forstner Bits"] },
      { title: "Saw Blades", items: ["Circular Saw Blades", "Jigsaw Blades", "Reciprocating Blades", "Band Saw Blades"] },
      { title: "Abrasives", items: ["Grinding Wheels", "Sanding Discs", "Flap Discs", "Cut-Off Wheels"] },
      { title: "Batteries & Chargers", items: ["Battery Packs", "Chargers", "Power Stations", "Adapters"] },
      { title: "Router Bits", items: ["Straight Bits", "Flush Trim", "Chamfer Bits", "Round Over Bits"] },
    ]
  },
  { 
    name: "FASTENERS",
    subcategories: [
      { title: "Screws", items: ["Wood Screws", "Drywall Screws", "Machine Screws", "Self-Tapping Screws"] },
      { title: "Bolts & Nuts", items: ["Hex Bolts", "Carriage Bolts", "Lag Bolts", "Lock Nuts"] },
      { title: "Anchors", items: ["Concrete Anchors", "Drywall Anchors", "Toggle Bolts", "Sleeve Anchors"] },
      { title: "Nails & Staples", items: ["Framing Nails", "Finish Nails", "Brad Nails", "Staples"] },
      { title: "Rivets & Washers", items: ["Pop Rivets", "Blind Rivets", "Flat Washers", "Lock Washers"] },
    ]
  },
  { 
    name: "STRUT & ACCESSORIES",
    subcategories: [
      { title: "Strut Channel", items: ["Standard Strut", "Slotted Strut", "Half Slot Strut", "Solid Strut"] },
      { title: "Strut Fittings", items: ["Angle Brackets", "Flat Plates", "U-Bolts", "Beam Clamps"] },
      { title: "Pipe Hangers", items: ["Clevis Hangers", "Split Ring Hangers", "Riser Clamps", "Pipe Straps"] },
      { title: "Hardware", items: ["Channel Nuts", "Spring Nuts", "Strut Straps", "End Caps"] },
      { title: "Mounting", items: ["Wall Brackets", "Ceiling Mounts", "Floor Stands", "Rail Clips"] },
    ]
  },
  { 
    name: "SAFETY & WORKWEAR",
    subcategories: [
      { title: "Eye Protection", items: ["Safety Glasses", "Goggles", "Face Shields", "Welding Helmets"] },
      { title: "Hearing Protection", items: ["Ear Plugs", "Ear Muffs", "Electronic Muffs", "Banded Plugs"] },
      { title: "Gloves", items: ["Work Gloves", "Cut Resistant", "Welding Gloves", "Disposable Gloves"] },
      { title: "Workwear", items: ["Hi-Vis Vests", "Hard Hats", "Steel Toe Boots", "Knee Pads"] },
      { title: "Respiratory", items: ["Dust Masks", "Half Respirators", "Full Face Masks", "Filters"] },
    ]
  },
  { 
    name: "MACHINE TOOLS",
    subcategories: [
      { title: "Lathes", items: ["Metal Lathes", "Wood Lathes", "Mini Lathes", "Lathe Accessories"] },
      { title: "Milling", items: ["Vertical Mills", "Drill Mills", "End Mills", "Milling Vises"] },
      { title: "Metalworking", items: ["Band Saws", "Cold Saws", "Iron Workers", "Sheet Metal Tools"] },
      { title: "Woodworking", items: ["Jointers", "Planers", "Shapers", "Dust Collectors"] },
      { title: "CNC & Digital", items: ["CNC Routers", "Laser Cutters", "3D Printers", "Software"] },
    ]
  },
  { 
    name: "OTHER",
    subcategories: [
      { title: "Air Tools & Compressors", items: ["Air Compressors", "Impact Wrenches", "Air Nailers", "Pneumatic Accessories"] },
      { title: "Storage & Workspace", items: ["Tool Boxes", "Tool Chests", "Workbenches", "Cabinets"] },
      { title: "Jobsite Supplies", items: ["Extension Cords", "Work Lights", "Ladders", "Material Handling"] },
      { title: "Measuring Tools", items: ["Tape Measures", "Levels", "Laser Levels", "Squares"] },
      { title: "Welding", items: ["MIG Welders", "TIG Welders", "Stick Welders", "Welding Accessories"] },
    ]
  },
];

const utilityLinks = [
  { name: "STORE LOCATOR", icon: "📍", href: "/store-locator" },
  { name: "SALES FLYERS", icon: "📰", href: "/sales-flyers" },
  { name: "CALENDAR", icon: "📅", href: "/events" },
  { name: "CONTACT US", icon: "📞", href: "/contact" },
  { name: "REQUEST A QUOTE", icon: "📋", href: "/quote" },
  { name: "ORDER TRACKING", icon: "🚚", href: "https://www.fastenersinc.net/account" },
];

const navButtons = [
  { name: "SHOP ALL", color: "bg-transparent", hoverColor: "hover:text-header-primary", textColor: "text-foreground", icon: ShoppingBag, hasDropdown: true, hasArrow: true, href: "https://www.fastenersinc.net/pages/search-results-page" },
  { name: "BRANDS", color: "bg-transparent", hoverColor: "hover:text-header-primary", textColor: "text-foreground", icon: Tag, hasDropdown: true, hasArrow: true, href: "https://www.fastenersinc.net/pages/brands" },
  { name: "HOT DEALS", color: "bg-header-primary", hoverColor: "hover:bg-header-primary-hover", textColor: "text-white", icon: FlameKindling, hasDropdown: false, hasArrow: false, href: "https://www.fastenersinc.net/pages/top-deals-promotions" },
  { name: "NEW PRODUCTS", color: "bg-[#2563eb]", hoverColor: "hover:bg-[#1d4ed8]", textColor: "text-white", icon: Sparkles, hasDropdown: false, hasArrow: false, href: "https://www.fastenersinc.net/pages/search-results-page?collection=new-release" },
  { name: "CLOSEOUTS", color: "bg-[#16a34a]", hoverColor: "hover:bg-[#15803d]", textColor: "text-white", icon: DollarSign, hasDropdown: false, hasArrow: false, href: "https://www.fastenersinc.net/pages/flash-sale-1" },
];

// Dropdown content with real links
const shopAllDropdown = [
  { name: "Power Tools", href: "https://www.fastenersinc.net/pages/search-results-page?collection=power-tools" },
  { name: "Hand Tools", href: "https://www.fastenersinc.net/pages/search-results-page?q=hand%20tools" },
  { name: "Tool Accessories", href: "https://www.fastenersinc.net/pages/search-results-page?q=POWER%20TOOL%20ACCESSORIES" },
  { name: "Fasteners", href: "https://www.fastenersinc.net/pages/search-results-page?q=Fasteners" },
  { name: "Storage & Workspace", href: "https://www.fastenersinc.net/pages/search-results-page?q=storage" },
  { name: "Safety & Workwear", href: "https://www.fastenersinc.net/pages/search-results-page?q=workwear" },
  { name: "Machine Tools", href: "https://www.fastenersinc.net/pages/search-results-page?q=machine%20tools" },
  { name: "Outdoor Power", href: "https://www.fastenersinc.net/pages/search-results-page?collection=outdoor-power-equipement" },
  { name: "Combo Kits", href: "https://www.fastenersinc.net/pages/search-results-page?collection=power-tool-combo-kits" },
];

const brandsDropdown = [
  { name: "DeWalt", href: "https://www.fastenersinc.net/pages/dewalt-tools-power-tools-accessories" },
  { name: "Milwaukee", href: "https://www.fastenersinc.net/pages/milwaukee-tools" },
  { name: "Makita", href: "https://www.fastenersinc.net/pages/makita-tools-makita-power-tools-accessories" },
  { name: "Klein Tools", href: "https://www.fastenersinc.net/pages/klein-tools" },
  { name: "Knipex", href: "https://www.fastenersinc.net/pages/knipex-tools-pliers" },
  { name: "Occidental Leather", href: "https://www.fastenersinc.net/pages/occidental-leather-tool-belt-systems" },
  { name: "Diablo", href: "https://www.fastenersinc.net/pages/search-results-page?collection=diablo" },
  { name: "IronClad", href: "https://www.fastenersinc.net/pages/ironclad-performance-wear-ironclad-gloves-for-professionals" },
];

// Solid filled triangle arrow - matches reference (rounded corners, filled)
const ThickArrow = ({ className = "" }: { className?: string }) => (
  <svg
    className={`inline-block shrink-0 ${className}`}
    width="12"
    height="8"
    viewBox="0 0 12 8"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M1.5 0.5C0.9 0.5 0.6 1.2 1 1.7L5.3 7.1C5.7 7.6 6.3 7.6 6.7 7.1L11 1.7C11.4 1.2 11.1 0.5 10.5 0.5H1.5Z" />
  </svg>
);

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeCategoryDropdown, setActiveCategoryDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="w-full font-sans">
      {/* Announcement Bar - Red, Thin, Centered */}
      <div className="bg-header-primary text-white py-[2px] text-[13px]">
        <div className="max-w-[1600px] mx-auto px-4 flex items-center justify-center gap-2">
          <span className="font-bold tracking-wide">BETTER TOOLS, BETTER PRICES</span>
          <span className="mx-4 opacity-70">|</span>
          <div className="hidden sm:flex items-center gap-2 font-bold">
            <Truck className="w-4 h-4" />
            <span>FREE SHIPPING OVER $149</span>
          </div>
          {/* Mobile: Show both without icon */}
          <span className="sm:hidden font-bold">FREE SHIPPING OVER $149</span>
          <span className="mx-4 opacity-70 hidden sm:inline">|</span>
          <div className="hidden sm:flex items-center gap-4 ml-2">
            {/* Facebook */}
            <a href="/" className="opacity-90 hover:opacity-100 transition-opacity">
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="/" className="opacity-90 hover:opacity-100 transition-opacity">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Utility Navigation - White Background, Seamless */}
      <div className="bg-white py-1.5 text-xs">
        <div className="max-w-[1600px] mx-auto px-4 flex items-center justify-end gap-6">
          {utilityLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-header-text hover:text-header-primary transition-colors font-bold hidden md:flex items-center gap-1"
            >
              <span>{link.icon}</span>
              {link.name}
            </a>
          ))}
        </div>
      </div>

      {/* Main Header - Seamless White */}
      <div className="bg-white py-3">
        <div className="max-w-[1600px] mx-auto px-4 flex items-center gap-6">
          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <a href="/" className="shrink-0">
            <img 
              src="https://www.fastenersinc.net/cdn/shop/files/1_d3bda63f-6526-4c24-ae79-92c71c0e4433_200x@2x.png?v=1662998949" 
              alt="Fasteners Inc" 
              className="h-12 w-auto"
            />
          </a>

          {/* Search Bar - Centered, Longer - Opens Modal */}
          <div className="flex-1 max-w-[800px] mx-auto hidden sm:block relative">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full border-2 border-header-border rounded px-4 py-2.5 text-sm text-left text-muted-foreground hover:border-header-primary transition-colors pr-12 bg-white"
            >
              Search products, brands, categories...
            </button>
            <button 
              onClick={() => setSearchOpen(true)}
              className="absolute right-0 top-0 h-full w-12 bg-header-primary text-white rounded-r flex items-center justify-center hover:bg-header-primary-hover transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Account & Cart */}
          <div className="flex items-center gap-6 ml-auto">
            <a href="https://www.fastenersinc.net/account/login" className="flex flex-col items-center text-foreground hover:text-header-primary transition-colors">
              <User className="w-5 h-5" />
              <span className="text-[11px] text-header-muted mt-0.5 hidden sm:block">Account</span>
            </a>
            <CartDrawer />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="sm:hidden px-4 mt-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full border-2 border-header-border rounded px-4 py-2.5 text-sm text-left text-muted-foreground hover:border-header-primary transition-colors bg-white flex items-center justify-between"
          >
            <span>Search products...</span>
            <Search className="w-5 h-5 text-header-primary" />
          </button>
        </div>
        
        {/* Search Modal */}
        <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
      </div>

      {/* Navigation Bar - Single Line, Seamless White */}
      <nav className="bg-white border-b border-header-border hidden lg:block">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="flex items-center">
            {/* Colored Nav Buttons - Single Line, No Wrap */}
            <div className="flex items-center gap-1.5 mr-4 shrink-0 pr-4 border-r border-header-border">
              {navButtons.map((btn) => {
                const IconComponent = btn.icon;
                return (
                  <div 
                    key={btn.name} 
                    className="relative"
                    onMouseEnter={() => btn.hasDropdown && setActiveDropdown(btn.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <a
                      href={btn.href}
                      className={`${btn.color} ${btn.hoverColor} ${btn.textColor} text-[12px] font-bold px-2.5 py-1 rounded transition-colors duration-300 whitespace-nowrap flex items-center gap-1`}
                    >
                      <IconComponent className="w-3 h-3" />
                      {btn.name}
                      {btn.hasArrow && <ThickArrow className="text-header-primary" />}
                    </a>
                    
                    {/* Dropdown for SHOP ALL */}
                    {btn.name === "SHOP ALL" && activeDropdown === "SHOP ALL" && (
                      <div className="absolute left-0 top-full mt-0 bg-white border border-header-border rounded-lg shadow-xl z-50 min-w-[200px]">
                        <ul className="py-2">
                          {shopAllDropdown.map((item) => (
                            <li key={item.name}>
                              <a href={item.href} className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-header-primary">
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Dropdown for BRANDS */}
                    {btn.name === "BRANDS" && activeDropdown === "BRANDS" && (
                      <div className="absolute left-0 top-full mt-0 bg-white border border-header-border rounded-lg shadow-xl z-50 min-w-[200px]">
                        <ul className="py-2">
                          {brandsDropdown.map((item) => (
                            <li key={item.name}>
                              <a href={item.href} className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-header-primary">
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Category Links with Red Triangle Arrows - Bold */}
            <div className="flex items-center">
              {navCategories.map((cat) => (
                <div
                  key={cat.name}
                  className="relative"
                  onMouseEnter={() => setActiveCategoryDropdown(cat.name)}
                  onMouseLeave={() => setActiveCategoryDropdown(null)}
                >
                  <a
                    href="/"
                    className="flex items-center gap-1.5 px-3 py-2.5 text-[12px] font-bold text-header-text hover:text-header-primary transition-colors whitespace-nowrap"
                  >
                    {cat.name}
                    <ThickArrow className="text-header-primary" />
                  </a>
                  
                  {/* Mega Menu Dropdown - ACME Style */}
                  {activeCategoryDropdown === cat.name && (
                    <div className="fixed left-0 right-0 top-auto mt-0 bg-white border-t border-b border-header-border shadow-xl z-50">
                      <div className="max-w-[1600px] mx-auto px-6 py-8">
                        <div className="grid grid-cols-5 gap-x-6 gap-y-6">
                          {cat.subcategories.map((subcat) => (
                            <div key={subcat.title} className="flex gap-3">
                              {/* Category Image */}
                              <div className="w-16 h-16 bg-muted rounded flex items-center justify-center shrink-0 overflow-hidden">
                                <img 
                                  src={subcategoryImages[subcat.title] || `https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=120&h=120&fit=crop`}
                                  alt={subcat.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              {/* Category Content */}
                              <div className="flex-1">
                                <h4 className="text-header-primary font-bold text-sm uppercase mb-2">
                                  {subcat.title}
                                </h4>
                                <ul className="space-y-1">
                                  {subcat.items.slice(0, 4).map((item) => (
                                    <li key={item}>
                                      <a 
                                        href="/" 
                                        className="text-sm text-foreground hover:text-header-primary hover:underline transition-colors"
                                      >
                                        {item}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                                <a 
                                  href="/" 
                                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-header-primary mt-2 font-medium"
                                >
                                  View All
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8l4 4-4 4M8 12h8" />
                                  </svg>
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-header-border">
          <div className="px-4 py-4 space-y-2">
            <div className="flex flex-wrap gap-2 mb-4">
              {navButtons.map((btn) => {
                const IconComponent = btn.icon;
                return (
                  <a
                    key={btn.name}
                    href={btn.href}
                    className={`${btn.color} ${btn.hoverColor} ${btn.textColor} text-xs font-bold px-3 py-1.5 rounded transition-colors duration-300 flex items-center gap-1`}
                  >
                    <IconComponent className="w-3 h-3" />
                    {btn.name}
                  </a>
                );
              })}
            </div>
            <div className="border-t border-header-border my-4" />
            {navCategories.map((cat) => (
              <a
                key={cat.name}
                href="/"
                className="flex items-center justify-between py-2.5 text-sm font-bold text-header-text hover:text-header-primary transition-colors"
              >
                {cat.name}
                <ThickArrow className="text-header-primary" />
              </a>
            ))}
            <div className="border-t border-header-border my-4" />
            {utilityLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 py-2 text-sm font-bold text-header-text hover:text-header-primary transition-colors"
              >
                <span>{link.icon}</span>
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
