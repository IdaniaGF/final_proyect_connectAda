import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BudgetContextProvider } from "./context/BudgetContext";
import "./index.css";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider iconVariant={{error:'💀' , warning: '⚠️'}}>
      <BudgetContextProvider>
        <App />
      </BudgetContextProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
