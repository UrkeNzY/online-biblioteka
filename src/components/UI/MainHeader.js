import classes from "./MainHeader.module.css";

const MainHeader = () => {
    return <header>
        <div className={classes.logoContainer}>
        <img src="images/logo.svg" alt="logo" />
        <h1>Online Biblioteka</h1>
        </div>
    </header>
};

export default MainHeader;
