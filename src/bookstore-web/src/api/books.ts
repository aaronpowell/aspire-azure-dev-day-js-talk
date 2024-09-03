import { trace } from "@opentelemetry/api";

const apiRoot = `${__API_ENDPOINT__}/api`;

export type Author = {
  id: number;
  books: Book[];
  firstName: string;
  lastName: string;
  middleName?: string;
};

export type Book = {
  id: number;
  title: string;
  authors: Author[] | string;
  pages?: number;
  year?: number;
};

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
