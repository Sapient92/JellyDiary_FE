import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return;
  }
  const { worker } = await import("./mocks/browser.ts");
  return worker.start({ onUnhandledRequest: "bypass" });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
});
