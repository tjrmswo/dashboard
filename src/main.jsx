import App from "./App.jsx";
import { createRoot } from "react-dom/client";

//recoil
import { RecoilRoot } from "recoil";

//msw
// import { worker } from "./mocks/brower.jsx";
import "vite/modulepreload-polyfill";
// if (import.meta.env.NODE_ENV !== "development") {
//   worker.start();
// }

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
