import { useState, useEffect } from "react";
import { fetchcreateBookData } from "../../../services/books";

import Table from "../../../components/UI/Tables/Table";

const tableColumns = [
  { header: "Naziv žanra", field: "categoryName", width: "100%" },
];

const GenresTab = () => {
  const [bookGenres, setBookGenres] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const isDisabled = true;

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setIsLoading(true);
        const bookData = await fetchcreateBookData();

        const genres = bookData.data.genres.map((genre) => ({
          id: genre.id,
          name: genre.name,
        }));

        setBookGenres(genres);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return (
    <Table
      tableColumns={tableColumns}
      tableData={bookGenres}
      isLoading={isLoading}
      isDisabled={isDisabled}
      loadingSpinner="/images/icons/settings-loading-spinner.gif"
    />
  );
};

export default GenresTab;
