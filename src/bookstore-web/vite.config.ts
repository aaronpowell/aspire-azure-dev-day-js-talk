import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  console.log(env);
  return {
    plugins: [react()],
    define: {
      __API_ENDPOINT__: JSON.stringify(env.services__apiservice__https__0),
      OTEL_EXPORTER_OTLP_ENDPOINT: JSON.stringify(
        env.OTEL_EXPORTER_OTLP_ENDPOINT
      ),
      OTEL_EXPORTER_OTLP_HEADERS: JSON.stringify(
        env.OTEL_EXPORTER_OTLP_HEADERS
      ),
      OTEL_RESOURCE_ATTRIBUTES: JSON.stringify(env.OTEL_RESOURCE_ATTRIBUTES),
      OTEL_SERVICE_NAME: JSON.stringify(env.OTEL_SERVICE_NAME),
    },
  };
});
