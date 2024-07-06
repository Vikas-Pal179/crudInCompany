import { ThemeProvider } from "@material-tailwind/react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { queryClient } from "./services/ReactQueryClient";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </ThemeProvider>
);

reportWebVitals();
