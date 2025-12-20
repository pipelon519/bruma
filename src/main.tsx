import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import App from "./App";
import { AuthProvider } from "./hooks/useauth"; // Import the AuthProvider
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Wrap the entire app in the AuthProvider */}
    <AuthProvider>
      <AnimatePresence mode="wait">
        <HashRouter>
          <App />
        </HashRouter>
      </AnimatePresence>
    </AuthProvider>
  </React.StrictMode>
);
