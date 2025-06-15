import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Order from "./pages/Order";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { CartProvider } from './context/CartContext';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Create the smoother
    const smoother = ScrollSmoother.create({
      wrapper: '#wrapper',
      content: '#content',
      smooth: 1, // how long to take to "catch up" to the scroll position
      effects: true // looks for data-speed and data-lag attributes on elements
    });

    // Optional: kill smoother on component unmount
    return () => {
      smoother.kill();
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CartProvider>
          <div id="wrapper">
            <div id="content">
              <Router>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/order" element={<Order />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              </Router>
            </div>
          </div>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
