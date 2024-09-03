import { context, trace } from "@opentelemetry/api";
import { getSpan } from "../instrumentation";

const apiRoote = `${__API_ENDPOINT__}/api`;

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
  const span = getSpan("fetching books");
  return context.with(trace.setSpan(context.active(), span), async () => {
    const res = await fetch(`${apiRoote}/books`);
    span.end();
    return await res.json();
  });
}

export function getBook(id: string): Promise<Book> {
  const span = getSpan(`fetching book: ${id}`);
  return context.with(trace.setSpan(context.active(), span), async () => {
    const res = await fetch(`${apiRoote}/books/${id}`);
    span.end();
    return await res.json();
  });
}
