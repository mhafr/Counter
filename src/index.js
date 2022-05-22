import React from "react";
import ReactDOM from "react-dom/client";
import "./counter.css";
import { CounterProvider } from "./context/CounterContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CounterProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CounterProvider>
);
