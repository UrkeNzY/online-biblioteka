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

export const updateBook = (updatedData, bookIndex) => {
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
