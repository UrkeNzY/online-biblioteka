import { useLocation } from "react-router-dom";

import classes from "./ContentHeader.module.css";

const ContentHeader = () => {
  let location = useLocation();

  const getContentHeaderTitle = () => {
    switch (location.pathname) {
      case "/bibliotekari":
        return "Bibliotekari";
      case "/ucenici":
        return "Učenici";
      case "/evidencijaKnjiga":
        return "Knjige";
      case "/autori":
        return "Autori";
      case "/izdavanje-knjiga":
        return "Izdavanje knjiga";
      case "/new-user":
        return "Novi korisnik";
      case "/new-book":
        return "Nova knjiga";
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
