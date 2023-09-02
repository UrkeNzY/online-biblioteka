import React from "react";

import classes from "../../styles/Forms.module.css";

import { BsCheck2 } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineArrowRight } from "react-icons/ai";

const FormButtons = (props) => {
  return (
    <section className={classes.buttons}>
      <button
        className={classes.button}
        id={classes.ponisti}
        onClick={props.onClickAlt}
      >
        Poništi
        <RxCross1 className={classes.buttonIcon} />
      </button>
      <button
        className={`${classes.button} ${
          props.disabled ? classes.disabled : ""
        }`}
        id={classes.sacuvaj}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.label}
        {props.label === "Dalje" ? (
          <AiOutlineArrowRight className={classes.buttonIcon} />
        ) : (
          <BsCheck2 className={classes.buttonIcon} />
        )}
      </button>
    </section>
  );
};

export default FormButtons;
