import React, { createContext, useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createBook, editBook, updateBook } from "../services/books";

const CreateBookContext = createContext();

export const CreateBookProvider = ({ children }) => {
  const [submittedName, setSubmittedName] = useState("");
  const [submittedDescription, setSubmittedDescription] = useState("");
  const [submittedCategory, setSubmittedCategory] = useState([]);
  const [submittedGenre, setSubmittedGenre] = useState([]);
  const [submittedAuthor, setSubmittedAuthor] = useState([]);
  const [submittedPublisher, setSubmittedPublisher] = useState("");
  const [submittedAmount, setSubmittedAmount] = useState("");
  const [submittedPages, setSubmittedPages] = useState("");
  const [submittedScript, setSubmittedScript] = useState("");
  const [submittedLanguage, setSubmittedLanguage] = useState("");
  const [submittedBinding, setSubmittedBinding] = useState("");
  const [submittedFormat, setSubmittedFormat] = useState("");
  const [submittedReleaseDate, setSubmittedReleaseDate] = useState("");
  const [submittedISBN, setSubmittedISBN] = useState("");
  const [newBookData, setNewBookData] = useState({});
  const [editBookData, setEditBookData] = useState({});
  const [bookFound, setBookFound] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [bookId, setBookId] = useState();
  const [bookErrors, setBookErrors] = useState({
    authors: "",
    bookbinds: "",
    categories: "",
    formats: "",
    genres: "",
    isbn: "",
    languages: "",
    pages: "",
    publishDate: "",
    publishers: "",
    samples: "",
    scripts: "",
    title: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isEditPath = location.pathname.endsWith("/edit");
    setIsEditing(isEditPath);
  }, [location.pathname, setIsEditing]);

  const updateNewBook = (data) => {
    setNewBookData((prevState) => ({
      ...prevState,
      ...data,
    }));
    console.log(newBookData);
  };

  const submitFormHandler = async () => {
    try {
      setIsLoading(true);
      await createBook({
        nazivKnjiga: newBookData.submittedName,
        brStrana: newBookData.submittedPages,
        pismo: newBookData.submittedScript,
        jezik: newBookData.submittedLanguage,
        povez: newBookData.submittedBinding,
        format: newBookData.submittedFormat,
        izdavac: newBookData.submittedPublisher,
        godinaIzdavanja: newBookData.submittedReleaseDate,
        isbn: newBookData.submittedISBN,
        knjigaKolicina: newBookData.submittedAmount,
        kratki_sadrzaj: newBookData.submittedDescription,
        deletePdfs: 0,
        categories: newBookData.submittedCategory,
        genres: newBookData.submittedGenre,
        authors: newBookData.submittedAuthor,
      });
      console.log("created book");
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data.errors);
      const errorData = error.response.data.errors;

      setBookErrors({
        authors: errorData.authors || "",
        bookbinds: errorData.bookbind_id || "",
        categories: errorData.categories || "",
        formats: errorData.format_id || "",
        genres: errorData.genres || "",
        isbn: errorData.isbn || "",
        languages: errorData.language_id || "",
        pages: errorData.pageNum || "",
        publishDate: errorData.publishDate || "",
        publishers: errorData.publisher_id || "",
        samples: errorData.samples || "",
        scripts: errorData.script_id || "",
        title: errorData.title || "",
      });
      navigate("/new-book/general");
      setIsLoading(false);
      return;
    }

    resetValuesHandler();
    navigate("/book-record");
  };

  const updateFormHandler = async () => {
    try {
      setIsLoading(true);
      await updateBook(bookId, {
        nazivKnjiga: newBookData.submittedName,
        brStrana: newBookData.submittedPages,
        pismo: newBookData.submittedScript,
        jezik: newBookData.submittedLanguage,
        povez: newBookData.submittedBinding,
        format: newBookData.submittedFormat,
        izdavac: newBookData.submittedPublisher,
        godinaIzdavanja: newBookData.submittedReleaseDate,
        isbn: newBookData.submittedISBN,
        knjigaKolicina: newBookData.submittedAmount,
        kratki_sadrzaj: newBookData.submittedDescription,
        deletePdfs: 0,
        categories: newBookData.submittedCategory,
        genres: newBookData.submittedGenre,
        authors: newBookData.submittedAuthor,
      });
      console.log("updated book");
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data.errors);
      const errorData = error.response.data.errors;

      setBookErrors({
        authors: errorData.authors || "",
        bookbinds: errorData.bookbind_id || "",
        categories: errorData.categories || "",
        formats: errorData.format_id || "",
        genres: errorData.genres || "",
        isbn: errorData.isbn || "",
        languages: errorData.language_id || "",
        pages: errorData.pageNum || "",
        publishDate: errorData.publishDate || "",
        publishers: errorData.publisher_id || "",
        samples: errorData.samples || "",
        scripts: errorData.script_id || "",
        title: errorData.title || "",
      });
      navigate("/new-book/general/edit");
      setIsLoading(false);
      return;
    }

    resetValuesHandler();
    navigate("/book-record");
  };

  const bookEditHandler = async (id) => {
    try {
      const fetchedBookData = await editBook(id);
      if (fetchedBookData.data && fetchedBookData.data.book) {
        const bookData = fetchedBookData.data.book;

        setBookId(id);

        console.log(bookData);

        setEditBookData({
          title: bookData.title,
          photo: bookData.photo,
          samples: bookData.samples,
          authors: bookData.authors.map((author) => author.id),
          categories: bookData.categories.map((category) => category.id),
          genres: bookData.genres.map((genre) => genre.id),
          bookbinds: bookData.bookbind.id,
          description: bookData.description,
          format: bookData.format.id,
          id: bookData.id,
          isbn: bookData.isbn,
          language: bookData.language.id,
          script: bookData.script.id,
          releaseDate: bookData.pDate,
          pages: bookData.pages,
          publisher: bookData.publisher.id,
        });
      } else {
        setBookFound(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetValuesHandler = () => {
    setSubmittedName("");
    setSubmittedDescription("");
    setSubmittedCategory([]);
    setSubmittedGenre([]);
    setSubmittedAuthor([]);
    setSubmittedPublisher("");
    setSubmittedAmount("");
    setSubmittedPages("");
    setSubmittedScript("");
    setSubmittedLanguage("");
    setSubmittedBinding("");
    setSubmittedFormat("");
    setSubmittedReleaseDate("");
    setSubmittedISBN("");
  };

  return (
    <CreateBookContext.Provider
      value={{
        submittedName,
        setSubmittedName,
        submittedDescription,
        setSubmittedDescription,
        submittedCategory,
        setSubmittedCategory,
        submittedGenre,
        setSubmittedGenre,
        submittedAuthor,
        setSubmittedAuthor,
        submittedPublisher,
        setSubmittedPublisher,
        submittedAmount,
        setSubmittedAmount,
        submittedPages,
        setSubmittedPages,
        submittedScript,
        setSubmittedScript,
        submittedLanguage,
        setSubmittedLanguage,
        submittedBinding,
        setSubmittedBinding,
        submittedFormat,
        setSubmittedFormat,
        submittedReleaseDate,
        setSubmittedReleaseDate,
        submittedISBN,
        setSubmittedISBN,
        updateNewBook,
        resetValuesHandler,
        submitFormHandler,
        editBookData,
        isEditing,
        setIsEditing,
        isLoading,
        hasError,
        setHasError,
        setEditBookData,
        bookFound,
        setBookFound,
        bookEditHandler,
        updateFormHandler,
        bookErrors,
      }}
    >
      {children}
    </CreateBookContext.Provider>
  );
};

export const useCreateBookContext = () => {
  const context = useContext(CreateBookContext);
  if (!context) {
    throw new Error(
      "useCreateBookContext must be used within a CreateBookProvider"
    );
  }
  return context;
};
