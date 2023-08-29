import { useState, useEffect } from "react";
import { allIssuances } from "../../services/books";
import differenceInDays from "date-fns/differenceInDays";

import classes from "../../styles/Dashboard.module.css";

import DashboardActivities from "./components/DashboardActivities";
import DashboardReservations from "./components/DashboardReservations";
import DashboardStats from "./components/DashboardStats";

const Dashboard = () => {
  const [activeReservationsAmount, setActiveReservationsAmount] = useState(0);
  const [activeIssuancesAmount, setActiveIssuancesAmount] = useState(0);
  const [offLimitReservationsAmount, setOffLimitReservationsAmount] =
    useState(0);

  useEffect(() => {
    const fetchIssuances = async () => {
      try {
        const response = await allIssuances();
        const issuanceData = response.data.izdate;
        const currentDate = new Date();

        let activeCount = 0;
        let offLimitCount = 0;

        issuanceData.forEach((issuance) => {
          const borrowDate = new Date(issuance.borrow_date);
          const daysBorrowed = differenceInDays(currentDate, borrowDate);

          activeCount++;
          if (daysBorrowed > 20) {
            offLimitCount++;
          }
        });

        console.log(activeCount);
        setActiveIssuancesAmount(activeCount);
        setOffLimitReservationsAmount(offLimitCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIssuances();
  }, []);

  return (
    <div className={classes.dashboardContainer}>
      <DashboardActivities />
      <div className={classes.rightSection}>
        <DashboardReservations
          setActiveReservationsAmount={setActiveReservationsAmount}
        />
        <DashboardStats
          activeReservationsAmount={activeReservationsAmount}
          activeIssuancesAmount={activeIssuancesAmount}
          offLimitReservationsAmount={offLimitReservationsAmount}
        />
      </div>
    </div>
  );
};

export default Dashboard;
