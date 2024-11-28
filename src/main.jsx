import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import BuscadorDeCep from "./BuscadorDeCep.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BuscadorDeCep />
  </StrictMode>
);
