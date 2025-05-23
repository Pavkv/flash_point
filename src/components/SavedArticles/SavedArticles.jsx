import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";

export default function SavedArticles({ savedArticles }) {
  const { currentUser } = useContext(CurrentUserContext);

  const keywords = [
    ...new Set(savedArticles.map((article) => article.keyword)),
  ];
  const formattedKeywords =
    keywords.length > 3
      ? `${keywords.slice(0, 3).join(", ")} and ${keywords.length - 3} other`
      : keywords.join(", ");

  return (
    <div className="saved-articles">
      <div className="saved-articles__container">
        <p className="saved-articles__text">Saved Articles</p>
        <h1 className="saved-articles__header">
          {currentUser.username}, you have saved {savedArticles.length} article
          {savedArticles.length !== 1 ? "s" : ""}
        </h1>
        {keywords.length > 0 && (
          <p className="saved-articles__keywords">
            By keywords: <strong>{formattedKeywords}</strong>
          </p>
        )}
      </div>
    </div>
  );
}
