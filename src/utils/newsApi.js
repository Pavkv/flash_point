import { NEWSAPIKEY } from "./constants.js";

const fetchResponse = async (url) => {
  return await fetch(`${url}`).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

export const getNews = (query) => {
  return fetchResponse(
    `https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWSAPIKEY}`,
  ).then((res) => {
    return {
      articles: res.articles
        .filter((article) => article.urlToImage && article.author)
        .map((article) => ({
          _id: crypto.randomUUID(),
          title: article.title,
          author: article.author,
          description: article.description,
          image: article.urlToImage,
          url: article.url,
          date: new Date(article.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          keyword: query,
        })),
    };
  });
};
