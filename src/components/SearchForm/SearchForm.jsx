import getNews from "../../utils/getNews.js";

export default function SearchForm({ setSearchResults, setPreLoading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value.trim();

    if (searchValue.length < 2) {
      setPreLoading("idle");
      return;
    }

    setPreLoading("loading");
    getNews(searchValue)
      .then((res) => {
        setPreLoading(res.articles.length ? "idle" : "not-found");
        if (res.articles.length) {
          setSearchResults(res.articles);
          e.target.reset();
        }
      })
      .catch(console.error);
  };

  return (
    <form className="search-form" noValidate onSubmit={handleSubmit}>
      <fieldset className="search-form__fieldset">
        <label className="search-form__label">
          <input
            type="text"
            className="search-form__input"
            name="search"
            placeholder="Enter topic"
            minLength="2"
            maxLength="30"
            required
          />
        </label>
        <button type="submit" className="search-form__button">
          Search
        </button>
      </fieldset>
    </form>
  );
}
