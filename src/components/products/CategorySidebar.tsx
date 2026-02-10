import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
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
  const isLevel1 = depth === 0;

  return (
    <div>
      <button
        onClick={() => {
          onSelect(node);
          if (hasChildren) setOpen(!open);
        }}
        className={`w-full flex items-center gap-1.5 text-left transition-colors group ${
          isLevel1
            ? "py-2 text-sm font-bold text-foreground hover:text-header-primary"
            : "py-1 pl-3 text-[13px] text-muted-foreground hover:text-header-primary"
        } ${isSelected ? "text-header-primary font-semibold" : ""}`}
        style={{ paddingLeft: depth > 1 ? `${depth * 12}px` : undefined }}
      >
        {hasChildren ? (
          open ? (
            <ChevronDown className="w-3.5 h-3.5 shrink-0 text-header-primary" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-40 group-hover:opacity-100" />
          )
        ) : (
          <span className="w-3.5 shrink-0" />
        )}
        <span className="truncate">{node.name}</span>
      </button>
      {open && hasChildren && (
        <div className={isLevel1 ? "border-l border-border ml-2" : "ml-1"}>
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

interface CategorySidebarProps {
  categories: CategoryNode[];
  selectedCategoryId: string | null;
  onSelectCategory: (node: CategoryNode | null) => void;
  // Filters
  brands: string[];
  selectedBrands: string[];
  onToggleBrand: (brand: string) => void;
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
  priceRange,
  minPrice,
  maxPrice,
  onPriceChange,
  showInStockOnly,
  onToggleInStock,
  onClearFilters,
  hasActiveFilters,
}: CategorySidebarProps) {
  const [brandsExpanded, setBrandsExpanded] = useState(true);
  const [priceExpanded, setPriceExpanded] = useState(true);
  const [availExpanded, setAvailExpanded] = useState(true);

  return (
    <div className="space-y-1">
      {/* Categories */}
      <div className="mb-4">
        <button
          onClick={() => onSelectCategory(null)}
          className={`w-full text-left text-xs font-black uppercase tracking-wider py-2 border-b-2 border-header-primary mb-1 ${
            !selectedCategoryId ? "text-header-primary" : "text-foreground hover:text-header-primary"
          }`}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <CategoryTreeItem
            key={cat.id}
            node={cat}
            selectedId={selectedCategoryId}
            onSelect={(n) => onSelectCategory(n)}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-border pt-3" />

      {/* Brand Filter */}
      <div>
        <button
          onClick={() => setBrandsExpanded(!brandsExpanded)}
          className="w-full flex items-center justify-between py-2 text-xs font-black uppercase tracking-wider text-foreground"
        >
          Brand
          {brandsExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        {brandsExpanded && (
          <div className="space-y-1 pb-3">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-2 cursor-pointer text-[13px] text-muted-foreground hover:text-foreground py-0.5"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => onToggleBrand(brand)}
                  className="rounded border-border text-header-primary focus:ring-header-primary w-3.5 h-3.5 accent-header-primary"
                />
                {brand}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border pt-3" />

      {/* Price Filter */}
      <div>
        <button
          onClick={() => setPriceExpanded(!priceExpanded)}
          className="w-full flex items-center justify-between py-2 text-xs font-black uppercase tracking-wider text-foreground"
        >
          Price
          {priceExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        {priceExpanded && (
          <div className="pb-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange?.[0] ?? ""}
                  onChange={(e) => {
                    const val = e.target.value ? parseFloat(e.target.value) : minPrice;
                    onPriceChange([val, priceRange?.[1] ?? maxPrice]);
                  }}
                  className="w-full px-2 py-1.5 border border-border rounded text-sm bg-card"
                />
              </div>
              <span className="text-muted-foreground">—</span>
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange?.[1] ?? ""}
                  onChange={(e) => {
                    const val = e.target.value ? parseFloat(e.target.value) : maxPrice;
                    onPriceChange([priceRange?.[0] ?? minPrice, val]);
                  }}
                  className="w-full px-2 py-1.5 border border-border rounded text-sm bg-card"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-border pt-3" />

      {/* Availability Filter */}
      <div>
        <button
          onClick={() => setAvailExpanded(!availExpanded)}
          className="w-full flex items-center justify-between py-2 text-xs font-black uppercase tracking-wider text-foreground"
        >
          Availability
          {availExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        {availExpanded && (
          <div className="pb-3">
            <label className="flex items-center gap-2 cursor-pointer text-[13px] text-muted-foreground hover:text-foreground">
              <input
                type="checkbox"
                checked={showInStockOnly}
                onChange={onToggleInStock}
                className="rounded border-border text-header-primary focus:ring-header-primary w-3.5 h-3.5 accent-header-primary"
              />
              In Stock Only
            </label>
          </div>
        )}
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <>
          <div className="border-t border-border pt-3" />
          <button
            onClick={onClearFilters}
            className="w-full py-2 text-sm font-bold text-header-primary hover:underline text-center"
          >
            Clear All Filters
          </button>
        </>
      )}
    </div>
  );
}
