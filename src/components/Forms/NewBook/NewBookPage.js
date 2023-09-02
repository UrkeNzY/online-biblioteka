import React from "react";
import { Link, Outlet } from "react-router-dom";
import classes from './NewBookPage.module.css'

const NewBookPage = () => {
  return (
    <div>
      <div className={classes.bookTabs}>
        <Link to="/new-book/details" className={classes.links}>Osnovni detalji</Link>
        <Link to="/new-book/specifications" className={classes.links}>Specifikacija</Link>
        <Link to="/new-book/media" className={classes.links}>Multimedija</Link>
      </div>

      <Outlet />
    </div>
  );
};

export default NewBookPage;
