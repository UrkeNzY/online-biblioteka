import { Link } from "react-router-dom";

import classes from "../../../styles/Dashboard.module.css";

const DashboardActivities = ({ activityInfo }) => {
  return (
    <div>
      <div className={classes.activitiesSection}>
        <div className={classes.sectionHeader}>
          <p>AKTIVNOSTI</p>
        </div>
      </div>
      {activityInfo.slice(0, 7).map((activity) => {
        return (
          <div className={classes.activityContainer} key={activity.action_date}>
            <img src={activity.userAvatar} alt="user avatar" />
            <div>
              <p className={classes.activityHeader}>
                {activity.header} -{" "}
                <span className={classes.activityDate}>
                  prije {activity.timeSince}
                </span>
              </p>
              <p className={classes.activityBody}>
                <span>
                  <Link to="/">{activity.subject} </Link>
                </span>
                {activity.action}{" "}
                <span style={{ fontWeight: "500" }}>{activity.book}</span> {""}
                <span>
                  {activity.object ? "učeniku " : ""}
                  <Link to="/">{activity?.object}</Link>
                </span>{" "}
                dana <span style={{ fontWeight: "500" }}>{activity.date}</span>.
              </p>
            </div>
            <Link to="/" className={classes.activityFooterLink}>
              pogledaj detaljnije &gt;&gt;
            </Link>
          </div>
        );
      })}
      <button className={classes.activityButton}>Prikaži</button>
    </div>
  );
};

export default DashboardActivities;
