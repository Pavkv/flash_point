import NewsCard from "../NewsCard/NewsCard.jsx";

export default function NewsCards({
  searchResults,
  isLoggedIn,
  visibleCards,
  handleArticle,
  openModal,
}) {
  return (
    <ul className="news-cards">
      {searchResults.slice(0, visibleCards).map((newsCard) => (
        <NewsCard
          key={newsCard.url}
          newsCard={newsCard}
          isLoggedIn={isLoggedIn}
          handleArticle={handleArticle}
          openModal={openModal}
        />
      ))}
    </ul>
  );
}
