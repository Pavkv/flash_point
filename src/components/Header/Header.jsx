import Navigation from "../Navigation/Navigation.jsx";
import { useContext } from "react";
import { MobileContext } from "../../context/MobileContext.js";

export default function Header({
  isLoggedIn,
  isDarkRoute,
  openModalClick,
  setLoggedIn,
  signOut,
}) {
  const { isMobile, isMobileMenuOpen, toggleMobileMenu } =
    useContext(MobileContext);

  const mobileButtonClass = `header__mobile-btn ${
    isMobileMenuOpen
      ? `header__mobile-close--${isDarkRoute ? "theme-light" : "theme-dark"}`
      : `header__mobile-toggle--${isDarkRoute ? "theme-light" : "theme-dark"}`
  }`;

  const mobileMenuClass = `header__mobile ${
    isMobileMenuOpen
      ? isDarkRoute
        ? "header__mobile--theme-light"
        : "header__mobile--theme-dark"
      : ""
  }`;

  return (
    <header
      className={`header header_${isDarkRoute ? "theme_light" : "theme_dark"}`}
    >
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
                setLoggedIn={setLoggedIn}
                signOut={signOut}
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
              setLoggedIn={setLoggedIn}
              signOut={signOut}
            />
          </nav>
        </>
      )}
    </header>
  );
}
