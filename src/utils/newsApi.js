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
          title: article.title,
          author: article.author,
          description: article.description,
          imageUrl: article.urlToImage,
          url: article.url,
          date: article.publishedAt,
          keyword: query.charAt(0).toUpperCase() + query.slice(1),
          isSaved: false,
        })),
    };
  });
};
