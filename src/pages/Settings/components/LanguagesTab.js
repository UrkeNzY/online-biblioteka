import { useState, useEffect } from "react";
import { fetchcreateBookData } from "../../../services/books";

import Table from "../../../components/UI/Tables/Table";

const tableColumns = [
  { header: "Naziv jezika", field: "categoryName", width: "100%" },
];

const WritingTab = () => {
  const [bookLanguages, setBookLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const isDisabled = true;

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setIsLoading(true);
        const bookData = await fetchcreateBookData();

        const languages = bookData.data.languages.map((language) => ({
          id: language.id,
          name: language.name,
        }));

        setBookLanguages(languages);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  return (
    <Table
      tableColumns={tableColumns}
      tableData={bookLanguages}
      isLoading={isLoading}
      isDisabled={isDisabled}
      loadingSpinner="/images/icons/settings-loading-spinner.gif"
    />
  );
};

export default WritingTab;
