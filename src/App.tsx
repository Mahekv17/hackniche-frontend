import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GameStoreProvider } from "@/hooks/useGameStore";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Leaderboard from "./pages/Leaderboard";
import Store from "./pages/Store";
import SOS from "./pages/SOS";
import CameraPage from "./pages/Camera";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GameStoreProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/store" element={<Store />} />
              <Route path="/sos" element={<SOS />} />
              <Route path="/camera" element={<CameraPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </GameStoreProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
