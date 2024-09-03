import { makeStyles } from "@fluentui/react-components";
import {
  NavCategory,
  NavCategoryItem,
  NavDrawer,
  NavDrawerBody,
  NavItem,
  NavSubItem,
  NavSubItemGroup,
} from "@fluentui/react-nav-preview";

import { tokens } from "@fluentui/react-components";
import {
  Person20Filled,
  Person20Regular,
  bundleIcon,
  Home20Filled,
  Home20Regular,
  Book20Filled,
  Book20Regular,
} from "@fluentui/react-icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
    display: "flex",
  },
  content: {
    flex: "1",
    padding: "16px",
    display: "grid",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  link: {
    textDecoration: "none",
    color: tokens.colorNeutralForeground1,
  },
});

const Person = bundleIcon(Person20Filled, Person20Regular);
const Home = bundleIcon(Home20Filled, Home20Regular);
const Book = bundleIcon(Book20Filled, Book20Regular);

export const Nav = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <NavDrawer
        defaultSelectedValue="2"
        defaultSelectedCategoryValue="1"
        open={true}
        type="inline"
      >
        <NavDrawerBody>
          <NavItem icon={<Home />} value="1">
            <Link to="/" className={styles.link}>
              Home
            </Link>
          </NavItem>
          <NavCategory value="2">
            <NavCategoryItem icon={<Book />}>Books</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem value="3">
                <Link to="/books" className={styles.link}>
                  View All
                </Link>
              </NavSubItem>
              <NavSubItem value="4">
                <Link to="/books/new" className={styles.link}>
                  Create New
                </Link>
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavCategory value="5">
            <NavCategoryItem icon={<Person />}>Authors</NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem value="6">
                <Link to="/authors" className={styles.link}>
                  View All
                </Link>
              </NavSubItem>
              <NavSubItem value="7">
                <Link to="/authors/new" className={styles.link}>
                  Create New
                </Link>
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
        </NavDrawerBody>
      </NavDrawer>
    </div>
  );
};
