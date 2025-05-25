import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { MobileContext } from "../../context/MobileContext.js";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";

export default function Navigation({
  isLoggedIn,
  openModalClick,
  isDarkRoute,
  signOut,
}) {
  const { isMobile, isMobileMenuOpen, toggleMobileMenu } =
    useContext(MobileContext);
  const { currentUser } = useContext(CurrentUserContext);
  const location = useLocation();

  const navClass = `nav${isMobileMenuOpen ? "__mobile" : ""} ${
    isMobileMenuOpen && isDarkRoute
      ? "nav__mobile--theme-light"
      : "nav__mobile--theme-dark"
  }`;
  const linkClass = `nav__link nav__link_${isDarkRoute ? "theme_light" : "theme_dark"}`;
  const userClass = `nav__user nav__user_${isDarkRoute ? "theme_light" : "theme_dark"}`;
  const logoutClass = `${userClass} nav__user_logout nav__user_logout_${isDarkRoute ? "theme_light" : "theme_dark"}`;

  const closeMobileMenu = () => {
    if (isMobile && isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  return (
    <ul className={navClass}>
      <li>
        <Link
          to="/"
          className={`${linkClass} ${location.pathname === "/" ? "nav__link_active" : ""}`}
          onClick={closeMobileMenu}
        >
          Home
        </Link>
      </li>
      {isLoggedIn ? (
        <>
          <li>
            <Link
              to="/saved-news"
              className={`${linkClass} ${location.pathname === "/saved-news" ? "nav__link_active" : ""}`}
              onClick={closeMobileMenu}
            >
              Saved News
            </Link>
          </li>
          <li>
            <a
              className={logoutClass}
              onClick={() => {
                signOut();
                closeMobileMenu();
              }}
            >
              {currentUser.username}
            </a>
          </li>
        </>
      ) : (
        <li>
          <a
            className={userClass}
            onClick={() => {
              openModalClick("login");
            }}
          >
            Sign in
          </a>
        </li>
      )}
    </ul>
  );
}
