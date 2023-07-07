import Table from "../../components/UI/Tables/Table";

const tableColumns = [
  { header: "Naziv knjige", field: "bookName", width: "17%" },
  { header: "Autor", field: "author", width: "20%" },
  { header: "Kategorija", field: "bookCategory", width: "10%" },
  { header: "Na raspolaganju", field: "availableBooks", width: "10%" },
  { header: "Rezervisano", field: "reservedBooks", width: "8%" },
  { header: "Izdato", field: "issuedBooks", width: "5%" },
  { header: "U prekoracenju", field: "offLimitBooks", width: "10%" },
  { header: "Ukupna kolicina", field: "bookTotalAmount", width: "15%" },
];

const tableData = [
  {
    id: 1,
    name: "Geografija Crne Gore",
    author: "Maksimovic Darinka",
    category: "Udzbenici",
    available: "6",
    reserved: "5",
    issued: "5",
    offLimit: "2",
    totalAmount: "11",
    actionButton: "images/buttons/dashboard-actions.svg",
    image: "images/placeholders/book-cover.jpg",
    imageType: "bookCover"
  },
  {
    id: 2,
    name: "Muzicka kultura I razred Gimnazije",
    author: "Bubalo Zivkovic",
    category: "Udzbenici",
    available: "20",
    reserved: "0",
    issued: "0",
    offLimit: "0",
    totalAmount: "20",
    actionButton: "images/buttons/dashboard-actions.svg",
    image: "images/placeholders/book-cover.jpg",
    imageType: "bookCover"
  },
  {
    id: 3,
    name: "Tom Sojer",
    author: "Mark Twain",
    category: "Romani",
    available: "3",
    reserved: "2",
    issued: "7",
    offLimit: "1",
    totalAmount: "10",
    actionButton: "images/buttons/dashboard-actions.svg",
    image: "images/placeholders/book-cover.jpg",
    imageType: "bookCover"
  },
  {
    id: 4,
    name: "Robinson Kruso",
    author: "Daniel Defoe",
    category: "Romani",
    available: "0",
    reserved: "0",
    issued: "10",
    offLimit: "2",
    totalAmount: "10",
    actionButton: "images/buttons/dashboard-actions.svg",
    image: "images/placeholders/book-cover.jpg",
    imageType: "bookCover"
  },
  {
    id: 5,
    name: "Geografija Crne Gore",
    author: "Maksimovic Darinka",
    category: "Udzbenici",
    available: "6",
    reserved: "5",
    issued: "5",
    offLimit: "1",
    totalAmount: "11",
    actionButton: "images/buttons/dashboard-actions.svg",
    image: "images/placeholders/book-cover.jpg",
    imageType: "bookCover"
  },
  {
    id: 6,
    name: "Muzicka kultura I razred Gimnazije",
    author: "Bubalo Zivkovic",
    category: "Udzbenici",
    available: "20",
    reserved: "0",
    issued: "0",
    offLimit: "0",
    totalAmount: "20",
    actionButton: "images/buttons/dashboard-actions.svg",
    image: "images/placeholders/book-cover.jpg",
    imageType: "bookCover"
  },
  {
    id: 7,
    name: "Tom Sojer",
    author: "Mark Twain",
    category: "Romani",
    available: "3",
    reserved: "2",
    issued: "7",
    offLimit: "2",
    totalAmount: "10",
    actionButton: "images/buttons/dashboard-actions.svg",
    image: "images/placeholders/book-cover.jpg",
    imageType: "bookCover"
  },
  {
    id: 8,
    name: "Robinson Kruso",
    author: "Daniel Defoe",
    category: "Romani",
    available: "0",
    reserved: "0",
    issued: "10",
    offLimit: "1",
    totalAmount: "10",
    actionButton: "images/buttons/dashboard-actions.svg",
    image: "images/placeholders/book-cover.jpg",
    imageType: "bookCover"
  },
];

const Knjige = () => {
  return <Table tableColumns={tableColumns} tableData={tableData} />;
};

export default Knjige;
