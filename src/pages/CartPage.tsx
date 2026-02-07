import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const {
    items,
    isLoading,
    isSyncing,
    updateQuantity,
    removeItem,
    getCheckoutUrl,
    syncCart,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  useEffect(() => {
    syncCart();
  }, [syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground uppercase tracking-wide">
            Shopping Cart
          </h1>
          <a
            href="/products"
            className="text-sm text-header-primary hover:underline font-medium flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </a>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything yet.
            </p>
            <Button asChild className="bg-header-primary hover:bg-header-primary-hover text-white font-bold uppercase">
              <a href="/products">Browse Products</a>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Table Header */}
              <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-4 px-4 pb-2 border-b border-border text-xs font-bold text-muted-foreground uppercase tracking-wide">
                <span>Product</span>
                <span className="w-32 text-center">Quantity</span>
                <span className="w-24 text-right">Total</span>
              </div>

              {items.map((item) => {
                const lineTotal = parseFloat(item.price.amount) * item.quantity;
                return (
                  <div
                    key={item.variantId}
                    className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-4 items-center p-4 bg-card border border-border rounded-lg"
                  >
                    {/* Product Info */}
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img
                            src={item.product.node.images.edges[0].node.url}
                            alt={item.product.node.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm leading-tight line-clamp-2 text-foreground">
                          {item.product.node.title}
                        </h3>
                        {item.variantTitle !== "Default Title" && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {item.selectedOptions.map((opt) => opt.value).join(" / ")}
                          </p>
                        )}
                        <p className="text-sm text-header-primary font-bold mt-1">
                          ${parseFloat(item.price.amount).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-2 w-32 justify-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        disabled={isLoading}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        disabled={isLoading}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.variantId)}
                        disabled={isLoading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Line Total */}
                    <div className="w-24 text-right font-bold text-foreground">
                      ${lineTotal.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-6 space-y-4">
                <h2 className="font-bold text-foreground uppercase text-sm">Order Summary</h2>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
                    <span className="text-foreground font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-foreground font-medium">Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-foreground">Total</span>
                  <span className="text-xl font-bold text-header-primary">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-header-primary hover:bg-header-primary-hover text-white font-bold uppercase"
                  size="lg"
                  disabled={items.length === 0 || isLoading || isSyncing}
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Checkout
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Secure checkout powered by Shopify
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
