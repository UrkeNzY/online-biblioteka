import { useState } from "react";
import { Link } from "react-router-dom";

import classes from "./Sidebar.module.css";

const sidebarItems = [
  { text: "Dashboard", icon: "images/icons/dashboard.svg", path: "/dashboard" },
  {
    text: "Librarians",
    icon: "images/icons/bibliotekari.svg",
    path: "/librarians",
  },
  { text: "Students", icon: "images/icons/ucenici.svg", path: "/students" },
  {
    text: "Books",
    icon: "images/icons/knjige.svg",
    path: "/book-record",
  },
  { text: "Authors", icon: "images/icons/autori.svg", path: "/authors" },
  {
    text: "Book Issuing",
    icon: "images/icons/izdavanje-knjiga.svg",
    path: "/book-issuing",
  },
];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState();

  const sidebarExpandHandler = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div
      className={`${classes.sidebarContainer} ${
        isExpanded ? "" : classes.sidebarContainerNx
      }`}
    >
      <div className={classes.sidebarHeader}>
        <img
          src={
            isExpanded
              ? "images/buttons/sidebar-close.svg"
              : "images/buttons/sidebar-open.svg"
          }
          alt="close sidebar button"
          onClick={sidebarExpandHandler}
        />
      </div>
      <hr />
      <div className={classes.sidebarMenu}>
        {sidebarItems.map((item) => (
          <Link
            className={classes.sidebarItem}
            to={item.path}
            key={Math.random()}
          >
            <img src={item.icon} alt="sidebar menu item icon" />
            {isExpanded && <p>{item.text}</p>}
          </Link>
        ))}
      </div>
      <div className={classes.sidebarFooter}>
        <hr />
        <div className={classes.footerBottom}>
          <Link className={classes.sidebarItem} to="/settings">
            <img src="images/icons/settings.svg" alt="sidebar options icon" />
            {isExpanded && <p>Settings</p>}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
