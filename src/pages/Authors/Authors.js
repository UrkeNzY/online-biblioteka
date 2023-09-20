import { Fragment, useEffect, useState } from "react";
import { listAuthors } from "../../services/authors";

import classes from "../../styles/Searchbar.module.css";

import Table from "../../components/UI/Tables/Table";
import Button from "../../components/UI/Buttons/Button";
import Searchbar from "../../components/UI/Searchbar/Searchbar";

const tableColumns = [
  { header: "Naziv autora", field: "authorName", width: "20%" },
];

const Autori = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredTableData, setFilteredTableData] = useState([]);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const authors = await listAuthors();

        const authorData = authors.data.map((author) => ({
          id: author.id,
          name: author.name + " " + author.surname,
          image: "images/placeholders/author-image.png",
          link: `/author-profile/${author.id}`,
        }));
        setTableData(authorData);
        setFilteredTableData(authorData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateFilteredData = (value) => {
    const filteredData = tableData.filter((data) =>
      data.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTableData(filteredData);
  };

  return (
    <Fragment>
      <div className={classes.topActionsArea}>
        <Button
          text="Novi autor"
          to="/new-author"
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

export default Autori;
