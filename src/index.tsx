import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Ai } from "./screens/Ai";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Ai />
  </StrictMode>,
);
