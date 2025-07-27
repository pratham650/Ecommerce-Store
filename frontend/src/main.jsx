import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import './index.css';
import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> {}
      <SearchProvider>
        <CartProvider>
        <App />
        </CartProvider>
      </SearchProvider>
    </BrowserRouter>
  </React.StrictMode>
);
