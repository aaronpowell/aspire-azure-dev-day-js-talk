import { trace } from "@opentelemetry/api";
import { Author } from "./types";
import { apiRoot } from "./constants";

export function fetchAuthors(): Promise<Author[]> {
  return trace
    .getTracer("author api")
    .startActiveSpan("fetching authors", async (span) => {
      const res = await fetch(`${apiRoot}/authors`);
      span.end();
      return await res.json();
    });
}
