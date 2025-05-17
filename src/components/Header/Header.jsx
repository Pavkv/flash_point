import Navigation from "../Navigation/Navigation.jsx";
import { useContext } from "react";
import { MobileContext } from "../../context/MobileContext.js";

export default function Header({ isLoggedIn, isDarkRoute, openModalClick }) {
  const { isMobile, isMobileMenuOpen, toggleMobileMenu } =
    useContext(MobileContext);

  const mobileButtonClass = `header__mobile-btn ${
    isMobileMenuOpen
      ? `header__mobile-close_${isDarkRoute ? "light" : "dark"}`
      : `header__mobile-toggle_${isDarkRoute ? "light" : "dark"}`
  }`;

  const mobileMenuClass = `header__mobile ${
    isMobileMenuOpen
      ? isDarkRoute
        ? "header__mobile_open_light"
        : "header__mobile_open_dark"
      : ""
  }`;

  return (
    <div className={`header header_${isDarkRoute ? "light" : "dark"}`}>
      {isMobile ? (
        <>
          <div className={mobileMenuClass}>
            <p className="header__logo">NewsExplorer</p>
            <button
              type="button"
              className={mobileButtonClass}
              onClick={toggleMobileMenu}
            />
          </div>
          {isMobileMenuOpen && (
            <nav className="header__nav header__nav_visible">
              <Navigation
                isLoggedIn={isLoggedIn}
                openModalClick={openModalClick}
                isDarkRoute={isDarkRoute}
              />
            </nav>
          )}
        </>
      ) : (
        <>
          <p className="header__logo">NewsExplorer</p>
          <nav className="header__nav">
            <Navigation
              isLoggedIn={isLoggedIn}
              openModalClick={openModalClick}
              isDarkRoute={isDarkRoute}
            />
          </nav>
        </>
      )}
    </div>
  );
}
