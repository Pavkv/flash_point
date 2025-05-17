import NewsCards from "../NewsCards/NewsCards.jsx";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function SearchResults({ searchResults, isLoggedIn }) {
  const location = useLocation();
  const [visibleCards, setVisibleCards] = useState(() => {
    if (location.pathname === "/") {
      return 3;
    } else {
      return searchResults.length;
    }
  });

  return (
    <div className="search-results">
      {location.pathname === "/" ? (
        <>
          <h2 className="search-results__header">Search Results</h2>
          <NewsCards
            searchResults={searchResults}
            isLoggedIn={isLoggedIn}
            visibleCards={visibleCards}
          />
          {searchResults.length >= visibleCards && (
            <button
              className="search-results__show-more"
              type="button"
              onClick={() =>
                setVisibleCards((visibleCards) => visibleCards + 3)
              }
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <NewsCards
          searchResults={searchResults}
          isLoggedIn={isLoggedIn}
          visibleCards={visibleCards}
        />
      )}
    </div>
  );
}
