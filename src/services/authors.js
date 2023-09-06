import { request } from "./api";

export const listAuthors = () => {
  return request("get", "/api/authors");
};

export const showAuthor = (authorId) => {
  return request("get", `/api/authors/${authorId}`);
};

export const storeAuthor = (authorData) => {
  return request("post", "/api/authors/store", authorData);
};

export const editAuthor = (authorId, editedData) => {
  return request("put", `/api/authors/${authorId}`, editedData);
};

export const deleteAuthor = (authorId) => {
  return request("delete", `/api/authors/${authorId}`);
};
