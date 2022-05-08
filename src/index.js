import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./counter.css";
import { CounterProvider } from "./context/CounterContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CounterProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CounterProvider>
);
