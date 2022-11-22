import { API_BASE_URL } from "./constants";

export const fetchApi = async (method, url, body = {}) => {
  const defaultHeaders = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  let response;
  switch (method) {
    case "GET":
      response = await fetch(API_BASE_URL + `/${url}`, defaultHeaders);
      return response.json();
    case "POST":
      response = await fetch(API_BASE_URL + `/${url}`, {
        ...defaultHeaders,
        body,
      });
      return response.json();
    default:
      response = await fetch(API_BASE_URL + `/${url}`, defaultHeaders);
      return response.json();
  }
};
