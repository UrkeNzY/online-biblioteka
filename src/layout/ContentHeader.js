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
      case "/new-book/general":
        return "New Book";
      case "/new-book/specs":
        return "New Book";
      case "/new-book/media":
        return "New Book";
      case "/new-author":
        return "New Author";
      case "/settings":
        return "Settings";
      case "/settings/policies":
        return "Settings";
      case "/settings/categories":
        return "Settings";
      case "/settings/genres":
        return "Settings";
      case "/settings/publishers":
        return "Settings";
      case "/settings/bindings":
        return "Settings";
      case "/settings/formats":
        return "Settings";
      case "/settings/writing":
        return "Settings";
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
