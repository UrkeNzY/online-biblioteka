import axios from "axios";

export const request = async (method, url, data) => {
  let config = {
    method: method,
    maxBodyLength: Infinity,
    url: `https://www.petardev.live${url}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer 84|ZOmLfdpBb47PPjJrda4NyCZ7KSmAew3WVxKuN0TC",
    },

    data: data ? JSON.stringify(data) : "",
  };

  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred during the request");
  }
};
