import Table from "../../components/Table";

const tableColumns = [
  { header: "Ime i prezime", field: "name", width: "25%" },
  { header: "Email", field: "email", width: "27%" },
  { header: "Tip korisnika", field: "userType", width: "20%" },
  { header: "Zadnji pristup sistemu", field: "lastAccess", width: "25%" },
];

const tableData = [
  {
    id: 1,
    name: "Pero Perovic",
    email: "pero.perovic@domain.net",
    userType: "Učenik",
    lastAccess: "Prije 10 sati",
    actionButton: "images/buttons/dashboard-actions.svg",
    image: "images/placeholders/male-pic.jpg"
  },
  {
    id: 2,
    name: "Danijela Nikolic",
    email: "danijela.nikolic@domain.net",
    userType: "Učenik",
    lastAccess: "Prije 2 dana",
    actionButton: "images/buttons/dashboard-actions.svg",
    image: "images/placeholders/female-pic.jpg"
  },
  {
    id: 3,
    name: "Mika Milic",
    email: "mika.milic@domain.net",
    userType: "Učenik",
    lastAccess: "Nikad se nije ulogovao",
    actionButton: "images/buttons/dashboard-actions.svg",
    image: "images/placeholders/female-pic.jpg"
  },
  {
    id: 4,
    name: "Zaim Zaimovic",
    email: "zaim.zaimovic@domain.net",
    userType: "Učenik",
    lastAccess: "Prije 2 nedelje",
    actionButton: "images/buttons/dashboard-actions.svg",
    image: "images/placeholders/male-pic.jpg"
  },
];

const Ucenici = () => {
  return <Table tableColumns={tableColumns} tableData={tableData} />;
};

export default Ucenici;
