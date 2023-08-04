import classes from '../../../styles/LoadingSpinner.module.css'

const LoadingSpinner = () => {
    return <div className={classes.spinnerContainer}><img src="/images/icons/loading-spinner.gif" alt="Loading spinner" width="150"/></div>
}

export default LoadingSpinner