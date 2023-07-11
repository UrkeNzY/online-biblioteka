import { Link } from "react-router-dom";

import classes from "../../../styles/TabSection.module.css";

const TabSection = (props) => {
  return (
    <div className={classes.tabContainer}>
      <div className={classes.linksContainer}>
        {props.tabItems.map((tabItem) => (
          <Link to={tabItem.path}>{tabItem.text}</Link>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default TabSection;
