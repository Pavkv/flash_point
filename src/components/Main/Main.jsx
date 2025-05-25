import SearchForm from "../SearchForm/SearchForm.jsx";
import About from "../About/About.jsx";
import SearchResults from "../SearchResults/SearchResults.jsx";

export default function Main({
  searchResults,
  setSearchResults,
  setPreLoading,
  isLoggedIn,
  handleArticle,
  visibleCards,
  setVisibleCards,
  openModal,
}) {
  return (
    <>
      <main className="main">
        <h1 className="main__header">What's going on in the world?</h1>
        <p className="main__text">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <SearchForm
          setSearchResults={setSearchResults}
          setPreLoading={setPreLoading}
        />
      </main>
      {searchResults.length > 0 && (
        <SearchResults
          searchResults={searchResults}
          isLoggedIn={isLoggedIn}
          handleArticle={handleArticle}
          visibleCards={visibleCards}
          setVisibleCards={setVisibleCards}
          openModal={openModal}
        />
      )}
      <About />
    </>
  );
}
