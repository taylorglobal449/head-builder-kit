import { useState } from "react";
import { Search, User, Menu, X, FlameKindling, DollarSign, Sparkles, ShoppingBag, Tag, Truck } from "lucide-react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchModal } from "@/components/search/SearchModal";

const navCategories = [
  { 
    name: "POWER TOOLS",
    subcategories: [
      { title: "Drills & Drivers", items: ["Cordless Drills", "Impact Drivers", "Hammer Drills", "Drill Presses"] },
      { title: "Saws", items: ["Circular Saws", "Miter Saws", "Table Saws", "Reciprocating Saws", "Jigsaws"] },
      { title: "Grinders & Sanders", items: ["Angle Grinders", "Bench Grinders", "Belt Sanders", "Orbital Sanders"] },
      { title: "Rotary Tools", items: ["Rotary Hammers", "Demolition Hammers", "Die Grinders"] },
    ]
  },
  { 
    name: "HAND TOOLS",
    subcategories: [
      { title: "Wrenches", items: ["Adjustable Wrenches", "Combination Wrenches", "Socket Sets", "Torque Wrenches"] },
      { title: "Pliers & Cutters", items: ["Needle Nose Pliers", "Lineman's Pliers", "Wire Strippers", "Diagonal Cutters"] },
      { title: "Screwdrivers", items: ["Phillips Screwdrivers", "Flathead Screwdrivers", "Precision Sets", "Insulated Sets"] },
      { title: "Hammers", items: ["Claw Hammers", "Ball Peen Hammers", "Sledgehammers", "Mallets"] },
    ]
  },
  { 
    name: "TOOL ACCESSORIES",
    subcategories: [
      { title: "Drill Bits", items: ["Twist Bits", "Spade Bits", "Hole Saws", "Forstner Bits"] },
      { title: "Saw Blades", items: ["Circular Saw Blades", "Jigsaw Blades", "Reciprocating Blades", "Band Saw Blades"] },
      { title: "Abrasives", items: ["Grinding Wheels", "Sanding Discs", "Flap Discs", "Cut-Off Wheels"] },
      { title: "Batteries & Chargers", items: ["Battery Packs", "Chargers", "Power Stations", "Adapters"] },
    ]
  },
  { 
    name: "FASTENERS",
    subcategories: [
      { title: "Screws", items: ["Wood Screws", "Drywall Screws", "Machine Screws", "Self-Tapping Screws"] },
      { title: "Bolts & Nuts", items: ["Hex Bolts", "Carriage Bolts", "Lag Bolts", "Lock Nuts"] },
      { title: "Anchors", items: ["Concrete Anchors", "Drywall Anchors", "Toggle Bolts", "Sleeve Anchors"] },
      { title: "Nails & Staples", items: ["Framing Nails", "Finish Nails", "Brad Nails", "Staples"] },
    ]
  },
  { 
    name: "STRUT & ACCESSORIES",
    subcategories: [
      { title: "Strut Channel", items: ["Standard Strut", "Slotted Strut", "Half Slot Strut", "Solid Strut"] },
      { title: "Strut Fittings", items: ["Angle Brackets", "Flat Plates", "U-Bolts", "Beam Clamps"] },
      { title: "Pipe Hangers", items: ["Clevis Hangers", "Split Ring Hangers", "Riser Clamps", "Pipe Straps"] },
      { title: "Hardware", items: ["Channel Nuts", "Spring Nuts", "Strut Straps", "End Caps"] },
    ]
  },
  { 
    name: "SAFETY & WORKWEAR",
    subcategories: [
      { title: "Eye Protection", items: ["Safety Glasses", "Goggles", "Face Shields", "Welding Helmets"] },
      { title: "Hearing Protection", items: ["Ear Plugs", "Ear Muffs", "Electronic Muffs", "Banded Plugs"] },
      { title: "Gloves", items: ["Work Gloves", "Cut Resistant", "Welding Gloves", "Disposable Gloves"] },
      { title: "Workwear", items: ["Hi-Vis Vests", "Hard Hats", "Steel Toe Boots", "Knee Pads"] },
    ]
  },
  { 
    name: "MACHINE TOOLS",
    subcategories: [
      { title: "Lathes", items: ["Metal Lathes", "Wood Lathes", "Mini Lathes", "Lathe Accessories"] },
      { title: "Milling", items: ["Vertical Mills", "Drill Mills", "End Mills", "Milling Vises"] },
      { title: "Metalworking", items: ["Band Saws", "Cold Saws", "Iron Workers", "Sheet Metal Tools"] },
      { title: "Woodworking", items: ["Jointers", "Planers", "Shapers", "Dust Collectors"] },
    ]
  },
  { 
    name: "OTHER",
    subcategories: [
      { title: "Air Tools & Compressors", items: ["Air Compressors", "Impact Wrenches", "Air Nailers", "Pneumatic Accessories"] },
      { title: "Storage & Workspace", items: ["Tool Boxes", "Tool Chests", "Workbenches", "Cabinets"] },
      { title: "Jobsite Supplies", items: ["Extension Cords", "Work Lights", "Ladders", "Material Handling"] },
      { title: "Measuring Tools", items: ["Tape Measures", "Levels", "Laser Levels", "Squares"] },
    ]
  },
];

const utilityLinks = [
  { name: "STORE LOCATOR", icon: "📍" },
  { name: "SALES FLYERS", icon: "📰" },
  { name: "CALENDAR", icon: "📅" },
  { name: "CONTACT US", icon: "📞" },
  { name: "REQUEST A QUOTE", icon: "📋" },
  { name: "ORDER TRACKING", icon: "🚚" },
];

const navButtons = [
  { name: "SHOP ALL", color: "bg-[#dc2626]", hoverColor: "hover:bg-[#b91c1c]", icon: ShoppingBag, hasDropdown: true },
  { name: "BRANDS", color: "bg-[#5b21b6]", hoverColor: "hover:bg-[#4c1d95]", icon: Tag, hasDropdown: true },
  { name: "HOT DEALS", color: "bg-[#ea580c]", hoverColor: "hover:bg-[#c2410c]", icon: FlameKindling, hasDropdown: false },
  { name: "NEW PRODUCTS", color: "bg-[#2563eb]", hoverColor: "hover:bg-[#1d4ed8]", icon: Sparkles, hasDropdown: false },
  { name: "CLOSEOUTS", color: "bg-[#16a34a]", hoverColor: "hover:bg-[#15803d]", icon: DollarSign, hasDropdown: false },
];

// Placeholder dropdown content
const shopAllDropdown = [
  "Power Tools", "Hand Tools", "Tool Accessories", "Fasteners", 
  "Strut & Accessories", "Safety & Workwear", "Machine Tools"
];

const brandsDropdown = [
  "DeWalt", "Milwaukee", "Makita", "Bosch", 
  "Stanley", "Klein Tools", "Channellock", "Ridgid"
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
            <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
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
              href="#"
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
            <a href="#" className="flex flex-col items-center text-header-text hover:text-header-primary transition-colors">
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
                      href="#"
                      className={`${btn.color} ${btn.hoverColor} text-white text-[11px] font-bold px-2.5 py-1 rounded transition-colors duration-300 whitespace-nowrap flex items-center gap-1`}
                    >
                      <IconComponent className="w-3 h-3" />
                      {btn.name}
                    </a>
                    
                    {/* Dropdown for SHOP ALL */}
                    {btn.name === "SHOP ALL" && activeDropdown === "SHOP ALL" && (
                      <div className="absolute left-0 top-full mt-0 bg-white border border-header-border rounded-lg shadow-xl z-50 min-w-[200px]">
                        <ul className="py-2">
                          {shopAllDropdown.map((item) => (
                            <li key={item}>
                              <a href="#" className="block px-4 py-2 text-sm text-header-text hover:bg-gray-100 hover:text-header-primary">
                                {item}
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
                            <li key={item}>
                              <a href="#" className="block px-4 py-2 text-sm text-header-text hover:bg-gray-100 hover:text-header-primary">
                                {item}
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
                    href="#"
                    className="flex items-center gap-1.5 px-3 py-2.5 text-[12px] font-bold text-header-text hover:text-header-primary transition-colors whitespace-nowrap"
                  >
                    {cat.name}
                    <ThickArrow className="text-header-primary" />
                  </a>
                  
                  {/* Mega Menu Dropdown - ACME Style */}
                  {activeCategoryDropdown === cat.name && (
                    <div className="fixed left-0 right-0 top-auto mt-0 bg-white border-t border-b border-header-border shadow-xl z-50">
                      <div className="max-w-[1600px] mx-auto px-6 py-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-6">
                          {cat.subcategories.map((subcat) => (
                            <div key={subcat.title} className="flex gap-4">
                              {/* Category Image Placeholder */}
                              <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center shrink-0">
                                <img 
                                  src="/placeholder.svg" 
                                  alt={subcat.title}
                                  className="w-16 h-16 object-contain"
                                />
                              </div>
                              {/* Category Content */}
                              <div className="flex-1">
                                <h4 className="text-header-primary font-bold text-sm uppercase mb-2">
                                  {subcat.title}
                                </h4>
                                <ul className="space-y-1">
                                  {subcat.items.slice(0, 5).map((item) => (
                                    <li key={item}>
                                      <a 
                                        href="#" 
                                        className="text-sm text-header-text hover:text-header-primary hover:underline transition-colors"
                                      >
                                        {item}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                                <a 
                                  href="#" 
                                  className="inline-flex items-center gap-1 text-xs text-header-muted hover:text-header-primary mt-2 font-medium"
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
                    href="#"
                    className={`${btn.color} ${btn.hoverColor} text-white text-xs font-bold px-3 py-1.5 rounded transition-colors duration-300 flex items-center gap-1`}
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
                href="#"
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
                href="#"
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
