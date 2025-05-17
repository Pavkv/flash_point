import SearchForm from "../SearchForm/SearchForm.jsx";

export default function Main({ setSearchResults, setPreLoading }) {
  return (
    <div className="main">
      <h1 className="main__header">What's going on in the world?</h1>
      <p className="main__text">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <SearchForm
        setSearchResults={setSearchResults}
        setPreLoading={setPreLoading}
      />
    </div>
  );
}
