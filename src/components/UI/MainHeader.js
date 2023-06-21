import classes from "./MainHeader.module.css";

const MainHeader = () => {
  return (
    <header>
      <div className={classes.logoContainer}>
        <img src="images/logo.svg" alt="logo" />
        <h1>Online Biblioteka</h1>
      </div>
      <div className={classes.userContainer}>
        <div className={classes.userActions}>
          <img src="images/icons/notifications.svg" alt="notifications icon" />
          <img src="images/icons/plus.svg" alt="add icon" />
        </div>
        <img src="images/logo.svg" alt="user profile icon" />
      </div>
    </header>
  );
};

export default MainHeader;
