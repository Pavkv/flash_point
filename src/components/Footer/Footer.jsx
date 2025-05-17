import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
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
        />
        <a
          className="footer__button footer__linkedin"
          href="https://www.linkedin.com/in/pavel-zobov-3a6365230/"
        />
      </div>
    </div>
  );
}
