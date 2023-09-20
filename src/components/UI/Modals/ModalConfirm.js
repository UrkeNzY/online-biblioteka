import { Fragment, useState } from "react";

import classes from "../../../styles/ModalConfirm.module.css";

const ModalConfirm = (props) => {
  return (
    <Fragment>
      <div className={classes.modalBackdrop}>
        <div className={classes.modalContainer}>
          <p className={classes.modalTitle}>Da li ste sigurni...?</p>
          <p className={classes.modalText}>{props.text}</p>
          <div className={classes.modalActions}>
            <button className={classes.modalButton} onClick={props.onConfirm}>
              Da
            </button>
            <button className={classes.modalButton} onClick={props.onDecline}>
              Ne
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ModalConfirm;
