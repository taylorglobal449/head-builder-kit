import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, User, Menu, X, FlameKindling, DollarSign, Sparkles, ShoppingBag, Tag, Truck, Wrench } from "lucide-react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchDropdown } from "@/components/search/SearchDropdown";

// Image map for subcategory thumbnails — category-specific product images
const subcategoryImages: Record<string, string> = {
  // POWER TOOLS — real product photos from fastenersinc.net CDN (white backgrounds)
  "Drills & Fastening Tools": "https://www.fastenersinc.net/cdn/shop/files/Ecomm_Large-DCB205-2C_1_1b66d8ff-2fa4-4a86-aa3a-0d48c4cf84e7_533x.jpg?v=1743799468",
  "Saws & Cutting Tools": "https://www.fastenersinc.net/cdn/shop/files/Ecomm_Large-DCCS623B_1_2324e9f7-217a-40d1-bb1d-ab86a9a1f6a9_533x.jpg?v=1743799921",
  "Grinding, Sanding & Finishing": "https://www.fastenersinc.net/cdn/shop/files/Ecomm_Large-DCW600B_1_5af6cf19-2115-45cc-9b43-3a2c20ab49ae_533x.jpg?v=1743797746",
  "Outdoor Power Equipment": "https://www.fastenersinc.net/cdn/shop/files/Ecomm_Large-DCBL722B_1_d0317bde-d598-4751-9b9b-9f813d4dd11f_533x.jpg?v=1743799704",
  "Specialty Power Tools": "https://www.fastenersinc.net/cdn/shop/files/Ecomm_Large-DCPR320B_1_533x.jpg?v=1743796767",
  "Power Tool Kits": "https://www.fastenersinc.net/cdn/shop/files/Ecomm_Large-DCBP315-2C_K1_9865d5e8-679a-44fd-9d0f-6cfde1554f74_533x.jpg?v=1743799815",
  "Concrete & Masonry Tools": "https://www.fastenersinc.net/cdn/shop/files/Ecomm_Large-DCST922B_1_93af2c19-25d8-4ff4-9731-df67f20326ce_533x.jpg?v=1743797474",
  // HAND TOOLS
  "Striking Tools": "https://www.fastenersinc.net/cdn/shop/files/CRS_NPWC10_IMG_PART_01_533x.jpg?v=1734662214",
  "Wrenches & Ratcheting Tools": "https://www.fastenersinc.net/cdn/shop/files/CRS_AC2610CVS_IMG_MAIN_2_533x.jpg?v=1742020973",
  "Sockets & Accessories": "https://www.fastenersinc.net/cdn/shop/files/CRS_7SRPS_IMG_MAIN_01_533x.jpg?v=1734661899",
  "Pliers & Cutting Tools": "https://www.fastenersinc.net/cdn/shop/files/CRS_RTZ28CG_IMG-ANGLE_533x.jpg?v=1734662210",
  "Screwdrivers & Hex Keys": "https://www.fastenersinc.net/cdn/shop/files/CRS_5428CVN_MAIN_533x.jpg?v=1734661915",
  "Measuring & Layout Tools": "https://www.fastenersinc.net/cdn/shop/files/CRS_8WSCSA_IMG_MAIN_01_533x.jpg?v=1760043067",
  "Clamping & Vises": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_832de4ef-10b0-47ed-823c-d70dba4b4c3d_533x.jpg?v=1734663300",
  "Cutting & Shaping Tools": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_593c1a37-3e5d-4723-8882-44353699cf9c_533x.jpg?v=1734663299",
  "Pry Bars & Lifting Tools": "https://www.fastenersinc.net/cdn/shop/files/CRS_NPWC10_IMG_PART_01_533x.jpg?v=1734662214",
  // TOOL ACCESSORIES
  "Blades & Abrasives": "https://www.fastenersinc.net/cdn/shop/products/Dewalt-DW1589_01_7fc9e29f-a513-4749-97da-5bb229e60a8a_533x.jpg?v=1734661198",
  "Drilling Accessories": "https://www.fastenersinc.net/cdn/shop/products/Dewalt-DW1589_01_7fc9e29f-a513-4749-97da-5bb229e60a8a_533x.jpg?v=1734661198",
  "Fastening Accessories": "https://www.fastenersinc.net/cdn/shop/files/Ecomm_Large-DCB205_2_26bc3816-db54-4153-9b6a-9646e4d93428_533x.jpg?v=1759302420",
  "Batteries & Chargers": "https://www.fastenersinc.net/cdn/shop/files/Ecomm_Large-DCB609-2_1_53cf2696-85e9-4e83-a893-0d36035001c5_533x.jpg?v=1743799671",
  "Replacement Parts & Consumables": "https://www.fastenersinc.net/cdn/shop/files/Ecomm_Large-DCB205-2C_1_1b66d8ff-2fa4-4a86-aa3a-0d48c4cf84e7_533x.jpg?v=1743799468",
  // FASTENERS
  "Screws": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_grande_ac6d60d7-0a1a-4cf2-956e-2f7890c50688_533x.jpg?v=1734663735",
  "Bolts": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_grande_ac6d60d7-0a1a-4cf2-956e-2f7890c50688_533x.jpg?v=1734663735",
  "Nuts": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_grande_ac6d60d7-0a1a-4cf2-956e-2f7890c50688_533x.jpg?v=1734663735",
  "Washers": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_grande_ac6d60d7-0a1a-4cf2-956e-2f7890c50688_533x.jpg?v=1734663735",
  "Concrete & Masonry Anchors": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_grande_ac6d60d7-0a1a-4cf2-956e-2f7890c50688_533x.jpg?v=1734663735",
  "Drywall & Hollow Wall Anchors": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_grande_ac6d60d7-0a1a-4cf2-956e-2f7890c50688_533x.jpg?v=1734663735",
  "Threaded Rod & Studs": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_grande_ac6d60d7-0a1a-4cf2-956e-2f7890c50688_533x.jpg?v=1734663735",
  "Rivets": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_grande_ac6d60d7-0a1a-4cf2-956e-2f7890c50688_533x.jpg?v=1734663735",
  "Nails": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_grande_ac6d60d7-0a1a-4cf2-956e-2f7890c50688_533x.jpg?v=1734663735",
  "Construction & Structural Connectors": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_grande_ac6d60d7-0a1a-4cf2-956e-2f7890c50688_533x.jpg?v=1734663735",
  "Specialty & Miscellaneous Fasteners": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_grande_ac6d60d7-0a1a-4cf2-956e-2f7890c50688_533x.jpg?v=1734663735",
  // STRUT & ACCESSORIES
  "Strut Channel": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_6e7d97ff-caaa-4854-a41b-1e61c6b007ed_533x.jpg?v=1661451537",
  "Angle & Flat Fittings": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_6e7d97ff-caaa-4854-a41b-1e61c6b007ed_533x.jpg?v=1661451537",
  "Tee & Cross Fittings": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_6e7d97ff-caaa-4854-a41b-1e61c6b007ed_533x.jpg?v=1661451537",
  "Structural Brackets": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_6e7d97ff-caaa-4854-a41b-1e61c6b007ed_533x.jpg?v=1661451537",
  "Beam & Structural Attachments": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_6e7d97ff-caaa-4854-a41b-1e61c6b007ed_533x.jpg?v=1661451537",
  "Channel Nuts": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_6e7d97ff-caaa-4854-a41b-1e61c6b007ed_533x.jpg?v=1661451537",
  "Pipe & Conduit Supports": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_6e7d97ff-caaa-4854-a41b-1e61c6b007ed_533x.jpg?v=1661451537",
  // SAFETY & WORKWEAR
  "Head Protection": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_832de4ef-10b0-47ed-823c-d70dba4b4c3d_533x.jpg?v=1734663300",
  "Eye & Face Protection": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_593c1a37-3e5d-4723-8882-44353699cf9c_533x.jpg?v=1734663299",
  "Hearing Protection": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_832de4ef-10b0-47ed-823c-d70dba4b4c3d_533x.jpg?v=1734663300",
  "Hand Protection": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_593c1a37-3e5d-4723-8882-44353699cf9c_533x.jpg?v=1734663299",
  "Protective Clothing & Workwear": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_832de4ef-10b0-47ed-823c-d70dba4b4c3d_533x.jpg?v=1734663300",
  "Foot Protection": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_593c1a37-3e5d-4723-8882-44353699cf9c_533x.jpg?v=1734663299",
  "Fall Protection": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_832de4ef-10b0-47ed-823c-d70dba4b4c3d_533x.jpg?v=1734663300",
  "Respiratory Protection": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_593c1a37-3e5d-4723-8882-44353699cf9c_533x.jpg?v=1734663299",
  "Jobsite Safety Equipment": "https://www.fastenersinc.net/cdn/shop/files/Ecomm_Large-DCL074_1_533x.jpg?v=1743798307",
  "Tool Carrying & Wearable Accessories": "https://www.fastenersinc.net/cdn/shop/products/s-l1600_832de4ef-10b0-47ed-823c-d70dba4b4c3d_533x.jpg?v=1734663300",
  // MACHINE TOOLS
  "Metal Cutting Machines": "https://www.fastenersinc.net/cdn/shop/files/Ecomm_Large-DCCS623B_1_2324e9f7-217a-40d1-bb1d-ab86a9a1f6a9_533x.jpg?v=1743799921",
  "Metal Forming Machines": "https://www.fastenersinc.net/cdn/shop/files/Ecomm_Large-DCW600B_1_5af6cf19-2115-45cc-9b43-3a2c20ab49ae_533x.jpg?v=1743797746",
  "Drilling & Boring Machines": "https://www.fastenersinc.net/cdn/shop/files/Ecomm_Large-DCB205-2C_1_1b66d8ff-2fa4-4a86-aa3a-0d48c4cf84e7_533x.jpg?v=1743799468",
  "Grinding & Finishing Machines": "https://www.fastenersinc.net/cdn/shop/files/Ecomm_Large-DCW600B_1_5af6cf19-2115-45cc-9b43-3a2c20ab49ae_533x.jpg?v=1743797746",
  "Milling Machines": "https://www.fastenersinc.net/cdn/shop/files/Ecomm_Large-DCST922B_1_93af2c19-25d8-4ff4-9731-df67f20326ce_533x.jpg?v=1743797474",
  "Turning Machines (Lathes)": "https://www.fastenersinc.net/cdn/shop/files/Ecomm_Large-DCPR320B_1_533x.jpg?v=1743796767",
  "Sawing Machines": "https://www.fastenersinc.net/cdn/shop/files/Ecomm_Large-DCCS623B_1_2324e9f7-217a-40d1-bb1d-ab86a9a1f6a9_533x.jpg?v=1743799921",
  "Specialty & Production Machines": "https://www.fastenersinc.net/cdn/shop/files/Ecomm_Large-DCL074_1_533x.jpg?v=1743798307",
  // OTHER
  "Air Tools & Accessories": "https://www.fastenersinc.net/cdn/shop/files/Ecomm_Large-DCBL722B_1_d0317bde-d598-4751-9b9b-9f813d4dd11f_533x.jpg?v=1743799704",
  "Storage & Workspace": "https://www.fastenersinc.net/cdn/shop/files/Ecomm_Large-DCL074_1_533x.jpg?v=1743798307",
  "Jobsite Supplies & Material Handling": "https://www.fastenersinc.net/cdn/shop/files/Ecomm_Large-DCST922B_1_93af2c19-25d8-4ff4-9731-df67f20326ce_533x.jpg?v=1743797474",
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
