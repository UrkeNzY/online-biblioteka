import React, { createContext, useState, useContext } from "react";
import { createBook } from "../services/books";

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
  const [submittedReleaseDate, setSubmittedReleaseDate] = useState("")
  const [submittedISBN, setSubmittedISBN] = useState("");
  const [newBookData, setNewBookData] = useState({});

  const updateNewBook = (data) => {
    setNewBookData((prevState) => ({
      ...prevState,
      ...data,
    }));
    console.log(newBookData);
  };

  const submitFormHandler = async () => {
    try {
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
    } catch (error) {
      console.log(error);
    }

    resetValuesHandler();
  };

  const resetValuesHandler = () => {
    setSubmittedName("");
    setSubmittedDescription("");
    setSubmittedCategory("");
    setSubmittedGenre("");
    setSubmittedAuthor("");
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
