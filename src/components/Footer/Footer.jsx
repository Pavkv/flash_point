import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__license">
          © 2025 Flash Point, Powered by News API
        </p>
        <div className="footer__buttons">
          <Link to="/" className="footer__button footer__home" type="button">
            Home
          </Link>
          <a
            className="footer__button footer__github"
            href="https://github.com/Pavkv"
            target="_blank"
            rel="noopener noreferrer"
          />
          <a
            className="footer__button footer__linkedin"
            href="https://www.linkedin.com/in/pavel-zobov-3a6365230/"
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
      </div>
    </footer>
  );
}
