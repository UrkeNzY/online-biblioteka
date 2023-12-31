import { request } from "./api";

export const registerUser = (registerData) => {
  return request("post", "/api/register", registerData);
};

export const updateMe = (updatedData) => {
  return request("put", "/api/users/me", updatedData);
};

export const updateUser = (userId, updatedData) => {
  return request("put", `/api/users/${userId}`, updatedData);
};

export const deleteUser = (userId) => {
  return request("delete", `/api/users/${userId}`);
};

export const userSignIn = (signInData) => {
  return request("post", "/api/login", signInData);
};

export const userInfo = () => {
  let data = "";
  return request("post", "/api/users/me", data);
};

export const userIssueInfo = () => {
  return request("get", "/api/users/me/izdavanja");
};

export const userReservationInfo = () => {
  return request("get", "/api/users/me/rezervacije");
};

export const userLogout = () => {
  let data = JSON.stringify({
    all: true,
  });

  return request("post", "/api/logout", data);
};

export const createUser = (data) => {
  return request("post", "/api/users/store", data);
};

export const listUsers = (data) => {
  return request("get", "/api/users", data);
};

export const listSingleUser = (userId) => {
  return request("get", `/api/users/${userId}`);
};
