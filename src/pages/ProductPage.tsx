import { useState, useEffect, useMemo } from "react";
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
    <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border">
      <div className="flex flex-col items-center text-center">
        <Truck className="w-6 h-6 text-header-primary mb-1" />
        <span className="text-xs text-muted-foreground">Free Shipping</span>
      </div>
      <div className="flex flex-col items-center text-center">
        <Shield className="w-6 h-6 text-header-primary mb-1" />
        <span className="text-xs text-muted-foreground">Secure Checkout</span>
      </div>
      <div className="flex flex-col items-center text-center">
        <RotateCcw className="w-6 h-6 text-header-primary mb-1" />
        <span className="text-xs text-muted-foreground">Easy Returns</span>
      </div>
    </div>
  );

  const imageGallery = (
    <div className="space-y-3">
      <div className="relative aspect-square bg-muted rounded-lg overflow-hidden group">
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
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-16 h-16 rounded-md overflow-hidden border-2 shrink-0 aspect-square ${
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            {imageGallery}

            {/* Product Info — QTY layout */}
            <div className="space-y-3">
              {/* 1. Title */}
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                {product.title}
              </h1>

              {/* 2. Vendor | Type | SKU */}
              {metaRow}

              {/* 3. Size / Variants */}
              {variantSelector}

              {/* 4. QTY row: qty + each price + regular crossed out + total */}
              <div className="flex flex-wrap items-center gap-4 py-2">
                {/* Qty selector */}
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

                {/* Each price */}
                <span className="text-2xl font-bold text-header-primary">
                  ${currentTier.priceEach.toFixed(2)}
                  <span className="text-sm font-normal text-muted-foreground ml-1">ea</span>
                </span>

                {/* Regular price crossed out (if discounted) */}
                {currentTier.discount && currentTier.discount > 0 && (
                  <span className="text-base text-muted-foreground line-through">
                    ${basePrice.toFixed(2)}
                  </span>
                )}

                {/* Savings badge */}
                {currentTier.discount && currentTier.discount > 0 && (
                  <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">
                    Save {currentTier.discount}%
                  </span>
                )}

                {/* Separator + Total */}
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Total:</span>
                  <span className="text-xl font-bold text-foreground">${qtySubtotal.toFixed(2)}</span>
                </div>
              </div>

              {qtySavings > 0 && (
                <div className="text-sm text-green-600 font-medium">
                  You save ${qtySavings.toFixed(2)} at this quantity
                </div>
              )}

              {/* 5. Add to Cart */}
              {addToCartButton}

              {/* 6. Trust Badges / Callouts */}
              {trustBadges}

              {/* 7. Bulk Pricing Chart */}
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="bg-muted/50 px-4 py-2 border-b border-border flex items-center gap-2">
                  <Package className="w-4 h-4 text-header-primary" />
                  <span className="text-sm font-bold text-foreground uppercase tracking-wide">Bulk Pricing</span>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="px-4 py-2 text-left font-semibold text-muted-foreground">Quantity</th>
                      <th className="px-4 py-2 text-right font-semibold text-muted-foreground">Price Each</th>
                      <th className="px-4 py-2 text-right font-semibold text-muted-foreground">Discount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeDiscounts!.map((tier) => {
                      const isActive = currentTier?.label === tier.label;
                      return (
                        <tr
                          key={tier.label}
                          className={`border-b border-border last:border-0 transition-colors cursor-pointer ${
                            isActive ? 'bg-header-primary/10 font-semibold' : 'hover:bg-muted/30'
                          }`}
                          onClick={() => setQuantity(tier.minQty)}
                        >
                          <td className="px-4 py-2.5 flex items-center gap-2">
                            {isActive && <Check className="w-3.5 h-3.5 text-header-primary" />}
                            <span className={isActive ? 'text-header-primary' : ''}>{tier.label}</span>
                          </td>
                          <td className={`px-4 py-2.5 text-right ${isActive ? 'text-header-primary' : ''}`}>
                            ${tier.priceEach.toFixed(2)}
                          </td>
                          <td className="px-4 py-2.5 text-right">
                            {tier.discount ? (
                              <span className="text-green-600 font-medium">{tier.discount}% off</span>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Full-width sections below the 2-col grid */}
          <div className="mt-8 space-y-6">
            {/* Description — horizontal full width */}
            {product.description && (
              <div className="border-t border-border pt-6">
                <h2 className="text-lg font-bold text-foreground mb-3">Description</h2>
                <p className="text-muted-foreground whitespace-pre-line max-w-none">{product.description}</p>
              </div>
            )}

            {/* Features */}
            {mockExtras?.features && (
              <div className="border-t border-border pt-6">
                <h2 className="text-lg font-bold text-foreground mb-3 uppercase tracking-wide">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
                  {mockExtras.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">
          {/* Images — 2/5 width */}
          <div className="lg:col-span-2">
            {imageGallery}
          </div>

          {/* Product Info — 3/5 width */}
          <div className="lg:col-span-3 space-y-4">
            {/* 1. Title */}
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
              {product.title}
            </h1>

            {/* 2. Vendor | Type | SKU */}
            {metaRow}

            {/* Price */}
            {isMappPriced({ node: product }) ? (
              <div className="flex items-baseline gap-3">
                <span className="text-xl font-semibold text-header-primary">
                  See Price in Cart
                </span>
              </div>
            ) : (
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-header-primary">
                  ${parseFloat(selectedVariant?.price.amount || '0').toFixed(2)}
                </span>
                {selectedVariant?.compareAtPrice && parseFloat(selectedVariant.compareAtPrice.amount) > parseFloat(selectedVariant.price.amount) && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      ${parseFloat(selectedVariant.compareAtPrice.amount).toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-destructive">
                      Save {Math.round((1 - parseFloat(selectedVariant.price.amount) / parseFloat(selectedVariant.compareAtPrice.amount)) * 100)}%
                    </span>
                  </>
                )}
              </div>
            )}

            {/* Variants */}
            {variantSelector}

            {/* 3. Qty + Add to Cart on same line */}
            <div className="flex items-center gap-3">
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
              <Button 
                onClick={handleAddToCart}
                disabled={isCartLoading || !selectedVariant?.availableForSale}
                className="flex-1 bg-header-primary hover:bg-header-primary-hover text-primary-foreground py-6 text-lg"
              >
                {isCartLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <ShoppingCart className="w-5 h-5 mr-2" />
                )}
                {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>

            {/* Subtotal hint */}
            {quantity > 1 && (
              <div className="text-sm text-muted-foreground">
                Subtotal ({quantity} items): <span className="font-bold text-foreground">${(parseFloat(selectedVariant?.price.amount || '0') * quantity).toFixed(2)}</span>
              </div>
            )}

            {/* Trust Badges */}
            {trustBadges}
          </div>
        </div>

        {/* Full-width sections below the 2-col grid */}
        <div className="mt-8 space-y-6">
          {/* Description */}
          {parsedContent.description && (
            <div className="border-t border-border pt-6">
              <h2 className="text-lg font-bold text-foreground mb-2">Description</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{parsedContent.description}</p>
            </div>
          )}

          {/* Features — red bullet points */}
          {(standardExtras?.features || parsedContent.features).length > 0 && (
            <div className="border-t border-border pt-6">
              <h2 className="text-lg font-bold text-foreground mb-2">Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5">
                {(standardExtras?.features || parsedContent.features).map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-header-primary shrink-0 mt-1.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specs */}
          {(standardExtras?.specs || parsedContent.specs).length > 0 && (
            <div className="border-t border-border pt-6">
              <h2 className="text-lg font-bold text-foreground mb-2">Specifications</h2>
              <div className="border border-border rounded-lg overflow-hidden max-w-2xl">
                {(standardExtras?.specs || parsedContent.specs).map((spec, i) => (
                  <div key={i} className={`flex text-sm ${i % 2 === 0 ? 'bg-muted/30' : ''}`}>
                    <span className="font-medium text-foreground px-3 py-2 w-1/3 border-r border-border">{spec.label}</span>
                    <span className="text-muted-foreground px-3 py-2 flex-1">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
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
