import { trace } from "@opentelemetry/api";
import { Book } from "./types";
import { apiRoot } from "./constants";

export function fetchBooks(): Promise<Book[]> {
  return trace
    .getTracer("book api")
    .startActiveSpan("fetching books", async (span) => {
      const res = await fetch(`${apiRoot}/books`);
      span.end();
      return await res.json();
    });
}

export function getBook(id: string): Promise<Book | null> {
  return trace
    .getTracer("book api")
    .startActiveSpan(`fetching book: ${id}`, async (span) => {
      span.setAttribute("book.id", id);
      const res = await fetch(`${apiRoot}/books/${id}`);
      if (!res.ok) {
        span.addEvent("Book not found");
        span.addEvent("HTTP Error", { status: res.status });
        span.end();
        return null;
      }
      span.end();
      return await res.json();
    });
}

export function createBook(
  title: string,
  authorId: number,
  year?: number,
  pages?: number
): Promise<Book> {
  return trace
    .getTracer("book api")
    .startActiveSpan("creating book", async (span) => {
      const res = await fetch(`${apiRoot}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          authorIds: [authorId],
          year,
          pages,
        }),
      });

      if (!res.ok) {
        span.addEvent("Book creation failed");
        span.addEvent("HTTP Error", { status: res.status });
        span.end();
        throw new Error("Failed to create book");
      }

      span.addEvent("Book created", { title, authorId, year, pages });
      span.end();
      return await res.json();
    });
}
