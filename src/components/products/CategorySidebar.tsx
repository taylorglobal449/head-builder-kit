import { useState, useMemo } from "react";
import { ChevronRight, ChevronDown, Search, Minus, Plus } from "lucide-react";
import type { CategoryNode } from "@/lib/categoryTaxonomy";

interface CategoryTreeItemProps {
  node: CategoryNode;
  selectedId: string | null;
  onSelect: (node: CategoryNode) => void;
  depth?: number;
}

function CategoryTreeItem({ node, selectedId, onSelect, depth = 0 }: CategoryTreeItemProps) {
  const [open, setOpen] = useState(false);
  const hasChildren = node.children.length > 0;
  const isSelected = selectedId === node.id;

  return (
    <div>
      <button
        onClick={() => {
          onSelect(node);
          if (hasChildren) setOpen(!open);
        }}
        className={`w-full flex items-center gap-1.5 text-left transition-colors group py-1 text-[13px] ${
          isSelected
            ? "text-header-primary font-semibold"
            : "text-foreground/80 hover:text-header-primary"
        }`}
        style={{ paddingLeft: `${depth * 16 + 4}px` }}
      >
        {hasChildren ? (
          open ? (
            <ChevronDown className="w-3 h-3 shrink-0 text-header-primary" />
          ) : (
            <ChevronRight className="w-3 h-3 shrink-0 opacity-50 group-hover:opacity-100" />
          )
        ) : (
          <span className="w-3 shrink-0" />
        )}
        <span className="truncate">{node.name}</span>
      </button>
      {open && hasChildren && (
        <div>
          {node.children.map((child) => (
            <CategoryTreeItem
              key={child.id}
              node={child}
              selectedId={selectedId}
              onSelect={onSelect}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ───── Collapsible Filter Section ───── */
function FilterSection({
  title,
  defaultOpen = false,
  forceOpen,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  forceOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const isOpen = forceOpen || open;

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 text-sm font-bold text-foreground uppercase tracking-wide"
      >
        {title}
        {isOpen ? <Minus className="w-4 h-4 opacity-50" /> : <Plus className="w-4 h-4 opacity-50" />}
      </button>
      {isOpen && <div className="pb-3">{children}</div>}
    </div>
  );
}

/* ───── Scrollable checkbox list with "Show More" ───── */
const INITIAL_SHOW = 8;

function CheckboxFilterList({
  items,
  selected,
  onToggle,
  searchable = false,
  searchPlaceholder = "Search...",
}: {
  items: string[];
  selected: string[];
  onToggle: (item: string) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    if (!searchTerm) return items;
    const lower = searchTerm.toLowerCase();
    return items.filter((i) => i.toLowerCase().includes(lower));
  }, [items, searchTerm]);

  // Selected items always appear at the top
  const sorted = useMemo(() => {
    const sel = filtered.filter((i) => selected.includes(i));
    const rest = filtered.filter((i) => !selected.includes(i));
    return [...sel, ...rest];
  }, [filtered, selected]);

  const visible = showAll ? sorted : sorted.slice(0, INITIAL_SHOW);
  const hasMore = sorted.length > INITIAL_SHOW;

  return (
    <div>
      {searchable && (
        <div className="relative mb-2">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowAll(true);
            }}
            placeholder={searchPlaceholder}
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-border rounded bg-card focus:outline-none focus:ring-1 focus:ring-header-primary/40"
          />
        </div>
      )}

      <div
        className={`space-y-0.5 overflow-y-auto transition-all ${
          showAll && sorted.length > 12 ? "max-h-64" : ""
        }`}
      >
        {visible.map((item) => (
          <label
            key={item}
            className="flex items-center gap-2 cursor-pointer text-[13px] text-foreground/80 hover:text-foreground py-[3px] px-1 rounded hover:bg-muted/50"
          >
            <input
              type="checkbox"
              checked={selected.includes(item)}
              onChange={() => onToggle(item)}
              className="rounded border-border text-header-primary focus:ring-header-primary w-3.5 h-3.5 accent-header-primary shrink-0"
            />
            <span className="truncate">{item}</span>
          </label>
        ))}
      </div>

      {hasMore && !searchTerm && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-1.5 text-xs font-semibold text-header-primary hover:underline"
        >
          {showAll ? "Show Less" : `Show More (${sorted.length - INITIAL_SHOW})`}
        </button>
      )}

      {searchTerm && sorted.length === 0 && (
        <p className="text-xs text-muted-foreground py-1">No matches found</p>
      )}
    </div>
  );
}

/* ───── Main Sidebar ───── */
interface CategorySidebarProps {
  categories: CategoryNode[];
  selectedCategoryId: string | null;
  onSelectCategory: (node: CategoryNode | null) => void;
  brands: string[];
  selectedBrands: string[];
  onToggleBrand: (brand: string) => void;
  types: string[];
  selectedTypes: string[];
  onToggleType: (type: string) => void;
  priceRange: [number, number] | null;
  minPrice: number;
  maxPrice: number;
  onPriceChange: (range: [number, number] | null) => void;
  showInStockOnly: boolean;
  onToggleInStock: () => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function CategorySidebar({
  categories,
  selectedCategoryId,
  onSelectCategory,
  brands,
  selectedBrands,
  onToggleBrand,
  productTypes,
  selectedProductTypes,
  onToggleProductType,
  types,
  selectedTypes,
  onToggleType,
  priceRange,
  minPrice,
  maxPrice,
  onPriceChange,
  showInStockOnly,
  onToggleInStock,
  onClearFilters,
  hasActiveFilters,
}: CategorySidebarProps) {
  return (
    <div>
      {/* Category Tree */}
      <FilterSection title="Category">
        <button
          onClick={() => onSelectCategory(null)}
          className={`w-full text-left text-[13px] py-1 px-1 rounded transition-colors ${
            !selectedCategoryId
              ? "text-header-primary font-semibold"
              : "text-foreground/80 hover:text-header-primary"
          }`}
        >
          All Categories
        </button>
        <div className="max-h-72 overflow-y-auto">
          {categories.map((cat) => (
            <CategoryTreeItem
              key={cat.id}
              node={cat}
              selectedId={selectedCategoryId}
              onSelect={(n) => onSelectCategory(n)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Brand Filter */}
      <FilterSection title="Brand">
        <CheckboxFilterList
          items={brands}
          selected={selectedBrands}
          onToggle={onToggleBrand}
          searchable
          searchPlaceholder="Search brands..."
        />
      </FilterSection>

      {/* Product Types (contextual Level 3 types) */}
      {types.length > 0 && (
        <FilterSection title="Product Types" forceOpen={types.length > 0}>
          <CheckboxFilterList
            items={types}
            selected={selectedTypes}
            onToggle={onToggleType}
            searchable
            searchPlaceholder="Search types..."
          />
        </FilterSection>
      )}

      {/* Price Filter */}
      <FilterSection title="Price">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
            <input
              type="number"
              placeholder="Min"
              value={priceRange?.[0] ?? ""}
              onChange={(e) => {
                const val = e.target.value ? parseFloat(e.target.value) : minPrice;
                onPriceChange([val, priceRange?.[1] ?? maxPrice]);
              }}
              className="w-full pl-5 pr-2 py-1.5 border border-border rounded text-sm bg-card focus:outline-none focus:ring-1 focus:ring-header-primary/40"
            />
          </div>
          <span className="text-muted-foreground text-xs">to</span>
          <div className="relative flex-1">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange?.[1] ?? ""}
              onChange={(e) => {
                const val = e.target.value ? parseFloat(e.target.value) : maxPrice;
                onPriceChange([priceRange?.[0] ?? minPrice, val]);
              }}
              className="w-full pl-5 pr-2 py-1.5 border border-border rounded text-sm bg-card focus:outline-none focus:ring-1 focus:ring-header-primary/40"
            />
          </div>
        </div>
      </FilterSection>

      {/* Availability Filter */}
      <FilterSection title="Availability">
        <label className="flex items-center gap-2 cursor-pointer text-[13px] text-foreground/80 hover:text-foreground py-[3px] px-1 rounded hover:bg-muted/50">
          <input
            type="checkbox"
            checked={showInStockOnly}
            onChange={onToggleInStock}
            className="rounded border-border text-header-primary focus:ring-header-primary w-3.5 h-3.5 accent-header-primary"
          />
          In Stock Only
        </label>
      </FilterSection>

      {/* Clear Filters — text link */}
      {hasActiveFilters && (
        <div className="pt-3">
          <button
            onClick={onClearFilters}
            className="text-sm font-semibold text-header-primary hover:underline"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
