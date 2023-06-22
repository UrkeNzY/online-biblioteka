import { useLocation } from "react-router-dom";

import classes from "./ContentHeader.module.css";

const ContentHeader = () => {
  let location = useLocation();

  const getContentHeaderTitle = () => {
    switch (location.pathname) {
      case "/new-user":
        return "Novi učenik";
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
