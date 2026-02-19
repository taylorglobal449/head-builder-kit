import { useState, useEffect, useMemo, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useProduct, useProducts } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { Button } from "@/components/ui/button";
import { isMappPriced } from "@/lib/shopify/mapp";
import { Loader2, ShoppingCart, ChevronLeft, ChevronRight, Minus, Plus, Truck, Shield, RotateCcw, Check, Package } from "lucide-react";
import { toast } from "sonner";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";
import { BoughtWith } from "@/components/product/BoughtWith";
import { SEO } from "@/components/SEO";
import { TEST_PRODUCTS, type MockShopifyProduct } from "@/lib/mockProducts";


export default function ProductPage() {
  const { handle } = useParams<{ handle: string }>();
  const { product, loading, error } = useProduct(handle || '');
  const { products: allProducts } = useProducts(12);
  const { recentlyViewed, addToRecentlyViewed } = useRecentlyViewed();
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);
  
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const imageColRef = useRef<HTMLDivElement>(null);

  const selectedVariantForSeo = product?.variants.edges[selectedVariantIndex]?.node;
  const productJsonLd = useMemo(() => {
    if (!product) return null;
    const imgs = product.images.edges;
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.title,
      "description": product.description,
      "image": imgs.map(img => img.node.url),
      "brand": { "@type": "Brand", "name": product.vendor },
      "sku": selectedVariantForSeo?.sku || product.handle,
      "url": `https://head-builder-kit.lovable.app/product/${product.handle}`,
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": product.priceRange.minVariantPrice.amount,
        "availability": "https://schema.org/InStock",
        "seller": { "@type": "Organization", "name": "Fasteners Inc Tool Outlet" }
      }
    };
  }, [product, selectedVariantForSeo]);

  // Check for quantity template extras from mock data
  const mockProduct = useMemo(() => {
    return TEST_PRODUCTS.find(p => p.node.handle === handle) as MockShopifyProduct | undefined;
  }, [handle]);
  const mockExtras = useMemo(() => {
    return mockProduct?.extras?.templateType === 'quantity' ? mockProduct.extras : null;
  }, [mockProduct]);
  const standardExtras = useMemo(() => {
    return mockProduct?.extras?.templateType === 'standard' ? mockProduct.extras : null;
  }, [mockProduct]);

  // Resolve quantity discounts for the selected variant (per-size pricing)
  const activeDiscounts = useMemo(() => {
    if (!mockExtras) return null;
    // Per-variant discounts take priority
    if (mockExtras.variantQuantityDiscounts) {
      const selectedSize = product?.variants.edges[selectedVariantIndex]?.node.selectedOptions
        ?.find(opt => opt.name === 'Size')?.value;
      if (selectedSize && mockExtras.variantQuantityDiscounts[selectedSize]) {
        return mockExtras.variantQuantityDiscounts[selectedSize];
      }
      // Fallback to first variant's discounts
      const keys = Object.keys(mockExtras.variantQuantityDiscounts);
      return keys.length > 0 ? mockExtras.variantQuantityDiscounts[keys[0]] : null;
    }
    return mockExtras.quantityDiscounts || null;
  }, [mockExtras, selectedVariantIndex, product]);

  const isQtyTemplate = !!activeDiscounts;

  // Get current tier price based on quantity
  const currentTier = useMemo(() => {
    if (!activeDiscounts) return null;
    return activeDiscounts.find(
      d => quantity >= d.minQty && (d.maxQty === null || quantity <= d.maxQty)
    ) || activeDiscounts[0];
  }, [quantity, activeDiscounts]);

  const qtySubtotal = currentTier ? (currentTier.priceEach * quantity) : 0;
  const baseSubtotal = activeDiscounts?.[0] 
    ? activeDiscounts[0].priceEach * quantity 
    : 0;
  const qtySavings = baseSubtotal - qtySubtotal;
  const basePrice = activeDiscounts?.[0]?.priceEach || 0;

  // Parse description to extract features/bullet points and clean description
  const parsedContent = useMemo(() => {
    if (!product?.description) return { description: '', features: [] as string[], specs: [] as { label: string; value: string }[] };
    
    let desc = product.description;
    const features: string[] = [];
    const specs: { label: string; value: string }[] = [];
    
    // Remove CSS style blocks
    desc = desc.replace(/(?:ul|li|ol)\s*\{[^}]*\}/g, '').replace(/(?:ul|li|ol)\s*(?:::?[a-z-]+)\s*\{[^}]*\}/g, '');
    
    // Extract "Features" section
    const featuresMatch = desc.match(/Features\s*([\s\S]*?)(?:Includes|Specifications|Specs|$)/i);
    if (featuresMatch) {
      const featuresText = featuresMatch[1];
      const items = featuresText.split(/(?:\n|(?<=[a-z.!)])(?=[A-Z][a-z]))/).map(s => s.trim()).filter(s => s.length > 10);
      features.push(...items);
      desc = desc.replace(/Features\s*[\s\S]*?(?=Includes|Specifications|Specs|$)/i, '').trim();
    }
    
    // Extract "Includes" section as specs
    const includesMatch = desc.match(/Includes\s*([\s\S]*?)(?:Specifications|Specs|$)/i);
    if (includesMatch) {
      const includesText = includesMatch[1].trim();
      const items = includesText.split(/\(\d+\)\s*/).filter(s => s.trim().length > 0);
      items.forEach(item => {
        specs.push({ label: 'Includes', value: item.trim() });
      });
      desc = desc.replace(/Includes\s*[\s\S]*?(?=Specifications|Specs|$)/i, '').trim();
    }
    
    // Clean up remaining description
    desc = desc.replace(/\s{2,}/g, ' ').trim();
    
    // If no features were found, try to split long description on sentence boundaries
    if (features.length === 0 && desc.length > 200) {
      const sentences = desc.split(/(?<=\.)\s+/);
      if (sentences.length > 3) {
        const descPart = sentences.slice(0, 2).join(' ');
        const featurePart = sentences.slice(2);
        features.push(...featurePart.filter(s => s.length > 10));
        desc = descPart;
      }
    }
    
    return { description: desc, features, specs };
  }, [product?.description]);

  useEffect(() => {
    if (product) {
      addToRecentlyViewed({ node: product });
    }
  }, [product, addToRecentlyViewed]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 animate-spin text-header-primary" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-[1600px] mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">{error || "The product you're looking for doesn't exist."}</p>
          <Link to="/">
            <Button>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const selectedVariant = product.variants.edges[selectedVariantIndex]?.node;
  const images = product.images.edges;
  const hasMultipleVariants = product.variants.edges.length > 1 && product.variants.edges[0].node.title !== 'Default Title';

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      toast.error("Please select a variant");
      return;
    }
    
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || []
    });
    
    toast.success(`${product.title} added to cart`);
  };

  // --- Shared UI pieces ---
  const breadcrumb = (
    <nav className="mb-2">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        <li><Link to="/" className="hover:text-header-primary">Home</Link></li>
        <li>/</li>
        <li><Link to="/products" className="hover:text-header-primary">Products</Link></li>
        <li>/</li>
        <li className="text-foreground font-medium truncate max-w-[200px]">{product.title}</li>
      </ol>
    </nav>
  );

  const metaRow = (
    <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
      {product.vendor && (
        <>
          <span>Vendor:</span>
          <Link to={`/search?q=${encodeURIComponent(product.vendor)}`} className="font-medium text-header-primary underline hover:text-header-primary-hover">
            {product.vendor}
          </Link>
        </>
      )}
      {product.productType && (
        <>
          <span className="text-border">|</span>
          <span>Type:</span>
          <Link to={`/search?q=${encodeURIComponent(product.productType)}`} className="font-medium text-header-primary underline hover:text-header-primary-hover">
            {product.productType}
          </Link>
        </>
      )}
      {(mockExtras?.sku || selectedVariant?.sku) && (
        <>
          <span className="text-border">|</span>
          <span>SKU: <span className="font-medium text-foreground">{mockExtras?.sku || selectedVariant?.sku}</span></span>
        </>
      )}
      {standardExtras?.partNumber && (
        <>
          <span className="text-border">|</span>
          <span>Part #: <span className="font-medium text-foreground">{standardExtras.partNumber}</span></span>
        </>
      )}
      {standardExtras?.mfgPartNumber && (
        <>
          <span className="text-border">|</span>
          <span>Mfg Part #: <span className="font-medium text-foreground">{standardExtras.mfgPartNumber}</span></span>
        </>
      )}
      {standardExtras?.upc && (
        <>
          <span className="text-border">|</span>
          <span>UPC: <span className="font-medium text-foreground">{standardExtras.upc}</span></span>
        </>
      )}
    </div>
  );

  const variantSelector = hasMultipleVariants ? (
    <div className="space-y-3">
      {product.options.map((option) => (
        <div key={option.name}>
          <label className="text-sm font-medium text-foreground mb-2 block">
            {option.name}
          </label>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const variantIndex = product.variants.edges.findIndex(v => 
                v.node.selectedOptions.some(opt => opt.name === option.name && opt.value === value)
              );
              const variant = product.variants.edges[variantIndex]?.node;
              const isSelected = selectedVariant?.selectedOptions.some(
                opt => opt.name === option.name && opt.value === value
              );
              
              return (
                <button
                  key={value}
                  onClick={() => variantIndex >= 0 && setSelectedVariantIndex(variantIndex)}
                  disabled={!variant?.availableForSale}
                  className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                    isSelected 
                      ? 'border-header-primary bg-header-primary text-primary-foreground' 
                      : 'border-border hover:border-header-primary'
                  } ${!variant?.availableForSale ? 'opacity-50 cursor-not-allowed line-through' : ''}`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  ) : null;

  const trustBadges = (
    <div className="flex items-center justify-center gap-4 pt-2 border-t border-border">
      <div className="flex items-center gap-1.5">
        <Truck className="w-4 h-4 text-header-primary shrink-0" />
        <span className="text-xs text-muted-foreground">Free Shipping</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Shield className="w-4 h-4 text-header-primary shrink-0" />
        <span className="text-xs text-muted-foreground">Secure Checkout</span>
      </div>
      <div className="flex items-center gap-1.5">
        <RotateCcw className="w-4 h-4 text-header-primary shrink-0" />
        <span className="text-xs text-muted-foreground">Easy Returns</span>
      </div>
    </div>
  );

  const imageGallery = (
    <div className="space-y-3">
      <div className="relative aspect-square bg-background rounded-lg overflow-hidden group border border-border">
        {images[selectedImage]?.node ? (
          <img 
            src={images[selectedImage].node.url}
            alt={images[selectedImage].node.altText || product.title}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setSelectedImage((selectedImage - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border border-border rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => setSelectedImage((selectedImage + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border border-border rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
            <div className="absolute bottom-2 right-2 bg-background/70 text-foreground text-xs px-2 py-0.5 rounded-full">
              {selectedImage + 1} / {images.length}
            </div>
          </>
        )}
      </div>
      {/* Thumbnail strip — scrollable horizontally */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-16 h-16 rounded-md overflow-hidden border-2 shrink-0 aspect-square transition-colors ${
                selectedImage === index ? 'border-header-primary' : 'border-transparent hover:border-border'
              }`}
            >
              <img 
                src={img.node.url}
                alt={img.node.altText || `${product.title} ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const addToCartButton = (
    <Button 
      onClick={handleAddToCart}
      disabled={isCartLoading || !selectedVariant?.availableForSale}
      className="w-full bg-header-primary hover:bg-header-primary-hover text-primary-foreground py-6 text-lg"
    >
      {isCartLoading ? (
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
      ) : (
        <ShoppingCart className="w-5 h-5 mr-2" />
      )}
      {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
    </Button>
  );

  // ===================== QTY TEMPLATE LAYOUT =====================
  if (isQtyTemplate && currentTier && mockExtras) {
    return (
      <div className="min-h-screen bg-background">
        <SEO
          title={product.title}
          description={product.description?.slice(0, 155) || `Shop ${product.title} by ${product.vendor} at Fasteners Inc Tool Outlet.`}
          canonical={`https://head-builder-kit.lovable.app/product/${product.handle}`}
          jsonLd={productJsonLd}
        />
        <Header />
        
        <main className="max-w-[1600px] mx-auto px-4 py-4">
          {breadcrumb}

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-start">
            {/* Images — 2/5 width, sticky — releases when right col ends */}
            <div ref={imageColRef} className="lg:col-span-2 lg:sticky lg:top-4">
              {imageGallery}
            </div>

            {/* Right column: purchase UI + Features + Description (sticky window ends here) */}
            <div className="lg:col-span-3 space-y-3">
              {/* 1. Title */}
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                {product.title}
              </h1>

              {/* 2. Vendor | Type | SKU */}
              {metaRow}

              {/* 3. Size / Variants */}
              {variantSelector}

              {/* 4. QTY row: Qty stepper | Each price | Was price | Save% */}
              <div className="flex flex-wrap items-center gap-3 py-2 border-t border-border">
                <div className="flex items-center border border-border rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 text-center font-medium bg-transparent border-0 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-2xl font-black text-header-primary leading-none">
                  ${currentTier.priceEach.toFixed(2)}
                  <span className="text-sm font-normal text-muted-foreground ml-1">ea</span>
                </span>

                {currentTier.discount && currentTier.discount > 0 && (
                  <span className="text-lg text-muted-foreground line-through leading-none">
                    ${basePrice.toFixed(2)}
                  </span>
                )}

                {currentTier.discount && currentTier.discount > 0 && (
                  <span className="text-sm font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                    Save {currentTier.discount}%
                  </span>
                )}
              </div>

              {/* 5. Add to Cart */}
              <div className="flex flex-col gap-2.5 border-t border-border pt-3">
                <Button 
                  onClick={handleAddToCart}
                  disabled={isCartLoading || !selectedVariant?.availableForSale}
                  className="bg-header-primary hover:bg-header-primary-hover text-primary-foreground h-14 text-base font-semibold w-full rounded-md"
                >
                  <span className="font-normal text-white/75 mr-1">Total</span>
                  <span className="font-black text-lg mr-3">${qtySubtotal.toFixed(2)}</span>
                  <span className="w-px h-6 bg-white/30 mr-3" />
                  {isCartLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-1.5" />
                  ) : (
                    <ShoppingCart className="w-5 h-5 mr-1.5" />
                  )}
                  {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                {trustBadges}
              </div>

              {/* ── Features (right col, below cart) ── */}
              {mockExtras?.features && (
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 px-4 py-2.5 border-b border-border flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground uppercase tracking-wide">Features</span>
                  </div>
                  <ul className="px-4 py-3 space-y-2 columns-2 gap-6">
                    {mockExtras.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground break-inside-avoid">
                        <span className="w-1.5 h-1.5 rounded-full bg-header-primary shrink-0 mt-1.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ── Description (right col, below features) ── */}
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="bg-muted/50 px-4 py-2.5 border-b border-border">
                  <span className="text-xs font-bold text-foreground uppercase tracking-wide">Description</span>
                </div>
                <div className="px-4 py-3 space-y-3">
                  {product.description.split(/\n\n+/).map((para, i) => (
                    <p key={i} className="text-sm text-muted-foreground leading-relaxed">{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Full-width: Bulk Pricing table ── */}
          <div className="mt-6 border border-border rounded-lg overflow-hidden">
            <div className="bg-muted/50 px-4 py-2.5 border-b border-border flex items-center gap-2">
              <Package className="w-4 h-4 text-header-primary" />
              <span className="text-xs font-bold text-foreground uppercase tracking-wide">Bulk Pricing</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 divide-x divide-border">
              {activeDiscounts!.map((tier) => {
                const isActive = currentTier?.label === tier.label;
                return (
                  <button
                    key={tier.label}
                    onClick={() => setQuantity(tier.minQty)}
                    className={`px-4 py-3 text-center transition-colors ${
                      isActive ? 'bg-header-primary/10' : 'hover:bg-muted/30'
                    }`}
                  >
                    <div className={`text-xs font-semibold mb-1 ${isActive ? 'text-header-primary' : 'text-muted-foreground'}`}>
                      {tier.label}
                    </div>
                    <div className={`text-lg font-black leading-none ${isActive ? 'text-header-primary' : 'text-foreground'}`}>
                      ${tier.priceEach.toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">each</div>
                    {tier.discount ? (
                      <div className="text-xs text-green-600 font-semibold mt-1">Save {tier.discount}%</div>
                    ) : null}
                    {isActive && <Check className="w-3 h-3 text-header-primary mx-auto mt-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Frequently Bought Together */}
          <BoughtWith products={allProducts} currentHandle={handle} />

          {/* Recently Viewed */}
          <RecentlyViewed products={recentlyViewed} currentHandle={handle} />
        </main>
        <Footer />
      </div>
    );
  }

  // ===================== STANDARD TEMPLATE LAYOUT =====================

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={product.title}
        description={product.description?.slice(0, 155) || `Shop ${product.title} by ${product.vendor} at Fasteners Inc Tool Outlet.`}
        canonical={`https://head-builder-kit.lovable.app/product/${product.handle}`}
        jsonLd={productJsonLd}
      />
      <Header />
      
      <main className="max-w-[1600px] mx-auto px-4 py-4">
        {breadcrumb}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-start">
          {/* Images — 2/5 width, sticky — releases when right col ends */}
          <div ref={imageColRef} className="lg:col-span-2 lg:sticky lg:top-4">
            {imageGallery}
          </div>

          {/* Right column: purchase UI + Features + Description (sticky window defined by this column's height) */}
          <div className="lg:col-span-3 space-y-4">
            {/* 1. Title */}
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
              {product.title}
            </h1>

            {/* 2. Vendor | Type | SKU */}
            {metaRow}

            {/* MAPP price notice */}
            {isMappPriced({ node: product }) && (
              <div className="flex items-baseline gap-3">
                <span className="text-xl font-semibold text-header-primary">
                  See Price in Cart
                </span>
              </div>
            )}

            {/* Variants */}
            {variantSelector}

            {/* 3. Qty row */}
            <div className="flex flex-wrap items-center gap-3 py-2 border-t border-border">
              <div className="flex items-center border border-border rounded-md shrink-0">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-muted transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-14 text-center font-medium bg-transparent border-0 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-muted transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {!isMappPriced({ node: product }) && (
                <>
                  <span className="text-2xl font-black text-header-primary leading-none">
                    ${parseFloat(selectedVariant?.price.amount || '0').toFixed(2)}
                  </span>
                  {selectedVariant?.compareAtPrice && parseFloat(selectedVariant.compareAtPrice.amount) > parseFloat(selectedVariant.price.amount) && (
                    <>
                      <span className="text-lg text-muted-foreground line-through leading-none">
                        ${parseFloat(selectedVariant.compareAtPrice.amount).toFixed(2)}
                      </span>
                      <span className="text-sm font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                        Save {Math.round((1 - parseFloat(selectedVariant.price.amount) / parseFloat(selectedVariant.compareAtPrice.amount)) * 100)}%
                      </span>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Add to Cart */}
            <div className="flex flex-col gap-2.5 border-t border-border pt-3">
              <Button 
                onClick={handleAddToCart}
                disabled={isCartLoading || !selectedVariant?.availableForSale}
                className="bg-header-primary hover:bg-header-primary-hover text-primary-foreground h-14 text-base font-semibold w-full rounded-md"
              >
                {!isMappPriced({ node: product }) && (
                  <>
                    <span className="font-normal text-white/75 mr-1">Total</span>
                    <span className="font-black text-lg mr-3">
                      ${(parseFloat(selectedVariant?.price.amount || '0') * quantity).toFixed(2)}
                    </span>
                    <span className="w-px h-6 bg-white/30 mr-3" />
                  </>
                )}
                {isCartLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-1.5" />
                ) : (
                  <ShoppingCart className="w-5 h-5 mr-1.5" />
                )}
                {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              {trustBadges}
            </div>

            {/* ── Description (right col, below cart) ── */}
            {(() => {
              const descText = standardExtras ? product.description : (parsedContent.description || product.description || '');
              if (!descText) return null;
              return (
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 px-4 py-2.5 border-b border-border">
                    <h2 className="text-xs font-bold text-foreground uppercase tracking-wide">Description</h2>
                  </div>
                  <div className="px-4 py-3 space-y-3">
                    {descText.split(/\n\n+/).map((para, i) => (
                      <p key={i} className="text-sm text-muted-foreground leading-relaxed">{para}</p>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* ── Features (right col, below description) ── */}
            {(() => {
              const featuresList = standardExtras?.features || parsedContent.features;
              if (!featuresList.length) return null;
              return (
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 px-4 py-2.5 border-b border-border">
                    <h2 className="text-xs font-bold text-foreground uppercase tracking-wide">Features</h2>
                  </div>
                  <ul className="px-4 py-3 space-y-2 columns-2 gap-6">
                    {featuresList.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground break-inside-avoid">
                        <span className="w-1.5 h-1.5 rounded-full bg-header-primary shrink-0 mt-1.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })()}
          </div>
        </div>

        {/* ── Full-width: Specs horizontal 2-column table (page unlocks here) ── */}
        {(() => {
          const specsList = standardExtras?.specs || parsedContent.specs;
          if (!specsList.length) return null;
          return (
            <div className="mt-6 border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/50 px-4 py-2.5 border-b border-border">
                <h2 className="text-xs font-bold text-foreground uppercase tracking-wide">Specifications</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-border">
                {(() => {
                  const half = Math.ceil(specsList.length / 2);
                  return [specsList.slice(0, half), specsList.slice(half)].map((col, colIdx) => (
                    <div key={colIdx}>
                      {col.map((spec, i) => (
                        <div key={i} className={`flex text-sm border-b border-border last:border-0 ${i % 2 === 0 ? 'bg-muted/20' : ''}`}>
                          <span className="font-medium text-foreground px-3 py-2 w-2/5 border-r border-border shrink-0">{spec.label}</span>
                          <span className="text-muted-foreground px-3 py-2 flex-1">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  ));
                })()}
              </div>
            </div>
          );
        })()}

        {/* Frequently Bought Together */}
        <BoughtWith products={allProducts} currentHandle={handle} />

        {/* Recently Viewed */}
        <RecentlyViewed products={recentlyViewed} currentHandle={handle} />
      </main>
      <Footer />
    </div>
  );
}
