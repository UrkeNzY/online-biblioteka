import classes from "../../../styles/Dashboard.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faXmark,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

const DashboardReservations = () => {
  return (
    <div className={classes.reservationsSection}>
      <div className={classes.sectionHeader}>
        <p>REZERVACIJE KNJIGA</p>
      </div>
      <div className={classes.reservationsContainer}>
        <div className={classes.sectionContent}>
          <div className={classes.sectionUserInfo}>
            <img src="/images/placeholders/male-pic.jpg" alt="user avatar" />
            <p>Pero Perovic</p>
          </div>
          <p>Ep o Gilgamesu</p>
          <p className={classes.reservationDate}>05.11.2020</p>
          <div className={classes.sectionActions}>
            <FontAwesomeIcon className={classes.actionButton} icon={faCheck} />
            <FontAwesomeIcon className={classes.actionButton} icon={faXmark} />
          </div>
        </div>
        <hr />
      </div>
      <div className={classes.reservationsContainer}>
        <div className={classes.sectionContent}>
          <div className={classes.sectionUserInfo}>
            <img src="/images/placeholders/male-pic.jpg" alt="user avatar" />
            <p>Pero Perovic</p>
          </div>
          <p>Tom Sojer</p>
          <p className={classes.reservationDate}>31.04.2019</p>
          <div className={classes.sectionActions}>
            <FontAwesomeIcon className={classes.actionButton} icon={faCheck} />
            <FontAwesomeIcon className={classes.actionButton} icon={faXmark} />
          </div>
        </div>
        <hr />
      </div>
      <div className={classes.reservationsContainer}>
        <div className={classes.sectionContent}>
          <div className={classes.sectionUserInfo}>
            <img src="/images/placeholders/male-pic.jpg" alt="user avatar" />
            <p>Pero Perovic</p>
          </div>
          <p>Ilijada</p>
          <p className={classes.reservationDate}>05.11.2020</p>
          <div className={classes.sectionActions}>
            <FontAwesomeIcon className={classes.actionButton} icon={faCheck} />
            <FontAwesomeIcon className={classes.actionButton} icon={faXmark} />
          </div>
        </div>
        <hr />
      </div>
      <div className={classes.reservationsContainer}>
        <div className={classes.sectionContent}>
          <div className={classes.sectionUserInfo}>
            <img src="/images/placeholders/male-pic.jpg" alt="user avatar" />
            <p>Pero Perovic</p>
          </div>
          <p>Tom Sojer</p>
          <p className={classes.reservationDate}>31.02.2021</p>
          <div className={classes.sectionActions}>
            <FontAwesomeIcon className={classes.actionButton} icon={faCheck} />
            <FontAwesomeIcon className={classes.actionButton} icon={faXmark} />
          </div>
        </div>
        <hr />
      </div>
      <div className={classes.sectionFooter}>
        <FontAwesomeIcon icon={faCalendarDays} />
        <p>Prikazi sve</p>
      </div>
    </div>
  );
};

export default DashboardReservations;
