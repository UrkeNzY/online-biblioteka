import React from "react";
import { useLocation } from "react-router-dom";

import classes from "../../styles/Forms.module.css";

import { BsCheck2 } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineArrowRight } from "react-icons/ai";

const FormButtons = (props) => {
  const location = useLocation();

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
        {location.pathname === "/new-book/media" ||
        location.pathname === "/new-book/media/edit" ||
        location.pathname === "/new-user" ||
        location.pathname === "/new-author"
          ? "Sačuvaj"
          : "Dalje"}
        {location.pathname === "/new-book/media" ||
        location.pathname === "/new-book/media/edit" ||
        location.pathname === "/new-user" ||
        location.pathname === "/new-author" ? (
          <BsCheck2 className={classes.buttonIcon} />
        ) : (
          <AiOutlineArrowRight className={classes.buttonIcon} />
        )}
      </button>
    </section>
  );
};

export default FormButtons;
