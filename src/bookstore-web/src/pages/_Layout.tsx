import { makeStyles, tokens } from "@fluentui/react-components";
import { Outlet } from "react-router-dom";
import { Nav } from "../components/Nav";
import { Library32Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  contaner: {
    display: "grid",
    gridTemplateAreas: `
    "header header"
    "nav main"
    "footer footer"
    `,
    gridTemplateColumns: "0.25fr 2fr",
    gridTemplateRows: "0.1fr auto 100px",

    minHeight: "100vh",
    padding: "8px",
    backgroundColor: `${tokens.colorNeutralBackground4}`,
  },

  header: {
    gridArea: "header",
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },

  nav: {
    gridArea: "nav",
  },

  main: {
    gridArea: "main",
  },

  footer: {
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
    gridArea: "footer",
  },
});

export const Layout = () => {
  const styles = useStyles();

  return (
    <div className={styles.contaner}>
      <header className={styles.header}>
        <h1>
          <Library32Regular /> Bookstore
        </h1>
      </header>

      <aside className={styles.nav}>
        <Nav />
      </aside>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>Aaron Powell &copy; 2024</p>
      </footer>
    </div>
  );
};
