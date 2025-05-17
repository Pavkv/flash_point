import { getNews } from "../../utils/newsApi.js";

export default function SearchForm({ setSearchResults, setPreLoading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setPreLoading("loading");
    const searchValue = e.target.elements.search.value;
    if (searchValue.length < 2) {
      setPreLoading("idle");
      return;
    }

    getNews(searchValue)
      .then((res) => {
        if (res.articles.length === 0) {
          setPreLoading("not-found");
          return;
        }
        setPreLoading("idle");
        return setSearchResults([...res.articles]);
      })
      .catch(console.error);
  };

  return (
    <form className="search-form" noValidate onSubmit={(e) => handleSubmit(e)}>
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
