import { useLocation } from "react-router-dom";

import classes from "../styles/ContentHeader.module.css";

const ContentHeader = () => {
  let location = useLocation();

  const getContentHeaderTitle = () => {
    const path = location.pathname.toLowerCase();

    if (path.startsWith("/book/")) {
      return ".";
    }

    if (path.startsWith("/settings/")) {
      return "Settings";
    }

    switch (path) {
      case "/librarians":
        return "Librarians";
      case "/students":
        return "Students";
      case "/book-record":
        return "Books";
      case "/authors":
        return "Authors";
      case "/book-issuing":
        return "Book Issuing";
      case "/new-user":
        return "New User";
      case "/new-book":
        return "New Book";
      case "/new-book/general":
        return "New Book";
      case "/new-book/specs":
        return "New Book";
      case "/new-book/media":
        return "New Book";
      case "/new-author":
        return "New Author";
      case "/profile":
        return "Profile";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className={classes.contentHeader}>
      <h1>{getContentHeaderTitle()}</h1>
      <hr />
    </div>
  );
};

export default ContentHeader;
