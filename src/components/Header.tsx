import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, User, Menu, X, FlameKindling, DollarSign, Sparkles, ShoppingBag, Tag, Truck, Wrench } from "lucide-react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchDropdown } from "@/components/search/SearchDropdown";

// Image map for subcategory thumbnails — category-specific product images
const subcategoryImages: Record<string, string> = {
  // POWER TOOLS
  "Drills & Fastening Tools": "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=120&h=120&fit=crop",
  "Saws & Cutting Tools": "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=120&h=120&fit=crop",
  "Grinding, Sanding & Finishing": "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=120&h=120&fit=crop",
  "Outdoor Power Equipment": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=120&h=120&fit=crop",
  "Specialty Power Tools": "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=120&h=120&fit=crop",
  "Power Tool Kits": "https://images.unsplash.com/photo-1581783898382-80f904e77d68?w=120&h=120&fit=crop",
  "Concrete & Masonry Tools": "https://images.unsplash.com/photo-1586864387789-628af9feed72?w=120&h=120&fit=crop",
  // HAND TOOLS
  "Striking Tools": "https://images.unsplash.com/photo-1586864387789-628af9feed72?w=120&h=120&fit=crop&q=80",
  "Wrenches & Ratcheting Tools": "https://images.unsplash.com/photo-1426927308491-6380b6a9936f?w=120&h=120&fit=crop",
  "Sockets & Accessories": "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=120&h=120&fit=crop",
  "Pliers & Cutting Tools": "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=120&h=120&fit=crop",
  "Screwdrivers & Hex Keys": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop",
  "Measuring & Layout Tools": "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=120&h=120&fit=crop",
  "Clamping & Vises": "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=120&h=120&fit=crop",
  "Cutting & Shaping Tools": "https://images.unsplash.com/photo-1597171685832-b9f8c98a07e5?w=120&h=120&fit=crop",
  "Pry Bars & Lifting Tools": "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=120&h=120&fit=crop",
  // TOOL ACCESSORIES
  "Blades & Abrasives": "https://images.unsplash.com/photo-1635946081766-1abfcd5fb3bc?w=120&h=120&fit=crop",
  "Drilling Accessories": "https://images.unsplash.com/photo-1629236714692-9f2f049a2eb0?w=120&h=120&fit=crop",
  "Fastening Accessories": "https://images.unsplash.com/photo-1611505908502-5b67e53e3a76?w=120&h=120&fit=crop",
  "Batteries & Chargers": "https://images.unsplash.com/photo-1619641805634-40e83c12bab3?w=120&h=120&fit=crop",
  "Replacement Parts & Consumables": "https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=120&h=120&fit=crop",
  // FASTENERS
  "Screws": "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=120&h=120&fit=crop&q=80",
  "Bolts": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop&q=80",
  "Nuts": "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=120&h=120&fit=crop&q=80",
  "Washers": "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=120&h=120&fit=crop&q=80",
  "Concrete & Masonry Anchors": "https://images.unsplash.com/photo-1597171685832-b9f8c98a07e5?w=120&h=120&fit=crop&q=80",
  "Drywall & Hollow Wall Anchors": "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=120&h=120&fit=crop&q=80",
  "Threaded Rod & Studs": "https://images.unsplash.com/photo-1629236714692-9f2f049a2eb0?w=120&h=120&fit=crop&q=80",
  "Rivets": "https://images.unsplash.com/photo-1611505908502-5b67e53e3a76?w=120&h=120&fit=crop&q=80",
  "Nails": "https://images.unsplash.com/photo-1635946081766-1abfcd5fb3bc?w=120&h=120&fit=crop&q=80",
  "Construction & Structural Connectors": "https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=120&h=120&fit=crop&q=80",
  "Specialty & Miscellaneous Fasteners": "https://images.unsplash.com/photo-1619641805634-40e83c12bab3?w=120&h=120&fit=crop&q=80",
  // STRUT & ACCESSORIES
  "Strut Channel": "https://images.unsplash.com/photo-1581783898382-80f904e77d68?w=120&h=120&fit=crop&q=80",
  "Angle & Flat Fittings": "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=120&h=120&fit=crop&q=80",
  "Tee & Cross Fittings": "https://images.unsplash.com/photo-1426927308491-6380b6a9936f?w=120&h=120&fit=crop&q=80",
  "Structural Brackets": "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=120&h=120&fit=crop&q=80",
  "Beam & Structural Attachments": "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=120&h=120&fit=crop&q=80",
  "Channel Nuts": "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=120&h=120&fit=crop&q=85",
  "Pipe & Conduit Supports": "https://images.unsplash.com/photo-1597171685832-b9f8c98a07e5?w=120&h=120&fit=crop&q=85",
  // SAFETY & WORKWEAR
  "Head Protection": "https://images.unsplash.com/photo-1578074349816-eaa948f0be76?w=120&h=120&fit=crop",
  "Eye & Face Protection": "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=120&h=120&fit=crop",
  "Hearing Protection": "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=120&h=120&fit=crop",
  "Hand Protection": "https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?w=120&h=120&fit=crop",
  "Protective Clothing & Workwear": "https://images.unsplash.com/photo-1621352153822-5e7391d21a51?w=120&h=120&fit=crop",
  "Foot Protection": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop",
  "Fall Protection": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=120&h=120&fit=crop",
  "Respiratory Protection": "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=120&h=120&fit=crop",
  "Jobsite Safety Equipment": "https://images.unsplash.com/photo-1574263867128-a3d5c1b1decc?w=120&h=120&fit=crop",
  "Tool Carrying & Wearable Accessories": "https://images.unsplash.com/photo-1581783898382-80f904e77d68?w=120&h=120&fit=crop&q=85",
  // MACHINE TOOLS
  "Metal Cutting Machines": "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=120&h=120&fit=crop",
  "Metal Forming Machines": "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=120&h=120&fit=crop&q=80",
  "Drilling & Boring Machines": "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=120&h=120&fit=crop&q=85",
  "Grinding & Finishing Machines": "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=120&h=120&fit=crop&q=85",
  "Milling Machines": "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=120&h=120&fit=crop&q=85",
  "Turning Machines (Lathes)": "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=120&h=120&fit=crop&q=90",
  "Sawing Machines": "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=120&h=120&fit=crop&q=85",
  "Specialty & Production Machines": "https://images.unsplash.com/photo-1586864387789-628af9feed72?w=120&h=120&fit=crop&q=85",
  // OTHER
  "Air Tools & Accessories": "https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=120&h=120&fit=crop&q=85",
  "Storage & Workspace": "https://images.unsplash.com/photo-1581783898382-80f904e77d68?w=120&h=120&fit=crop&q=90",
  "Jobsite Supplies & Material Handling": "https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=120&h=120&fit=crop&q=85",
};

const navCategories = [
  { 
    name: "POWER TOOLS",
    subcategories: [
      { title: "Drills & Fastening Tools", items: ["Drills", "Hammer Drills", "Impact Drivers", "Impact Wrenches", "Screw Guns"] },
      { title: "Saws & Cutting Tools", items: ["Circular Saws", "Reciprocating Saws", "Jig Saws", "Miter Saws", "Track Saws"] },
      { title: "Grinding, Sanding & Finishing", items: ["Angle Grinders", "Die Grinders", "Sanders", "Polishers", "Buffers"] },
      { title: "Outdoor Power Equipment", items: ["Pressure Washers", "Blowers", "String Trimmers", "Hedge Trimmers", "Chainsaws"] },
      { title: "Specialty Power Tools", items: ["Oscillating Multi-Tools", "Heat Guns", "Power Planers", "Power Shears", "Mixers"] },
      { title: "Power Tool Kits", items: ["Combo Kits"] },
      { title: "Concrete & Masonry Tools", items: ["Rotary Hammers", "Demolition Hammers", "Concrete Breakers", "Concrete Vibrators", "Rebar Cutters & Benders"] },
    ]
  },
  { 
    name: "HAND TOOLS",
    subcategories: [
      { title: "Striking Tools", items: ["Hammers", "Mallets", "Sledgehammers", "Dead Blow Hammers"] },
      { title: "Wrenches & Ratcheting Tools", items: ["Combination Wrenches", "Adjustable Wrenches", "Ratcheting Wrenches", "Torque Wrenches"] },
      { title: "Sockets & Accessories", items: ["Socket Sets", "Individual Sockets", "Extensions", "Adapters"] },
      { title: "Pliers & Cutting Tools", items: ["Pliers", "Needle-Nose Pliers", "Locking Pliers", "Wire Cutters", "Bolt Cutters"] },
      { title: "Screwdrivers & Hex Keys", items: ["Screwdrivers", "Nut Drivers", "Hex Keys", "Torx Keys"] },
      { title: "Measuring & Layout Tools", items: ["Tape Measures", "Levels", "Squares", "Calipers", "Chalk Lines"] },
      { title: "Clamping & Vises", items: ["Bar Clamps", "C-Clamps", "Spring Clamps", "Bench Vises"] },
      { title: "Cutting & Shaping Tools", items: ["Hand Saws", "Chisels", "Files", "Rasps", "Snips"] },
      { title: "Pry Bars & Lifting Tools", items: ["Pry Bars", "Wrecking Bars", "Crowbars", "Manual Jacks"] },
    ]
  },
  { 
    name: "TOOL ACCESSORIES",
    subcategories: [
      { title: "Blades & Abrasives", items: ["Circular Saw Blades", "Reciprocating Saw Blades", "Grinding Wheels", "Cut-Off Wheels", "Sanding Discs"] },
      { title: "Drilling Accessories", items: ["Twist Drill Bits", "Masonry Bits", "Step Bits", "Hole Saws", "Auger Bits"] },
      { title: "Fastening Accessories", items: ["Driver Bits", "Bit Holders", "Nut Setters", "Extensions"] },
      { title: "Batteries & Chargers", items: ["Tool Batteries", "Battery Chargers", "Power Cords & Adapters"] },
      { title: "Replacement Parts & Consumables", items: ["Carbon Brushes", "Drive Belts", "Filters", "Lubrication", "Replacement Parts"] },
    ]
  },
  {
    name: "FASTENERS",
    subcategories: [
      { title: "Screws", items: ["Wood Screws", "Machine Screws", "Sheet Metal Screws", "Self-Drilling Screws", "Lag Screws"] },
      { title: "Bolts", items: ["Hex Bolts", "Carriage Bolts", "Flange Bolts", "Eye Bolts", "U-Bolts"] },
      { title: "Nuts", items: ["Hex Nuts", "Lock Nuts", "Wing Nuts", "Flange Nuts", "Coupling Nuts"] },
      { title: "Washers", items: ["Flat Washers", "Lock Washers", "Fender Washers", "Split Lock Washers"] },
      { title: "Concrete & Masonry Anchors", items: ["Wedge Anchors", "Sleeve Anchors", "Drop-In Anchors", "Tapcon Screws"] },
      { title: "Drywall & Hollow Wall Anchors", items: ["Toggle Bolts", "Molly Bolts", "Plastic Anchors", "Self-Drilling Anchors"] },
      { title: "Threaded Rod & Studs", items: ["Threaded Rod", "Hanger Bolts", "Double-End Studs"] },
      { title: "Rivets", items: ["Blind Rivets", "Solid Rivets", "Drive Rivets", "Rivet Nuts"] },
      { title: "Nails", items: ["Common Nails", "Finish Nails", "Brad Nails", "Roofing Nails", "Framing Nails"] },
      { title: "Construction & Structural Connectors", items: ["Joist Hangers", "Angle Brackets", "Post Bases", "Straps & Ties"] },
      { title: "Specialty & Miscellaneous Fasteners", items: ["Pins", "Clips", "Retaining Rings", "Set Screws", "Thumb Screws"] },
    ],
  },
  { 
    name: "STRUT & ACCESSORIES",
    subcategories: [
      { title: "Strut Channel", items: ["Standard Strut Channel", "Shallow Strut Channel", "Back-to-Back Strut Channel", "Solid (Plain) Strut Channel"] },
      { title: "Angle & Flat Fittings", items: ["90° Angle Fittings", "Flat Plate Fittings", "Offset Fittings"] },
      { title: "Tee & Cross Fittings", items: ["Tee Fittings", "Cross Fittings", "Four-Hole Fittings"] },
      { title: "Structural Brackets", items: ["Corner Brackets", "Gussets", "Channel Brackets", "Mounting Plates"] },
      { title: "Beam & Structural Attachments", items: ["Beam Clamps", "Girder Clamps", "Structural Clips"] },
      { title: "Channel Nuts", items: ["Spring Channel Nuts", "Regular Channel Nuts", "Cone Channel Nuts", "Coil Channel Nuts"] },
      { title: "Pipe & Conduit Supports", items: ["Pipe Clamps", "Clevis Hangers", "Riser Clamps", "Conduit Clamps"] },
    ]
  },
  { 
    name: "SAFETY & WORKWEAR",
    subcategories: [
      { title: "Head Protection", items: ["Hard Hats", "Bump Caps"] },
      { title: "Eye & Face Protection", items: ["Safety Glasses", "Goggles", "Face Shields", "Welding Helmets"] },
      { title: "Hearing Protection", items: ["Earplugs", "Earmuffs"] },
      { title: "Hand Protection", items: ["Work Gloves", "Cut-Resistant Gloves", "Impact Gloves", "Chemical-Resistant Gloves"] },
      { title: "Protective Clothing & Workwear", items: ["Work Pants", "Work Shirts", "Jackets & Coats", "Hi-Vis Apparel", "FR Clothing"] },
      { title: "Foot Protection", items: ["Safety Boots", "Safety Shoes", "Toe Guards"] },
      { title: "Fall Protection", items: ["Safety Harnesses", "Lanyards", "Anchors", "Self-Retracting Lifelines"] },
      { title: "Respiratory Protection", items: ["Disposable Respirators", "Reusable Respirators", "Respirator Cartridges", "Filters"] },
      { title: "Jobsite Safety Equipment", items: ["Safety Cones", "Barricades", "Caution Tape", "Safety Signage"] },
      { title: "Tool Carrying & Wearable Accessories", items: ["Tool Belts", "Tool Pouches", "Tool Holsters", "Tool Lanyards"] },
    ]
  },
  { 
    name: "MACHINE TOOLS",
    subcategories: [
      { title: "Metal Cutting Machines", items: ["Plasma Cutting Machines", "Laser Cutting Machines", "Waterjet Cutting Machines"] },
      { title: "Metal Forming Machines", items: ["Press Brakes", "Ironworkers", "Plate Shears", "Punch Presses", "Roll Forming Machines"] },
      { title: "Drilling & Boring Machines", items: ["Drill Presses", "Radial Drilling Machines", "Magnetic Drill Presses", "Boring Machines"] },
      { title: "Grinding & Finishing Machines", items: ["Surface Grinders", "Cylindrical Grinders", "Bench Grinders", "Belt Grinding Machines"] },
      { title: "Milling Machines", items: ["Vertical Milling Machines", "Horizontal Milling Machines", "Knee Mills", "CNC Milling Machines"] },
      { title: "Turning Machines (Lathes)", items: ["Engine Lathes", "Bench Lathes", "CNC Lathes", "Toolroom Lathes"] },
      { title: "Sawing Machines", items: ["Horizontal Band Saws", "Vertical Band Saws", "Cold Saws", "Circular Saw Machines"] },
      { title: "Specialty & Production Machines", items: ["Threading Machines", "Tapping Machines", "Broaching Machines", "Slotting Machines"] },
    ]
  },
  { 
    name: "OTHER",
    subcategories: [
      { title: "Air Tools & Accessories", items: ["Air Compressors", "Portable Air Compressors", "Air Nailers", "Air Impact Wrenches", "Air Die Grinders", "Air Sanders", "Air Hoses", "Couplers & Fittings"] },
      { title: "Storage & Workspace", items: ["Toolboxes", "Tool Chests", "Tool Cabinets", "Tool Carts", "Modular Organizers", "Workbenches", "Jobsite Lights", "Radios"] },
      { title: "Jobsite Supplies & Material Handling", items: ["Hand Trucks", "Dollies", "Pallet Jacks", "Hoists", "Step Ladders", "Extension Ladders", "Lubricants", "Cleaners & Degreasers", "Duct Tape", "Adhesives"] },
    ]
  },
];

const utilityLinks = [
  { name: "STORE LOCATOR", icon: "📍", href: "/store-locator" },
  { name: "SALES FLYERS", icon: "📰", href: "/sales-flyers" },
  { name: "CALENDAR", icon: "📅", href: "/events" },
  { name: "CONTACT US", icon: "📞", href: "/contact" },
  { name: "REQUEST A QUOTE", icon: "📋", href: "/quote" },
  { name: "ORDER TRACKING", icon: "🚚", href: "/order-tracking" },
];

const navButtons = [
  { name: "SHOP ALL", color: "bg-transparent", hoverColor: "hover:text-header-primary", textColor: "text-foreground", icon: ShoppingBag, hasDropdown: false, hasArrow: false, href: "/products", internal: true },
  { name: "BRANDS", color: "bg-transparent", hoverColor: "hover:text-header-primary", textColor: "text-foreground", icon: Tag, hasDropdown: false, hasArrow: false, href: "/brands", internal: true },
  { name: "HOT DEALS", color: "bg-header-primary", hoverColor: "hover:bg-header-primary-hover", textColor: "text-white", icon: FlameKindling, hasDropdown: false, hasArrow: false, href: "/hot-deals", internal: true },
  { name: "NEW PRODUCTS", color: "bg-[#2563eb]", hoverColor: "hover:bg-[#1d4ed8]", textColor: "text-white", icon: Sparkles, hasDropdown: false, hasArrow: false, href: "/new-products", internal: true },
  { name: "CLOSEOUTS", color: "bg-[#16a34a]", hoverColor: "hover:bg-[#15803d]", textColor: "text-white", icon: DollarSign, hasDropdown: false, hasArrow: false, href: "/closeouts", internal: true },
];

const fastenersDropdown = [
  { name: "Screws", href: "/search?q=screws" },
  { name: "Bolts", href: "/search?q=bolts" },
  { name: "Nuts", href: "/search?q=nuts" },
  { name: "Washers", href: "/search?q=washers" },
  { name: "Concrete & Masonry Anchors", href: "/search?q=concrete+anchors" },
  { name: "Drywall & Hollow Wall Anchors", href: "/search?q=drywall+anchors" },
  { name: "Threaded Rod & Studs", href: "/search?q=threaded+rod" },
  { name: "Rivets", href: "/search?q=rivets" },
  { name: "Nails", href: "/search?q=nails" },
  { name: "Construction & Structural Connectors", href: "/search?q=structural+connectors" },
  { name: "Specialty & Miscellaneous Fasteners", href: "/search?q=specialty+fasteners" },
  { name: "View All Fasteners", href: "/search?q=fasteners" },
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
  { name: "DeWalt", href: "/brands/dewalt", internal: true },
  { name: "Milwaukee", href: "/brands/milwaukee", internal: true },
  { name: "Makita", href: "/brands/makita", internal: true },
  { name: "Klein Tools", href: "/brands/klein-tools", internal: true },
  { name: "Knipex", href: "/brands/knipex", internal: true },
  { name: "Occidental Leather", href: "/brands/occidental", internal: true },
  { name: "Diablo", href: "/brands/diablo", internal: true },
  { name: "IronClad", href: "/brands/ironclad", internal: true },
  { name: "View All Brands", href: "/brands", internal: true },
];

// Solid filled triangle arrow - matches reference (rounded corners, filled)
const ThickArrow = ({ className = "" }: { className?: string }) => (
  <svg
    className={`inline-block shrink-0 ${className}`}
    width="9"
    height="6"
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
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="w-full font-sans relative z-40">
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
            <a href="https://www.facebook.com/sacfasteners/" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 transition-opacity">
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/sacfasteners/" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 transition-opacity">
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
          <div className="flex-1 max-w-[800px] mx-auto hidden sm:block relative z-[60]">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              placeholder="Search products, brands, categories..."
              className="w-full border-2 border-header-border rounded px-4 py-2.5 text-sm text-foreground hover:border-header-primary focus:border-header-primary focus:outline-none transition-colors pr-12 bg-white"
              onFocus={() => setSearchOpen(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              onClick={() => {
                if (searchQuery.trim()) {
                  setSearchOpen(false);
                  window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                } else {
                  setSearchOpen(false);
                  window.location.href = '/search';
                }
              }}
              className="absolute right-0 top-0 h-full w-12 bg-header-primary text-white rounded-r flex items-center justify-center hover:bg-header-primary-hover transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <SearchDropdown open={searchOpen} onOpenChange={setSearchOpen} inputRef={searchInputRef} query={searchQuery} onQueryChange={setSearchQuery} />
          </div>

          {/* Account & Cart */}
          <div className="flex items-center gap-6 ml-auto">
            <a href="/account" className="flex flex-col items-center text-foreground hover:text-header-primary transition-colors">
              <User className="w-5 h-5" />
              <span className="text-[11px] text-header-muted mt-0.5 hidden sm:block">Account</span>
            </a>
            <CartDrawer />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="sm:hidden px-4 mt-3 relative z-[60]">
          <input
            ref={mobileSearchInputRef}
            type="text"
            value={searchQuery}
            placeholder="Search products..."
            className="w-full border-2 border-header-border rounded px-4 py-2.5 text-sm text-foreground hover:border-header-primary focus:border-header-primary focus:outline-none transition-colors pr-12 bg-white"
            onFocus={() => setSearchOpen(true)}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={() => { mobileSearchInputRef.current?.focus(); setSearchOpen(true); }}
            className="absolute right-4 top-0 h-full w-12 flex items-center justify-center"
          >
            <Search className="w-5 h-5 text-header-primary" />
          </button>
          <SearchDropdown open={searchOpen} onOpenChange={setSearchOpen} inputRef={mobileSearchInputRef} query={searchQuery} onQueryChange={setSearchQuery} />
        </div>
      </div>

      {/* Navigation Bar - Single Line, Seamless White */}
      <nav className="bg-white border-b border-header-border hidden lg:block relative z-[40]">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="flex items-center">
            {/* Colored Nav Buttons - Single Line, No Wrap */}
            <div className="flex items-center gap-[3px] mr-1.5 shrink-0 pr-1.5 border-r border-header-border">
              {navButtons.map((btn) => {
                const IconComponent = btn.icon;
                return (
                  <div 
                    key={btn.name} 
                    className="relative"
                    onMouseEnter={() => btn.hasDropdown && setActiveDropdown(btn.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {(btn as any).internal ? (
                      <Link
                        to={btn.href}
                        className={`${btn.color} ${btn.hoverColor} ${btn.textColor} text-[13px] font-bold px-1 py-1 rounded transition-colors duration-300 whitespace-nowrap flex items-center gap-0.5`}
                      >
                        <IconComponent className="w-3.5 h-3.5" />
                        {btn.name}
                        {btn.hasArrow && <ThickArrow className="text-header-primary" />}
                      </Link>
                    ) : (
                      <a
                        href={btn.href}
                        className={`${btn.color} ${btn.hoverColor} ${btn.textColor} text-[13px] font-bold px-1 py-1 rounded transition-colors duration-300 whitespace-nowrap flex items-center gap-0.5`}
                      >
                        <IconComponent className="w-3.5 h-3.5" />
                        {btn.name}
                        {btn.hasArrow && <ThickArrow className="text-header-primary" />}
                      </a>
                    )}
                    
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
                              {item.internal ? (
                                <Link to={item.href} className={`block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-header-primary ${item.name === "View All Brands" ? "font-bold border-t border-header-border mt-1 pt-3" : ""}`}>
                                  {item.name}
                                </Link>
                              ) : (
                                <a href={item.href} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-header-primary">
                                  {item.name}
                                </a>
                              )}
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
                  <Link
                    to={`/search?q=${encodeURIComponent(cat.name.toLowerCase())}`}
                    className="flex items-center gap-0.5 px-1.5 py-2 text-[13px] font-bold text-header-text hover:text-header-primary transition-colors whitespace-nowrap"
                  >
                    {cat.name}
                    <ThickArrow className="text-header-primary" />
                  </Link>
                  
                  {/* Mega Menu Dropdown */}
                  {activeCategoryDropdown === cat.name && cat.subcategories.length > 0 && (
                    <div className="fixed left-0 right-0 top-auto mt-0 bg-white border-t border-b border-header-border shadow-xl z-50">
                      <div className="max-w-[1600px] mx-auto px-6 py-8">
                        <div className="grid grid-cols-5 gap-x-6 gap-y-6">
                          {cat.subcategories.map((subcat) => (
                            <div key={subcat.title} className="flex gap-3">
                              <div className="w-16 h-16 bg-muted rounded flex items-center justify-center shrink-0 overflow-hidden">
                                <img 
                                  src={subcategoryImages[subcat.title] || `https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=120&h=120&fit=crop`}
                                  alt={subcat.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <Link 
                                  to={`/search?q=${encodeURIComponent(subcat.title.toLowerCase())}`}
                                  className="text-header-primary font-bold text-sm uppercase mb-2 block hover:underline transition-colors"
                                >
                                  {subcat.title}
                                </Link>
                                <ul className="space-y-1">
                                  {subcat.items.slice(0, 4).map((item) => (
                                    <li key={item}>
                                      <Link 
                                        to={`/search?q=${encodeURIComponent(item.toLowerCase())}`}
                                        className="text-sm text-foreground hover:text-header-primary hover:underline transition-colors"
                                      >
                                        {item}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
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
