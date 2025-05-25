import NewsCards from "../NewsCards/NewsCards.jsx";
import { useLocation } from "react-router-dom";

export default function SearchResults({
  searchResults,
  isLoggedIn,
  handleArticle,
  visibleCards,
  setVisibleCards,
  openModal,
}) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="search-results">
      <div className="search-results__container">
        {isHomePage && (
          <h2 className="search-results__header">Search Results</h2>
        )}
        <NewsCards
          searchResults={searchResults}
          isLoggedIn={isLoggedIn}
          visibleCards={visibleCards}
          handleArticle={handleArticle}
          openModal={openModal}
        />
        {isHomePage && searchResults.length >= visibleCards && (
          <button
            className="search-results__show-more"
            type="button"
            onClick={() => setVisibleCards((prev) => prev + 3)}
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
}
