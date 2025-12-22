import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import LoadingScreen from "@/components/common/LoadingScreen";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Conocenos = lazy(() => import("./pages/Conocenos"));
const Programas = lazy(() => import("./pages/Programas"));
const Sumate = lazy(() => import("./pages/Sumate"));
const Donar = lazy(() => import("./pages/Donar"));
const Header = lazy(() => import("@/components/layout/Header"));

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={
            <div className="min-h-screen bg-background">
              <div className="h-16 bg-brand animate-pulse" />
              <div className="container py-8">
                <Skeleton className="h-96 w-full" />
              </div>
            </div>
          }>
            <Header />
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <Skeleton className="h-96 w-full max-w-2xl" />
              </div>
            }>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/conocenos" element={<Conocenos />} />
                <Route path="/programas" element={<Programas />} />
                <Route path="/sumate" element={<Sumate />} />
                <Route path="/donar" element={<Donar />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
