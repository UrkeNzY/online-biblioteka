import React from "react";
import classes from "./Forms.module.css";
import { BsCheck2 } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";

const FormButtons = () => {
  return (
    <section className={classes.buttons}>
      <button className={classes.button} id={classes.ponisti} type="reset">
        Poništi
        <RxCross1 className={classes.buttonIcon} />
      </button>
      <button className={classes.button} id={classes.sacuvaj} type="submit">
        Sačuvaj
        <BsCheck2 className={classes.buttonIcon} />
      </button>
    </section>
  );
};

export default FormButtons;
