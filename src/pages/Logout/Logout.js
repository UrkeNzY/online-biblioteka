import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { userLogout } from "../../services/users";
import { GlobalContext } from "../../state/GlobalState";

import classes from "../../styles/Logout.module.css";

const Logout = () => {
  const { logout } = useContext(GlobalContext);

  const logOut = async () => {
    try {
      await userLogout(); // Call the userLogout function to log the user out on the server
      logout(); // Update the context to remove the user data
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className={classes.logoutContainer}>
      <FontAwesomeIcon icon={faDoorOpen} size="3x" />
      <h1>Already leaving?</h1>
      <div className={classes.actions}>
        <button onClick={logOut}>Logout</button>
      </div>
    </div>
  );
};

export default Logout;
