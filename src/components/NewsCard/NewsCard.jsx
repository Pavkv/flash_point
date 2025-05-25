import { useLocation } from "react-router-dom";

export default function NewsCard({
  newsCard,
  isLoggedIn,
  handleArticle,
  openModal,
}) {
  const location = useLocation();

  const handleSaveClick = (e) => {
    e.stopPropagation();
    if (newsCard.isSaved) {
      openModal({ name: "delete-confirmation", article: newsCard });
    } else {
      handleArticle(false, newsCard);
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    openModal({ name: "delete-confirmation", article: newsCard });
  };

  const renderTooltip = () => {
    if (newsCard.isSaved) return "Remove from saved";
    if (!isLoggedIn) return "Sign in to save articles";
    return "";
  };

  const getDate = () => {
    return new Date(newsCard.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <li className="news-card">
      <div
        className="news-card__button"
        onClick={() =>
          window.open(newsCard.url, "_blank", "noopener,noreferrer")
        }
      >
        <span className="news-card__keyword">{newsCard.keyword}</span>
        <div className="news-card__handle-container">
          {location.pathname === "/" ? (
            <>
              <button
                type="button"
                className={`news-card__handle-btn news-card__handle-btn-save news-card__handle-btn-save_${newsCard.isSaved ? "selected" : "idle"}`}
                onClick={handleSaveClick}
              />
              {(newsCard.isSaved || !isLoggedIn) && (
                <span className="news-card__tooltip">{renderTooltip()}</span>
              )}
            </>
          ) : (
            <>
              <button
                type="button"
                className="news-card__handle-btn news-card__handle-btn-delete"
                onClick={handleDeleteClick}
              />
              {(newsCard.isSaved || !isLoggedIn) && (
                <span className="news-card__tooltip">{renderTooltip()}</span>
              )}
            </>
          )}
        </div>
        <img
          className="news-card__img"
          src={new URL(newsCard.imageUrl, import.meta.url).href}
          alt={newsCard.title}
        />
        <div className="news-card__info">
          <p className="news-card__info-date">{getDate()}</p>
          <h2 className="news-card__info-title">{newsCard.title}</h2>
          <p className="news-card__info-description">{newsCard.description}</p>
          <p className="news-card__info-author">{newsCard.author}</p>
        </div>
      </div>
    </li>
  );
}
