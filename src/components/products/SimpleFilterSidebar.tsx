import { useState } from "react";
import { Minus, Plus } from "lucide-react";

interface SimpleFilterSidebarProps {
  categories: { id: string; title: string }[];
  selectedCategory: string | null;
  onSelectCategory: (id: string | null) => void;
  brands: string[];
  brandCounts?: Map<string, number>;
  selectedBrands: string[];
  onToggleBrand: (brand: string) => void;
  showInStockOnly: boolean;
  onToggleInStock: () => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

function FilterSection({ title, defaultOpen = true, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-3 text-sm font-bold text-foreground uppercase tracking-wide">
        {title}
        {open ? <Minus className="w-4 h-4 opacity-50" /> : <Plus className="w-4 h-4 opacity-50" />}
      </button>
      {open && <div className="pb-3">{children}</div>}
    </div>
  );
}

export function SimpleFilterSidebar({
  categories, selectedCategory, onSelectCategory,
  brands, brandCounts, selectedBrands, onToggleBrand,
  showInStockOnly, onToggleInStock,
  onClearFilters, hasActiveFilters,
}: SimpleFilterSidebarProps) {
  const [showAllBrands, setShowAllBrands] = useState(false);
  const visibleBrands = showAllBrands ? brands : brands.slice(0, 8);

  return (
    <div>
      {/* Category Filter */}
      <FilterSection title="Category">
        <button
          onClick={() => onSelectCategory(null)}
          className={`w-full text-left text-[13px] py-1 px-1 rounded transition-colors ${
            !selectedCategory ? "text-header-primary font-semibold" : "text-foreground/80 hover:text-header-primary"
          }`}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`w-full text-left text-[13px] py-1 px-1 rounded transition-colors ${
              selectedCategory === cat.id ? "text-header-primary font-semibold" : "text-foreground/80 hover:text-header-primary"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </FilterSection>

      {/* Brand Filter */}
      <FilterSection title="Brand">
        <div className="space-y-0.5">
          {visibleBrands.map((brand) => {
            const count = brandCounts?.get(brand);
            return (
              <label key={brand} className="flex items-center gap-2 cursor-pointer text-[13px] text-foreground/80 hover:text-foreground py-[3px] px-1 rounded hover:bg-muted/50">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => onToggleBrand(brand)}
                  className="rounded border-border text-header-primary focus:ring-header-primary w-3.5 h-3.5 accent-header-primary shrink-0"
                />
                <span className="truncate">{brand}</span>
                {count !== undefined && <span className="ml-auto text-[11px] text-muted-foreground shrink-0">({count})</span>}
              </label>
            );
          })}
        </div>
        {brands.length > 8 && (
          <button onClick={() => setShowAllBrands(!showAllBrands)} className="mt-1.5 text-xs font-semibold text-header-primary hover:underline">
            {showAllBrands ? "Show Less" : `Show More (${brands.length - 8})`}
          </button>
        )}
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability">
        <label className="flex items-center gap-2 cursor-pointer text-[13px] text-foreground/80 hover:text-foreground py-[3px] px-1 rounded hover:bg-muted/50">
          <input type="checkbox" checked={showInStockOnly} onChange={onToggleInStock} className="rounded border-border text-header-primary focus:ring-header-primary w-3.5 h-3.5 accent-header-primary" />
          In Stock Only
        </label>
      </FilterSection>

      {hasActiveFilters && (
        <div className="pt-3">
          <button onClick={onClearFilters} className="text-sm font-semibold text-header-primary hover:underline">
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
