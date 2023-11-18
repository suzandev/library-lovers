import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import Errorfallback from "./components/Errorfallback.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={Errorfallback}
      onReset={() => window.location.replace("/")}
    >
      <App />
      <Toaster position="top-center" reverseOrder={true} />
    </ErrorBoundary>
  </React.StrictMode>,
);
