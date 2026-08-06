import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import ToastProvider from "./toast/ToastProvider";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ToastProvider />
    <App />
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,

        style: {
          background: "#18181b",
          color: "#ffffff",
          border: "1px solid rgba(236, 72, 153, 0.35)",
          borderRadius: "12px",
          padding: "12px 16px",
          fontSize: "14px",
          fontWeight: "500",
        },

        success: {
          iconTheme: {
            primary: "#22c55e",
            secondary: "#ffffff",
          },
        },

        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#ffffff",
          },
        },
      }}
    />
  </BrowserRouter>,
);
