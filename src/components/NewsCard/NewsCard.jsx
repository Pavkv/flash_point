import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function NewsCard({ newsCard, isLoggedIn }) {
  const location = useLocation();
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (isLoggedIn) {
      setIsSaved(!isSaved);
    }
  };

  return (
    <li className="news-card">
      <div
        className="news-card__button"
        onClick={() =>
          window.open(newsCard.url, "_blank", "noopener,noreferrer")
        }
      >
        {location.pathname === "/" ? (
          <div className="news-card__handle-container">
            <button
              type="button"
              className={`news-card__handle-btn news-card__handle-btn-save news-card__handle-btn-save_${isSaved ? "selected" : "idle"}`}
              onClick={(e) => {
                e.stopPropagation();
                handleSave();
              }}
            />
            {!isLoggedIn && (
              <span className="news-card__tooltip">
                Sign in to save articles
              </span>
            )}
          </div>
        ) : (
          <div className="news-card__handle-container">
            <button
              type="button"
              className={`news-card__handle-btn news-card__handle-btn-delete`}
              onClick={(e) => {
                e.stopPropagation();
                handleSave();
              }}
            />
            <span className="news-card__keyword">{newsCard.keyword}</span>
          </div>
        )}
        <img
          className="news-card__img"
          src={new URL(newsCard.image, import.meta.url).href}
          alt={newsCard.title}
        />
        <div className="news-card__info">
          <p className="news-card__info-date">{newsCard.date}</p>
          <h2 className="news-card__info-title">{newsCard.title}</h2>
          <p className="news-card__info-description">{newsCard.description}</p>
          <p className="news-card__info-author">{newsCard.author}</p>
        </div>
      </div>
    </li>
  );
}
