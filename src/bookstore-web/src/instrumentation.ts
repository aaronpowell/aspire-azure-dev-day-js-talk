import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { DocumentLoadInstrumentation } from "@opentelemetry/instrumentation-document-load";
import { FetchInstrumentation } from "@opentelemetry/instrumentation-fetch";
import { ZoneContextManager } from "@opentelemetry/context-zone";
import { UserInteractionInstrumentation } from "@opentelemetry/instrumentation-user-interaction";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { Resource } from "@opentelemetry/resources";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";

let provider: WebTracerProvider;

export function initializeTelemetry(
  otlpUrl: string,
  headers: string,
  resourceAttributes: string
) {
  const otlpOptions = {
    url: `${otlpUrl}/v1/traces`,
    headers: parseDelimitedValues(headers),
  };

  const attributes: Record<string, string> =
    parseDelimitedValues(resourceAttributes);
  attributes[ATTR_SERVICE_NAME] = window.OTEL_SERVICE_NAME;

  provider = new WebTracerProvider({
    resource: new Resource(attributes),
  });
  provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
  provider.addSpanProcessor(
    new SimpleSpanProcessor(new OTLPTraceExporter(otlpOptions))
  );

  provider.register({
    contextManager: new ZoneContextManager(),
  });

  registerInstrumentations({
    instrumentations: [
      // new DocumentLoadInstrumentation(),
      new FetchInstrumentation({
        propagateTraceHeaderCorsUrls: [new RegExp(`\\/api\\/*`)],
      }),
      // new UserInteractionInstrumentation(),
    ],
  });
}

function parseDelimitedValues(s: string): Record<string, string> {
  const headers = s.split(","); // Split by comma
  const o: Record<string, string> = {};

  headers.forEach((header) => {
    const [key, value] = header.split("="); // Split by equal sign
    o[key.trim()] = value.trim(); // Add to the object, trimming spaces
  });

  return o;
}
