import { NavLink } from "react-router-dom";

import classes from "../../../styles/TabSection.module.css";

const TabSection = (props) => {
  return (
    <div className={classes.tabContainer}>
      <div className={classes.linksContainer}>
        {props.tabItems.map((tabItem) => (
          <NavLink
            key={Math.random()}
            to={tabItem.path}
            className={(navData) => (navData.isActive ? classes.active : "")}
          >
            {tabItem.text}
          </NavLink>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default TabSection;
