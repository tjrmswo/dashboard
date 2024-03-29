import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import "./configs/recoil.jsx";

//recoil
import { RecoilRoot } from "recoil";

import "vite/modulepreload-polyfill";

//msw
import { worker } from "./mocks/brower.jsx";
if (import.meta.env.NODE_ENV !== "development") {
  worker.start();
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
