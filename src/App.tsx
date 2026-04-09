import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PriorityProvider } from "@/context/PriorityContext";
import Index from "./pages/Index.tsx";
import Priorities from "./pages/Priorities.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PriorityProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/priorities" element={<Priorities />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PriorityProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
