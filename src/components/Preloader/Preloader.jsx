export default function Preloader({ isPreloading }) {
  return (
    <div className="preloader">
      <div className="preloader__container">
        {isPreloading === "loading" ? (
          <>
            <span className="preloader__circle" />
            <p className="preloader__text">Searching for news...</p>
          </>
        ) : (
          <>
            <span className="preloader__not-found" />
            <h3 className="preloader__header">Nothing Found</h3>
            <p className="preloader__text">
              Sorry, but nothing matched
              <br />
              your search terms.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
