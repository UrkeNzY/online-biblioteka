import { useState, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { GlobalContext } from "../state/GlobalState";

import classes from "../styles/Sidebar.module.css";

const sidebarItems = [
  {
    text: "Kontrolna tabla",
    icon: "/images/icons/dashboard.svg",
    path: "/dashboard",
    requiredRoles: ["Bibliotekar", "Administrator"],
  },
  {
    text: "Bibliotekari",
    icon: "/images/icons/bibliotekari.svg",
    path: "/librarians",
    requiredRoles: ["Administrator"],
  },
  {
    text: "Učenici",
    icon: "/images/icons/ucenici.svg",
    path: "/students",
    requiredRoles: ["Administrator"],
  },
  {
    text: "Knjige",
    icon: "/images/icons/knjige.svg",
    path: "/book-record",
    requiredRoles: ["Bibliotekar", "Administrator"],
  },
  {
    text: "Autori",
    icon: "/images/icons/autori.svg",
    path: "/authors",
    requiredRoles: ["Administrator"],
  },
  {
    text: "Izdavanje knjiga",
    icon: "/images/icons/izdavanje-knjiga.svg",
    path: "/book-issuing",
    requiredRoles: ["Bibliotekar", "Administrator"],
  },
  {
    text: "Glavna stranica",
    icon: "/images/icons/dashboard.svg",
    path: "/dashboard",
    requiredRoles: ["Učenik"],
  },
];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const { userRole } = useContext(GlobalContext);

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
        {sidebarItems.map(
          (item) =>
            item.requiredRoles.includes(userRole) && (
              <NavLink
                className={`${classes.sidebarItem} ${
                  location.pathname === item.path ? classes.activeItem : ""
                }`}
                to={item.path}
                key={Math.random()}
                onClick={closeSidebar}
              >
                <img src={item.icon} alt="sidebar menu item icon" />
                {isExpanded && <p>{item.text}</p>}
              </NavLink>
            )
        )}
      </div>
      <div className={classes.sidebarFooter}>
        <hr />
        <div className={classes.footerBottom}>
          {userRole === "Administrator" && (
            <NavLink
              className={`${classes.sidebarItem} ${
                location.pathname === "/settings/policies"
                  ? classes.activeItem
                  : ""
              }`}
              to="/settings/policies"
              onClick={closeSidebar}
            >
              <img
                src="/images/icons/settings.svg"
                alt="sidebar options icon"
              />
              {isExpanded && <p>Podešavanja</p>}
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
