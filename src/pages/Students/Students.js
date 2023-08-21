import { useState, useEffect, Fragment } from "react";
import { listUsers } from "../../services/users";

import classes from "../../styles/Searchbar.module.css";

import Table from "../../components/UI/Tables/Table";
import Button from "../../components/UI/Buttons/Button";
import Searchbar from "../../components/UI/Searchbar/Searchbar";

const tableColumns = [
  { header: "Ime i prezime", field: "name", width: "25%" },
  { header: "Email", field: "email", width: "27%" },
  { header: "Tip korisnika", field: "userType", width: "20%" },
  { header: "Zadnji pristup sistemu", field: "lastAccess", width: "25%" },
];

const Ucenici = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredTableData, setFilteredTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const users = await listUsers();
        const formattedData = users.data
          .filter((user) => user.role === "Učenik")
          .map((user) => ({
            id: user.id,
            userType: user.role,
            jmbg: user.jmbg,
            image: user.photoPath,
            username: user.username,
            name: user.name + " " + user.surname,
            email: user.email,
            lastAccess: "Prije 10 sati",
            actionButton: "images/buttons/dashboard-actions.svg",
          }));

        setTableData(formattedData);
        setFilteredTableData(formattedData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateFilteredData = (value) => {
    const filteredData = tableData.filter(
      (data) =>
        data.name.toLowerCase().includes(value.toLowerCase()) ||
        data.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTableData(filteredData);
  };

  return (
    <Fragment>
      <div className={classes.topActionsArea}>
        <Button
          text="Novi ucenik"
          to="/new-user"
          image="/images/icons/plus.svg"
        />
        <Searchbar updateFilteredData={updateFilteredData} />
      </div>
      <Table
        tableColumns={tableColumns}
        tableData={filteredTableData}
        isLoading={isLoading}
      />
    </Fragment>
  );
};

export default Ucenici;
