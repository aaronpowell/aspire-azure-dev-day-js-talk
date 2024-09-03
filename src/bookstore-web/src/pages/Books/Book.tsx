import { LoaderFunction, useLoaderData } from "react-router-dom";
import { Book, getBook } from "../../api/books";

export const loader: LoaderFunction = async ({ params }) => {
  const bookId = params.id;

  if (!bookId) {
    return { status: 404 };
  }

  return await getBook(bookId);
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
