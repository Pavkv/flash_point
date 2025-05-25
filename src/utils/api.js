import fetchResponse from "./fetch.js";
import { baseUrl } from "./constants.js";

export const getUserArticles = (token) => {
  return fetchResponse(
    baseUrl,
    "users/me/savedArticles",
    "GET",
    undefined,
    token,
  ).then((res) => {
    return res.data.reverse();
  });
};

export const addArticle = (article, token) => {
  return fetchResponse(
    baseUrl,
    "users/me/savedArticles",
    "POST",
    article,
    token,
  );
};

export const deleteArticle = (url, token) => {
  return fetchResponse(
    baseUrl,
    `users/me/savedArticles?url=${url}`,
    "DELETE",
    undefined,
    token,
  );
};
