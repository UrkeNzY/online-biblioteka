import React from "react";
import classes from "../../styles/Forms.module.css";

import { BsCheck2 } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";

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
        className={classes.button}
        id={classes.sacuvaj}
        onClick={props.onClick}
      >
        Sačuvaj
        <BsCheck2 className={classes.buttonIcon} />
      </button>
    </section>
  );
};

export default FormButtons;
