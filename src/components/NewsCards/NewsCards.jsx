import NewsCard from "../NewsCard/NewsCard.jsx";

export default function NewsCards({ searchResults, isLoggedIn, visibleCards }) {
  return (
    <ul className="news-cards">
      {searchResults.slice(0, visibleCards).map((newsCard) => (
        <NewsCard
          key={newsCard._id}
          newsCard={newsCard}
          isLoggedIn={isLoggedIn}
        />
      ))}
    </ul>
  );
}
