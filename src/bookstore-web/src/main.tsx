import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initializeTelemetry } from "./instrumentation.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./pages/_Layout.tsx";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import "./index.css";

initializeTelemetry(
  window.OTEL_EXPORTER_OTLP_ENDPOINT,
  window.OTEL_EXPORTER_OTLP_HEADERS,
  window.OTEL_RESOURCE_ATTRIBUTES
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        lazy: () => import("./pages/Index.tsx"),
      },
      {
        path: "/books",
        lazy: () => import("./pages/Books/Index.tsx"),
      },
      {
        path: "/books/new",
        lazy: () => import("./pages/Books/NewBook.tsx"),
      },
      {
        path: "/books/:id",
        lazy: () => import("./pages/Books/Book.tsx"),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FluentProvider theme={webLightTheme}>
      <RouterProvider router={router} />
    </FluentProvider>
  </StrictMode>
);
