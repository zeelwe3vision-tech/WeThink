import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import ToastProvider from "./toast/ToastProvider";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <ToastProvider />
  </BrowserRouter>,
);