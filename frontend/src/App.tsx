import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Portfolio from "@/pages/Portfolio";
import Posters from "@/pages/Posters";
import Pricing from "@/pages/Pricing";
import AuthPage from "@/pages/Auth";
import AdminPage from "@/pages/Admin";
import NotFound from "@/pages/NotFound";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/posters" element={<Posters />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
