import axios from "axios";

const api = axios.create({
  baseURL: "https://tim6.petardev.live/api",
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

  console.log(userToken);

  if (userToken) {
    headers["Authorization"] = `Bearer ${userToken}`;
  }

  let config = {
    method: method,
    url: `https://tim6.petardev.live${url}`,
    headers: headers,
  };

  if (data) {
    config.data = JSON.stringify(data);
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await api.request(config);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { api };
