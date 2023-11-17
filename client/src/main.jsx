import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import Provider from "./context/Provider.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <App />
      <Toaster position="top-center" reverseOrder={true} />
    </Provider>
  </React.StrictMode>,
);
