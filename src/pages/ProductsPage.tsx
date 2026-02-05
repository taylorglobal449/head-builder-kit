import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/products/ProductGrid";
import { useProducts } from "@/hooks/useProducts";

export default function ProductsPage() {
  const { products, loading } = useProducts(24);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-[1600px] mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><a href="/" className="hover:text-header-primary">Home</a></li>
            <li>/</li>
            <li className="text-foreground font-medium">All Products</li>
          </ol>
        </nav>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black text-foreground uppercase tracking-wide">
            All Products
          </h1>
          <span className="text-sm text-muted-foreground">
            {products.length} products
          </span>
        </div>

        <ProductGrid 
          products={products} 
          loading={loading}
          emptyMessage="No products found. Add products to your Shopify store to see them here."
        />
      </main>
    </div>
  );
}
