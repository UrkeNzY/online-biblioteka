import classes from "../../../styles/BookDetails.module.css";

const DUMMY_DATA = [
  { title: "Broj strana", data: "264" },
  { title: "Pismo", data: "Cirilica" },
  { title: "Jezik", data: "Crnogorski" },
  { title: "Povez", data: "Tvrd" },
  { title: "Format", data: "21cm" },
  { title: "International Standard Book Number (ISBN)", data: "1546213456878" },
];

const BookSpecDetails = () => {
  return (
    <div className={classes.specsContainer}>
      {DUMMY_DATA.map((bookSpec) => {
        return (
          <div className={classes.detailContainer}>
            <p className={classes.detailTitle}>{bookSpec.title}</p>
            <p className={classes.mainDetailText}>{bookSpec.data}</p>
          </div>
        );
      })}
    </div>
  );
};

export default BookSpecDetails;
