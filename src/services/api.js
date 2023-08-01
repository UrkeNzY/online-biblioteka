import axios from "axios";

const api = axios.create({
  baseURL: "https://petardev.live/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const request = async (method, url, data) => {
  const userToken = JSON.parse(localStorage.getItem("user"))?.token; // Get the user token from sessionStorage

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (userToken) {
    headers["Authorization"] = `Bearer ${userToken}`;
  }

  let config = {
    method: method,
    maxBodyLength: Infinity,
    url: `https://petardev.live${url}`,
    headers: headers,
    data: data ? JSON.stringify(data) : "",
  };

  try {
    const response = await api.request(config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred during the request");
  }
};

export { api };
