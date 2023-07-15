import { Fragment } from "react";

import classes from '../../styles/Searchbar.module.css';

import Table from "../../components/UI/Tables/Table";
import Button from "../../components/UI/Buttons/Button";
import Searchbar from "../../components/UI/Searchbar/Searchbar";

const tableColumns = [
  { header: "Naziv autora", field: "authorName", width: "15%" },
  { header: "Opis", field: "description", width: "85%" },
];

const tableData = [
  {
    id: 1,
    name: "Mark Twain",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non, perferendis repudiandae ratione at porro, enim labore illo animi tempora quas neque.",
    image: "images/placeholders/author-image.avif",
  },
  {
    id: 2,
    name: "Danijel Defoe",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non, perferendis repudiandae ratione at porro, enim labore illo animi tempora quas neque.",
    image: "images/placeholders/author-image.avif",
  },
  {
    id: 3,
    name: "Desanka Maksimovic",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non, perferendis repudiandae ratione at porro, enim labore illo animi tempora quas neque.",
    image: "images/placeholders/author-image.avif",
  },
  {
    id: 4,
    name: "Bubalo Zivkovic",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non, perferendis repudiandae ratione at porro, enim labore illo animi tempora quas neque.",
    image: "images/placeholders/author-image.avif",
  },
  {
    id: 5,
    name: "Ivo Andric",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non, perferendis repudiandae ratione at porro, enim labore illo animi tempora quas neque.",
    image: "images/placeholders/author-image.avif",
  },
  {
    id: 6,
    name: "Mark Twain",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non, perferendis repudiandae ratione at porro, enim labore illo animi tempora quas neque.",
    image: "images/placeholders/author-image.avif",
  },
  {
    id: 7,
    name: "Danka Maksimovic",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non, perferendis repudiandae ratione at porro, enim labore illo animi tempora quas neque.",
    image: "images/placeholders/author-image.avif",
  },
  {
    id: 8,
    name: "Bubalo Zivkovic",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non, perferendis repudiandae ratione at porro, enim labore illo animi tempora quas neque.",
    image: "images/placeholders/author-image.avif",
  },
];

const Autori = () => {
  return (
    <Fragment>
      <div className={classes.topActionsArea}>
        <Button text="Novi autor" image="/images/icons/plus.svg" />
        <Searchbar />
      </div>
      <Table tableColumns={tableColumns} tableData={tableData} />
    </Fragment>
  );
};

export default Autori;
