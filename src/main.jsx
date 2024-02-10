import App from "./App.jsx";

//msw
import { createRoot } from "react-dom/client";
import { worker } from "./mocks/brower.jsx";
import { StrictMode } from "react";
if (import.meta.env.NODE_ENV !== "development") {
  worker.start();
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
