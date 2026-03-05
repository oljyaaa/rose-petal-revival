import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Masters from "./pages/Masters";
import PricesAndServices from "./pages/PricesAndServices";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* CartDrawer всередині BrowserRouter — використовує useNavigate */}
          <CartDrawer />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/masters" element={<Masters />} />
            <Route path="/prices" element={<PricesAndServices />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
