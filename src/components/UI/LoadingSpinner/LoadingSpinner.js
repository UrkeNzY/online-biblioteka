import classes from "../../../styles/LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={classes.backgroundDim}>
      <div className={classes.spinnerContainer}>
        <img
          src="/images/icons/loading-spinner.gif"
          alt="Loading spinner"
          width="150"
        />
        <h4>Please wait...</h4>
      </div>
    </div>
  );
};

export default LoadingSpinner;
