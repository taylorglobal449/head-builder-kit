import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { useMockProduct } from "@/hooks/useMockProducts";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart, ChevronLeft, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import type { QuantityDiscount } from "@/lib/mockProducts";

export default function ProductPage() {
  const { handle } = useParams<{ handle: string }>();
  const { product, extras, loading, error } = useMockProduct(handle || '');
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);
  
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Calculate current price based on quantity discounts
  const currentPricing = useMemo(() => {
    if (!extras?.quantityDiscounts || extras.quantityDiscounts.length === 0) {
      return null;
    }
    
    const basePrice = parseFloat(product?.variants.edges[selectedVariantIndex]?.node.price.amount || '0');
    const discount = extras.quantityDiscounts.find(d => 
      quantity >= d.minQty && (d.maxQty === null || quantity <= d.maxQty)
    );
    
    if (!discount) return { priceEach: basePrice, total: basePrice * quantity, discount: 0 };
    
    return {
      priceEach: discount.priceEach,
      total: discount.priceEach * quantity,
      discount: discount.discount || 0
    };
  }, [extras?.quantityDiscounts, quantity, product, selectedVariantIndex]);

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
  const hasQuantityDiscounts = extras?.quantityDiscounts && extras.quantityDiscounts.length > 0;

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-[1600px] mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-header-primary">Home</Link></li>
            <li>/</li>
            <li><Link to="/products" className="hover:text-header-primary">Products</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium truncate max-w-[200px]">{product.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
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
            </div>
            
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 shrink-0 ${
                      selectedImage === index ? 'border-header-primary' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={img.node.url}
                      alt={img.node.altText || `${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Vendor & Title */}
            {product.vendor && (
              <span className="text-sm text-muted-foreground uppercase tracking-wide">
                {product.vendor}
              </span>
            )}
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-header-primary">
                ${currentPricing ? currentPricing.priceEach.toFixed(2) : parseFloat(selectedVariant?.price.amount || '0').toFixed(2)}
              </span>
              {currentPricing && currentPricing.discount > 0 && (
                <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded">
                  {currentPricing.discount}% OFF
                </span>
              )}
              {!currentPricing && selectedVariant?.compareAtPrice && parseFloat(selectedVariant.compareAtPrice.amount) > parseFloat(selectedVariant.price.amount) && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ${parseFloat(selectedVariant.compareAtPrice.amount).toFixed(2)}
                  </span>
                  <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded">
                    Save ${(parseFloat(selectedVariant.compareAtPrice.amount) - parseFloat(selectedVariant.price.amount)).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Quantity Price Breaks */}
            {hasQuantityDiscounts && extras?.quantityDiscounts && (
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="bg-muted px-4 py-2 border-b border-border">
                  <h3 className="font-semibold text-foreground text-sm">Quantity Pricing</h3>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left px-4 py-2 font-medium text-muted-foreground">Quantity</th>
                      <th className="text-right px-4 py-2 font-medium text-muted-foreground">Price Each</th>
                      <th className="text-right px-4 py-2 font-medium text-muted-foreground">Discount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {extras.quantityDiscounts.map((tier, index) => {
                      const isActive = quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty);
                      return (
                        <tr 
                          key={index} 
                          className={`border-b border-border last:border-b-0 ${isActive ? 'bg-header-primary/10 font-medium' : ''}`}
                        >
                          <td className="px-4 py-2 text-foreground">{tier.label}</td>
                          <td className="px-4 py-2 text-right text-foreground">${tier.priceEach.toFixed(2)}</td>
                          <td className="px-4 py-2 text-right">
                            {tier.discount ? (
                              <span className="text-green-600 font-medium">{tier.discount}% OFF</span>
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
            )}

            {/* Variants */}
            {hasMultipleVariants && (
              <div className="space-y-3">
                {product.options.map((option) => (
                  <div key={option.name}>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {option.name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value, valueIndex) => {
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
            )}

            {/* Quantity */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Quantity</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-md">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Total Price for Quantity Orders */}
            {currentPricing && quantity > 1 && (
              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Subtotal ({quantity} items):</span>
                  <span className="text-xl font-bold text-foreground">${currentPricing.total.toFixed(2)}</span>
                </div>
                {currentPricing.discount > 0 && (
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-green-600">You save:</span>
                    <span className="text-sm font-medium text-green-600">
                      ${((parseFloat(selectedVariant?.price.amount || '0') * quantity) - currentPricing.total).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Add to Cart */}
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

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
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

            {/* Description */}
            {product.description && (
              <div className="pt-6 border-t border-border">
                <h2 className="text-lg font-bold text-foreground mb-3">Description</h2>
                <p className="text-muted-foreground whitespace-pre-line">{product.description}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
