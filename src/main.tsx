// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./apps";
import "./global.css";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <App />,
  // </StrictMode>,
);
