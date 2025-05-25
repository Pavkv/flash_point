import { baseUrl } from "./constants.js";

export default function getNews(query) {
  return fetch(`${baseUrl}/articles?q=${encodeURIComponent(query)}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  })
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Error ${res.status}`),
    )
    .then((data) => {
      return data;
    });
}
