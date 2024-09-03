import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeTelemetry } from "./otel.ts";

initializeTelemetry(
  window.OTEL_EXPORTER_OTLP_ENDPOINT,
  window.OTEL_EXPORTER_OTLP_HEADERS,
  window.OTEL_RESOURCE_ATTRIBUTES
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
