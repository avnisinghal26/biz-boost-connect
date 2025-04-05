
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Layout from "@/components/layout/Layout";
import AuthPage from "./pages/AuthPage";
import FeedPage from "./pages/FeedPage";
import ExplorePage from "./pages/ExplorePage";
import BusinessProfilePage from "./pages/BusinessProfilePage";
import ProfilePage from "./pages/ProfilePage";
import CreatePostPage from "./pages/CreatePostPage";
import MessagesPage from "./pages/MessagesPage";
import NotFound from "./pages/NotFound";
import BusinessDashboard from "./pages/BusinessDashboard";
import React from "react";

// Create a new client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="bizconnect-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<AuthPage />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/business/:username" element={<BusinessProfilePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/create" element={<CreatePostPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/business-dashboard" element={<BusinessDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
