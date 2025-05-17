import { Link } from "react-router-dom";
import { useContext } from "react";
import { MobileContext } from "../../context/MobileContext.js";

export default function Navigation({
  isLoggedIn,
  openModalClick,
  isDarkRoute,
}) {
  const { isMobile, isMobileMenuOpen, toggleMobileMenu } =
    useContext(MobileContext);

  const navClass = `nav${isMobileMenuOpen ? "__mobile" : ""} ${
    isMobileMenuOpen && isDarkRoute ? "nav__mobile_light" : "nav__mobile_dark"
  }`;
  const linkClass = `nav__link nav__link_${isDarkRoute ? "light" : "dark"}`;
  const userClass = `nav__user nav__user_${isDarkRoute ? "light" : "dark"}`;
  const logoutClass = `${userClass} nav__user_logout nav__user_logout_${isDarkRoute ? "light" : "dark"}`;

  const closeMobileMenu = () => {
    if (isMobile && isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  return (
    <ul className={navClass}>
      <li>
        <Link to="/" className={linkClass} onClick={closeMobileMenu}>
          Home
        </Link>
      </li>
      {isLoggedIn ? (
        <>
          <li>
            <Link
              to="/saved-news"
              className={linkClass}
              onClick={closeMobileMenu}
            >
              Saved News
            </Link>
          </li>
          <li>
            <a className={logoutClass} onClick={closeMobileMenu}>
              Elise
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
