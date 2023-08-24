import { useState } from "react";

import classes from "../../styles/Dashboard.module.css";

import DashboardActivities from "./components/DashboardActivities";
import DashboardReservations from "./components/DashboardReservations";
import DashboardStats from "./components/DashboardStats";

const Dashboard = () => {
  const [activeReservationsAmount, setActiveReservationsAmount] = useState(0);

  return (
    <div className={classes.dashboardContainer}>
      <DashboardActivities />
      <div className={classes.rightSection}>
        <DashboardReservations
          setActiveReservationsAmount={setActiveReservationsAmount}
        />
        <DashboardStats activeReservationsAmount={activeReservationsAmount} />
      </div>
    </div>
  );
};

export default Dashboard;
