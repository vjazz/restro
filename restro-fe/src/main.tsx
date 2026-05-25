import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// @ts-expect-error: Allow side-effect CSS import without type declarations
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
