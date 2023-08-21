import axios from "axios";

const api = axios.create({
  baseURL: "https://petardev.live/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const request = async (method, url, data) => {
  const userToken = JSON.parse(localStorage.getItem("user"))?.token;

  const headers = {
    Accept: "application/json",
  };

  if (userToken) {
    headers["Authorization"] = `Bearer ${userToken}`;
  }

  let config = {
    method: method,
    url: `https://petardev.live${url}`,
    headers: headers,
  };

  if (data instanceof FormData) {
    config.data = data;
  } else if (data) {
    // Convert other data to JSON string if needed
    config.data = JSON.stringify(data);
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await api.request(config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred during the request");
  }
};

export { api };
