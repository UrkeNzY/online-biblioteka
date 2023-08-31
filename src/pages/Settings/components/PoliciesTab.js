import { Fragment } from "react";
import InputText from "../../../components/Forms/InputText";

import classes from "../../../styles/Settings.module.css";

const PoliciesTab = () => {
  return (
    <div className={classes.policySection}>
      <div className={classes.policyContainer}>
        <div>
          <p className={classes.policyTitle}>Rok za rezervaciju</p>
          <p className={classes.policyDescription}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum
            eligendi nihil, vel necessitatibus saepe laboriosam! Perspiciatis
            laboriosam culpa veritatis ea voluptatum commodi tempora unde,
            dolorum debitis quia id dicta vitae.
          </p>
        </div>
        <div className={classes.policyInput}>
          <InputText value="..." disabled />
          <p>dana</p>
        </div>
      </div>
      <hr />
      <div className={classes.policyContainer}>
        <div>
          <p className={classes.policyTitle}>Rok vracanja</p>
          <p className={classes.policyDescription}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum
            eligendi nihil, vel necessitatibus saepe laboriosam! Perspiciatis
            laboriosam culpa veritatis ea voluptatum commodi tempora unde,
            dolorum debitis quia id dicta vitae.
          </p>
        </div>
        <div className={classes.policyInput}>
          <InputText value="..." disabled />
          <p>dana</p>
        </div>
      </div>
      <hr />
      <div className={classes.policyContainer}>
        <div>
          <p className={classes.policyTitle}>Rok konflikta</p>
          <p className={classes.policyDescription}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum
            eligendi nihil, vel necessitatibus saepe laboriosam! Perspiciatis
            laboriosam culpa veritatis ea voluptatum commodi tempora unde,
            dolorum debitis quia id dicta vitae.
          </p>
        </div>
        <div className={classes.policyInput}>
          <InputText value="..." disabled />
          <p>dana</p>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default PoliciesTab;
