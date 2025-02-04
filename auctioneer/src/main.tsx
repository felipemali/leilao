import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { SocketContextProvider } from "./context/SocketContext.tsx";

createRoot(document.getElementById("root")!).render(
  <SocketContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SocketContextProvider>
);
