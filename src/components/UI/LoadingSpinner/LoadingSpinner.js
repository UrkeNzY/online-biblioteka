import classes from "../../../styles/LoadingSpinner.module.css";

const LoadingSpinner = ({ loadingSpinner }) => {
  return (
    <div className={classes.backgroundDim}>
      <div className={classes.spinnerContainer}>
        <img src={loadingSpinner} alt="Loading spinner" width="150" />
        <h4>Molimo sačekajte...</h4>
      </div>
    </div>
  );
};

export default LoadingSpinner;
