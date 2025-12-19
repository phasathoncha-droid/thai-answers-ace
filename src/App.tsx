import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import TopicsPage from "./pages/TopicsPage";
import CategoryTopicsPage from "./pages/CategoryTopicsPage";
import TopicDetailPage from "./pages/TopicDetailPage";
import ChangesPage from "./pages/ChangesPage";
import DiffPage from "./pages/DiffPage";
import DocumentPage from "./pages/DocumentPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/topics/category/:categoryId" element={<CategoryTopicsPage />} />
          <Route path="/topics/:id" element={<TopicDetailPage />} />
          <Route path="/changes" element={<ChangesPage />} />
          <Route path="/diff" element={<DiffPage />} />
          <Route path="/documents/:id" element={<DocumentPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
