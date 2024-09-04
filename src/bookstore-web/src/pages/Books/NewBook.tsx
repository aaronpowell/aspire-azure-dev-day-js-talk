import {
  Dropdown,
  Input,
  Label,
  makeStyles,
  Option,
  Button,
} from "@fluentui/react-components";
import { trace } from "@opentelemetry/api";
import {
  ActionFunction,
  Form,
  redirect,
  useLoaderData,
} from "react-router-dom";
import { fetchAuthors } from "../../api/author";
import { Author } from "../../api/types";
import { createBook } from "../../api/books";
import { useState } from "react";

const useStyles = makeStyles({
  wideInput: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    maxWidth: "100%",
    border: "none",
  },

  columnInput: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
});

export const Component = () => {
  const titleId = "title";
  const yearId = "year";
  const pagesId = "pages";
  const authorId = "authorId";

  const styles = useStyles();
  const authors = useLoaderData() as Author[];
  const [author, setAuthor] = useState<number | null>(null);
  return (
    <>
      <h1>New Book</h1>
      <Form method="post" id="new-book">
        <fieldset className={styles.wideInput}>
          <Label htmlFor={titleId}>Title</Label>
          <Input id={titleId} required name={titleId} />
        </fieldset>
        <div className={styles.columnInput}>
          <fieldset className={styles.wideInput}>
            <Label htmlFor={yearId}>Publication Year</Label>
            <Input id={yearId} name={yearId} />
          </fieldset>
          <fieldset className={styles.wideInput}>
            <Label htmlFor={pagesId}>Page Count</Label>
            <Input id={pagesId} name={pagesId} />
          </fieldset>
        </div>
        <fieldset className={styles.wideInput}>
          <Label htmlFor={authorId}>Author</Label>
          <Dropdown
            id="author"
            placeholder="Select an author"
            aria-labelledby={authorId}
            aria-required={true}
            onOptionSelect={(_, data) => {
              setAuthor(data.optionValue ? parseInt(data.optionValue) : null);
            }}
          >
            {authors.map((author) => (
              <Option
                key={`${author.id}`}
                value={`${author.id}`}
                text={`${author.firstName} ${author.lastName}`}
              >
                {author.firstName} {author.lastName}
              </Option>
            ))}
          </Dropdown>
          <input
            type="hidden"
            name={authorId}
            id={authorId}
            value={author ? author.toString() : ""}
          />
        </fieldset>

        <div className={styles.columnInput}>
          <fieldset className={styles.wideInput}>
            <Button type="submit">Create</Button>
          </fieldset>
          <fieldset className={styles.wideInput}>
            <Button type="reset">Reset</Button>
          </fieldset>
        </div>
      </Form>
    </>
  );
};

Component.displayName = "NewBook";

export const loader = async () => {
  return trace
    .getTracer(`New Book page`)
    .startActiveSpan("author loader", async (span) => {
      const authors = await fetchAuthors();
      span.end();
      return authors;
    });
};

export const action: ActionFunction = async ({ request }) => {
  return trace
    .getTracer(`New Book page`)
    .startActiveSpan("create book", async (span) => {
      try {
        const formData = await request.formData();
        const updates = Object.fromEntries(formData);

        const { title, authorId, year, pages } = updates;

        if (!title || !authorId) {
          throw new Error("Title and author are required");
        }

        const book = await createBook(
          title.toString(),
          parseInt(authorId.toString()),
          year ? parseInt(year.toString()) : undefined,
          pages ? parseInt(pages.toString()) : undefined
        );

        const location = `/books/${book.id}`;
        span.addLink({
          attributes: { ["book.location"]: location },
          context: span.spanContext(),
        });
        span.end();
        return redirect(location);
      } catch (err) {
        span.addEvent("Book creation failed");
        span.end();
        throw err;
      }
    });
};
