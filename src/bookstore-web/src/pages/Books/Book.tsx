import { LoaderFunction, useLoaderData } from "react-router-dom";
import { Book, getBook } from "../../api/books";
import { trace } from "@opentelemetry/api";

export const loader: LoaderFunction = async ({ params }) => {
  return trace
    .getTracer(`View Book page`)
    .startActiveSpan("view book loader", async (span) => {
      const bookId = params.id;

      if (!bookId) {
        span.addEvent("Book ID not found");
        span.end();
        throw new Response("Not Found", { status: 404 });
      }

      const book = await getBook(bookId);

      if (!book) {
        span.addEvent("Book not found");
        span.end();
        throw new Response("Not Found", { status: 404 });
      }

      span.end();
      return book;
    });
};

export const Component = () => {
  const book = useLoaderData() as Book;
  return (
    <>
      <h1>{book.title}</h1>
      <h2>Authors</h2>
      <ul>
        {Array.isArray(book.authors)
          ? book.authors.map((author) => (
              <li key={author.id}>
                {author.firstName} {author.lastName}
              </li>
            ))
          : book.authors}
      </ul>
      {book.year !== undefined && <p>Publication Year: {book.year}</p>}
      {book.pages !== undefined && <p>Page Count: {book.pages}</p>}
    </>
  );
};

Component.displayName = "BookView";
