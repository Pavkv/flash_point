export default function SavedArticles({ savedArticles }) {
  let keywords = savedArticles.map((article) => article.keyword);

  if (keywords.length > 3) {
    keywords =
      keywords.slice(0, 3) + " and " + (savedArticles.length - 3) + " other";
  }

  return (
    <div className="saved-articles">
      <p className="saved-articles__text">Saved Articles</p>
      <h1 className="saved-articles__header">
        Elise, you have saved {keywords.length} article
        {keywords.length > 1 ? "s" : ""}
      </h1>
      <p className="saved-articles__keywords">
        By keywords: <strong>{keywords}</strong>
      </p>
    </div>
  );
}
