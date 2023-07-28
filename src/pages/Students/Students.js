import { Fragment } from "react";

import classes from '../../styles/Searchbar.module.css';

import Table from "../../components/UI/Tables/Table";
import Button from "../../components/UI/Buttons/Button";
import Searchbar from "../../components/UI/Searchbar/Searchbar";

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
    image: "images/placeholders/male-pic.jpg",
  },
  {
    id: 2,
    name: "Danijela Nikolic",
    email: "danijela.nikolic@domain.net",
    userType: "Učenik",
    lastAccess: "Prije 2 dana",
    actionButton: "images/buttons/dashboard-actions.svg",
    image: "images/placeholders/female-pic.jpg",
  },
  {
    id: 3,
    name: "Mika Milic",
    email: "mika.milic@domain.net",
    userType: "Učenik",
    lastAccess: "Nikad se nije ulogovao",
    actionButton: "images/buttons/dashboard-actions.svg",
    image: "images/placeholders/female-pic.jpg",
  },
  {
    id: 4,
    name: "Zaim Zaimovic",
    email: "zaim.zaimovic@domain.net",
    userType: "Učenik",
    lastAccess: "Prije 2 nedelje",
    actionButton: "images/buttons/dashboard-actions.svg",
    image: "images/placeholders/male-pic.jpg",
  },
];

const Ucenici = () => {
  return (
    <Fragment>
      <div className={classes.topActionsArea}>
      <Button text="Novi ucenik" image="/images/icons/plus.svg" />
      <Searchbar />
      </div>
      <Table tableColumns={tableColumns} tableData={tableData} />
    </Fragment>
  );
};

export default Ucenici;
