import { Input, Label, makeStyles, useId } from "@fluentui/react-components";
import { ActionFunction, Form } from "react-router-dom";

const useStyles = makeStyles({
  wideInput: {
    // Stack the label above the field
    display: "flex",
    flexDirection: "column",
    // Use 2px gap below the label (per the design system)
    gap: "2px",
    // Prevent the example from taking the full width of the page (optional)
    maxWidth: "100%",
    border: "none",
  },

  columnInput: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
});

export const Component = () => {
  const titleId = useId("title");
  const yearId = useId("year");
  const pagesId = useId("pages");
  const styles = useStyles();
  return (
    <>
      <h1>New Book</h1>
      <Form method="post" id="new-book">
        <fieldset className={styles.wideInput}>
          <Label htmlFor={titleId}>Title</Label>
          <Input id={titleId} />
        </fieldset>
        <div className={styles.columnInput}>
          <fieldset className={styles.wideInput}>
            <Label htmlFor={yearId}>Publication Year</Label>
            <Input id={yearId} />
          </fieldset>
          <fieldset className={styles.wideInput}>
            <Label htmlFor={pagesId}>Page Count</Label>
            <Input id={pagesId} />
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
    .startActiveSpan("author loader", async (span) => {});
};

export const action: ActionFunction = async () => {
  return {
    props: {},
  };
};
