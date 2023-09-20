import React, { createContext, useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createBook, editBook, updateBook } from "../services/books";

const CreateBookContext = createContext();

export const CreateBookProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    submittedName: "",
    submittedDescription: "",
    submittedCategory: [],
    submittedGenre: [],
    submittedAuthor: [],
    submittedPublisher: "",
    submittedAmount: "",
    submittedPages: "",
    submittedScript: "",
    submittedLanguage: "",
    submittedBinding: "",
    submittedFormat: "",
    submittedReleaseDate: "",
    submittedISBN: "",
  });

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
        nazivKnjiga: formData.submittedName,
        brStrana: formData.submittedPages,
        pismo: formData.submittedScript,
        jezik: formData.submittedLanguage,
        povez: formData.submittedBinding,
        format: formData.submittedFormat,
        izdavac: formData.submittedPublisher,
        godinaIzdavanja: formData.submittedReleaseDate,
        isbn: formData.submittedISBN,
        knjigaKolicina: formData.submittedAmount,
        kratki_sadrzaj: formData.submittedDescription,
        deletePdfs: 0,
        categories: formData.submittedCategory,
        genres: formData.submittedGenre,
        authors: formData.submittedAuthor,
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
        nazivKnjiga: formData.submittedName,
        brStrana: formData.submittedPages,
        pismo: formData.submittedScript,
        jezik: formData.submittedLanguage,
        povez: formData.submittedBinding,
        format: formData.submittedFormat,
        izdavac: formData.submittedPublisher,
        godinaIzdavanja: formData.submittedReleaseDate,
        isbn: formData.submittedISBN,
        knjigaKolicina: formData.submittedAmount,
        kratki_sadrzaj: formData.submittedDescription,
        deletePdfs: 0,
        categories: formData.submittedCategory,
        genres: formData.submittedGenre,
        authors: formData.submittedAuthor,
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
    setFormData({
      submittedName: "",
      submittedDescription: "",
      submittedCategory: [],
      submittedGenre: [],
      submittedAuthor: [],
      submittedPublisher: "",
      submittedAmount: "",
      submittedPages: "",
      submittedScript: "",
      submittedLanguage: "",
      submittedBinding: "",
      submittedFormat: "",
      submittedReleaseDate: "",
      submittedISBN: "",
    });
  };

  return (
    <CreateBookContext.Provider
      value={{
        formData,
        setFormData,
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
