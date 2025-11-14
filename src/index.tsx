import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { Ai } from "./screens/Ai";
import { Forum } from "./screens/Forum";
import { MessageSquare, Sparkles } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-[#1A1B1F] border-b border-[rgba(255,255,255,0.1)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                location.pathname === "/"
                  ? "bg-[#FFDD4C] text-black"
                  : "text-[rgba(255,255,255,0.7)] hover:text-white hover:bg-[#2A2B2E]"
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">AI工具</span>
            </Link>
            <Link
              to="/forum"
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                location.pathname === "/forum"
                  ? "bg-[#FFDD4C] text-black"
                  : "text-[rgba(255,255,255,0.7)] hover:text-white hover:bg-[#2A2B2E]"
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span className="font-medium">论坛</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0F0F10]">
        <Navigation />
        <Routes>
          <Route path="/" element={<Ai />} />
          <Route path="/forum" element={<Forum />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
