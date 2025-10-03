import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { App } from "./App.tsx";
import { UnitContextProvider } from "./Contexts/UnitscontextProvider.tsx";
import { LoadingContextProvider } from "./Contexts/LoadingContextProvider.tsx";
import { DataContextProvider } from "./Contexts/DataContextProvider.tsx";
import { ThemeContextProvider } from "./Contexts/ThemeContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeContextProvider>
      <DataContextProvider>
      <LoadingContextProvider>
        <UnitContextProvider>
          <App />
        </UnitContextProvider>
      </LoadingContextProvider>
    </DataContextProvider>
    </ThemeContextProvider>
  </StrictMode>
);

window.addEventListener("online", () => {
  window.location.reload();
});
