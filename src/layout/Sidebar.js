import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import classes from "../styles/Sidebar.module.css";

const sidebarItems = [
  {
    text: "Dashboard",
    icon: "/images/icons/dashboard.svg",
    path: "/dashboard",
  },
  {
    text: "Bibliotekari",
    icon: "/images/icons/bibliotekari.svg",
    path: "/librarians",
  },
  { text: "Učenici", icon: "/images/icons/ucenici.svg", path: "/students" },
  {
    text: "Knjige",
    icon: "/images/icons/knjige.svg",
    path: "/book-record",
  },
  { text: "Autori", icon: "/images/icons/autori.svg", path: "/authors" },
  {
    text: "Izdavanje knjiga",
    icon: "/images/icons/izdavanje-knjiga.svg",
    path: "/book-issuing",
  },
];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const sidebarExpandHandler = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const closeSidebar = () => {
    setIsExpanded(false);
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
              ? "/images/buttons/sidebar-close.svg"
              : "/images/buttons/sidebar-open.svg"
          }
          alt="close sidebar button"
          onClick={sidebarExpandHandler}
        />
      </div>
      <hr />
      <div className={classes.sidebarMenu}>
        {sidebarItems.map((item) => (
          <NavLink
          className={`${classes.sidebarItem} ${	
            location.pathname === item.path ? classes.activeItem : ""	
          }`}
            to={item.path}
            key={Math.random()}
            onClick={closeSidebar}
            // activeClassName={classes.activeItem}
          >
            <img src={item.icon} alt="sidebar menu item icon" />
            {isExpanded && <p>{item.text}</p>}
          </NavLink>
        ))}
      </div>
      <div className={classes.sidebarFooter}>
        <hr />
        <div className={classes.footerBottom}>
        <NavLink	
            className={`${classes.sidebarItem} ${	
              location.pathname === "/settings/policies" ? classes.activeItem : ""	
            }`}	
            to="/settings/policies"	
            onClick={closeSidebar}	
          >
            <img src="/images/icons/settings.svg" alt="sidebar options icon" />
            {isExpanded && <p>Settings</p>}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
