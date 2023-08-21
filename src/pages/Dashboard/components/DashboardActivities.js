import { Link } from "react-router-dom";

import classes from "../../../styles/Dashboard.module.css";

const DUMMY_NEWS_DATA = [
  {
    userAvatar: "/images/placeholders/male-pic.jpg",
    header: "IZDAVANJE KNJIGE",
    timeSince: "4 days ago",
    subject: "Valentina K.",
    action: "je izdala knjigu",
    book: "Tom Sojer",
    object: "Peru Perovicu",
    date: "21.02.2021",
  },
  {
    userAvatar: "/images/placeholders/male-pic.jpg",
    header: "IZDAVANJE KNJIGE",
    timeSince: "4 days ago",
    subject: "Valentina K.",
    action: "je izdala knjigu",
    book: "Robinzon Kruso",
    object: "Peru Perovicu",
    date: "21.02.2021",
  },
  {
    userAvatar: "/images/placeholders/female-pic.jpg",
    header: "IZDAVANJE KNJIGE",
    timeSince: "4 days ago",
    subject: "Valentina K.",
    action: "je izdala knjigu",
    book: "Tom Sojer",
    object: "Peru Perovicu",
    date: "21.02.2021",
  },
  {
    userAvatar: "/images/placeholders/male-pic.jpg",
    header: "IZDAVANJE KNJIGE",
    timeSince: "4 days ago",
    subject: "Valentina K.",
    action: "je izdala knjigu",
    book: "Robinzon Kruso",
    object: "Peru Perovicu",
    date: "21.02.2021",
  },
  {
    userAvatar: "/images/placeholders/female-pic.jpg",
    header: "IZDAVANJE KNJIGE",
    timeSince: "4 days ago",
    subject: "Valentina K.",
    action: "je izdala knjigu",
    book: "Tom Sojer",
    object: "Peru Perovicu",
    date: "21.02.2021",
  },
  {
    userAvatar: "/images/placeholders/female-pic.jpg",
    header: "IZDAVANJE KNJIGE",
    timeSince: "4 days ago",
    subject: "Valentina K.",
    action: "je izdala knjigu",
    book: "Robinzon Kruso",
    object: "Peru Perovicu",
    date: "21.02.2021",
  },
  {
    userAvatar: "/images/placeholders/female-pic.jpg",
    header: "IZDAVANJE KNJIGE",
    timeSince: "4 days ago",
    subject: "Valentina K.",
    action: "je izdala knjigu",
    book: "Robinzon Kruso",
    object: "Peru Perovicu",
    date: "21.02.2021",
  },
];

const DashboardActivities = () => {
  return (
    <div>
      <div className={classes.activitiesSection}>
        <div className={classes.sectionHeader}>
          <p>AKTIVNOSTI</p>
        </div>
      </div>
      {DUMMY_NEWS_DATA.map((news) => {
        return (
          <div className={classes.activityContainer}>
            <img src={news.userAvatar} alt="user avatar" />
            <div>
              <p className={classes.activityHeader}>
                {news.header} -{" "}
                <span className={classes.activityDate}>{news.timeSince}</span>
              </p>
              <p className={classes.activityBody}>
                <span>
                  <Link to="/">{news.subject} </Link>
                </span>
                {news.action}{" "}
                <span style={{ fontWeight: "500" }}>{news.book}</span> {""}
                <span>
                  <Link to="/">{news.object}</Link>
                </span>{" "}
                dana <span style={{ fontWeight: "500" }}>{news.date}</span>.
              </p>
            </div>
            <Link to="/" className={classes.activityFooterLink}>
              pogledaj detaljnije &gt;&gt;
            </Link>
          </div>
        );
      })}
      <button className={classes.activityButton}>Show</button>
    </div>
  );
};

export default DashboardActivities;
