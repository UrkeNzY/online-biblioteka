import { request } from "./api";

export const listBooks = () => {
  let data = "";

  return request("get", "/api/books", data);
};

export const getBook = (bookIndex) => {
  return request("get", `/api/books/${bookIndex}`);
};

export const editBook = (bookIndex) => {
  return request("get", `/api/books/${bookIndex}/edit`);
};

export const updateBook = (bookIndex, updatedData) => {
  return request("post", `/api/books/${bookIndex}/update`, updatedData);
};

export const fetchcreateBookData = () => {
  return request("get", "/api/books/create");
};

export const createBook = (createdData) => {
  return request("post", "/api/books/store", createdData);
};

export const deleteBook = (bookIndex) => {
  return request("delete", `/api/books/${bookIndex}/destroy`);
};

export const deleteBooksBulk = (bookIndexes) => {
  return request("delete", `/api/books/bulkdelete`);
};

export const reserveBook = (bookIndex, reserveInfo) => {
  return request("post", `/api/books/${bookIndex}/reserve`, reserveInfo);
};

export const cancelBookReservation = (reserveInfo) => {
  return request("post", "/api/books/reservations/cancel", reserveInfo);
};

export const deleteBookReservation = (reservationIndex) => {
  return request(
    "delete",
    `/api/books/reservations/${reservationIndex}/destroy`
  );
};

export const getAllReservations = (bookId) => {
  let data = JSON.stringify(bookId);
  return request("get", "/api/books/reservations", data);
};

export const issueBook = (bookIndex, issueData) => {
  return request("post", `/api/books/${bookIndex}/izdaj`, issueData);
};

export const returnBook = (returnData) => {
  return request("post", "/api/books/vrati", returnData);
};

export const writeBookOff = (writeOffData) => {
  return request("post", "/api/books/otpisi", writeOffData);
};

export const deleteBookIssuance = (bookIndex) => {
  return request("delete", `/api/books/borrows/${bookIndex}/destroy`);
};

export const allIssuances = (bookId) => {
  let data = JSON.stringify(bookId);
  return request("get", "/api/books/borrows", data);
};

export const createBookReview = (bookIndex, reviewData) => {
  return request("post", `/api/books/${bookIndex}/review`, reviewData);
};
