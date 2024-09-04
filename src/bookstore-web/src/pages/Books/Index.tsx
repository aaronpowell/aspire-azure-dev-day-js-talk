import { Link, useLoaderData } from "react-router-dom";
import { fetchBooks } from "../../api/books";
import { trace } from "@opentelemetry/api";
import { Author, Book } from "../../api/types";

export const loader = async () => {
  return trace
    .getTracer("View all books page")
    .startActiveSpan("view all books loader", async (span) => {
      const books = await fetchBooks();
      span.end();
      return books;
    });
};

export const Component = () => {
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
                <Link to={`/books/${book.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

Component.displayName = "BooksViewAll";
