import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return;
  }
  const { worker } = await import("./mocks/browser.ts");
  return worker.start({ onUnhandledRequest: "bypass" });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition={"bottom-right"}
      />
    </QueryClientProvider>,
  );
});
