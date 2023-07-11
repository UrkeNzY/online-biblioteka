import { useLocation } from "react-router-dom";

import classes from "../styles/ContentHeader.module.css";

const ContentHeader = () => {
  let location = useLocation();

  const getContentHeaderTitle = () => {
    switch (location.pathname) {
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
      case "/new-book/specs":
        return "New Book";
      case "/new-book/media":
        return "New Book";
      case "/settings":
        return "Settings";
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
