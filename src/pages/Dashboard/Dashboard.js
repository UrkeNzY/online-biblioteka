import classes from "../../styles/Dashboard.module.css";

import DashboardActivities from "./components/DashboardActivities";
import DashboardReservations from "./components/DashboardReservations";
import DashboardStats from "./components/DashboardStats";
const Dashboard = () => {
  return (
    <div className={classes.dashboardContainer}>
      <DashboardActivities />
      <div className={classes.rightSection}>
        <DashboardReservations />
        <DashboardStats />
      </div>
    </div>
  );
};

export default Dashboard;
