import Table from "../../components/UI/Tables/Table";

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
  return <Table tableColumns={tableColumns} tableData={tableData} />;
};

export default Autori;
