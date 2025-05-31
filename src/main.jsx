import database from "../Database/Firebase.config.js";
import { ToastContainer } from "react-toastify";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {store} from "./features/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
