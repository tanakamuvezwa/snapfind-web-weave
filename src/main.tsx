import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AuthGate from "./AuthGate.tsx";
import { ThemeProvider } from "./components/ThemeProvider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthGate />
    </ThemeProvider>
  </BrowserRouter>
);
