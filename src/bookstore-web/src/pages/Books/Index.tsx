import { Span } from "@opentelemetry/api";
import { getSpan } from "../../instrumentation";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { Author, Book, fetchBooks } from "../../api/books";

export const loader = async () => await fetchBooks();

export const Component = () => {
  const [span, setSpan] = useState<Span | undefined>();
  useEffect(() => {
    const s = getSpan("View Books page");
    setSpan(s);
    return () => {
      s.end();
    };
  }, []);

  const books = useLoaderData() as Book[];

  function displayAuthors(authors: string | Author[]) {
    if (Array.isArray(authors)) {
      return authors
        .map((author) => `${author.firstName} ${author.lastName}`)
        .join(", ");
    }
    return authors;
  }

  return (
    <>
      <h1>Available Books</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {books.map((book: Book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{displayAuthors(book.authors)}</td>
              <td>
                <a href={`/books/${book.id}`}>View</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

Component.displayName = "BooksViewAll";
