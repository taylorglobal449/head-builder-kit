import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCartSync } from "@/hooks/useCartSync";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import QuotePage from "./pages/QuotePage";
import ContactPage from "./pages/ContactPage";
import EventsPage from "./pages/EventsPage";
import StoreLocatorPage from "./pages/StoreLocatorPage";
import SalesFlyersPage from "./pages/SalesFlyersPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import AccountPage from "./pages/AccountPage";
import CartPage from "./pages/CartPage";
import BrandsPage from "./pages/BrandsPage";
import BrandPage from "./pages/BrandPage";
import CloseoutsPage from "./pages/CloseoutsPage";
import HotDealsPage from "./pages/HotDealsPage";
import NewProductsPage from "./pages/NewProductsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  useCartSync();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:handle" element={<ProductPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/store-locator" element={<StoreLocatorPage />} />
        <Route path="/sales-flyers" element={<SalesFlyersPage />} />
        <Route path="/order-tracking" element={<OrderTrackingPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/brands/:slug" element={<BrandPage />} />
        <Route path="/closeouts" element={<CloseoutsPage />} />
        <Route path="/hot-deals" element={<HotDealsPage />} />
        <Route path="/new-products" element={<NewProductsPage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
