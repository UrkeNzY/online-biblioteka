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
      return "Podešavanja";
    }

    if (path.startsWith("/profile/")) {
      return "Profil";
    }

    if (path.startsWith("/new-user")) {
      return "Novi korisnik";
    }

    switch (path) {
      case "/librarians":
        return "Bibliotekari";
      case "/students":
        return "Učenici";
      case "/book-record":
        return "Knjige";
      case "/authors":
        return "Autori";
      case "/book-issuing":
        return "Izdavanje knjiga";
      case "/new-book":
        return "Nova knjiga";
      case "/new-book/general":
        return "Nova knjiga";
      case "/new-book/specs":
        return "Nova knjiga";
      case "/new-book/media":
        return "Nova knjiga";
      case "/new-author":
        return "Novi autor";
      default:
        return "Kontrolna tabla";
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
