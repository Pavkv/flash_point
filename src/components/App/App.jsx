import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ProtectedRoute from "../../utils/ProtectedRoute.jsx";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import About from "../About/About.jsx";
import SearchResults from "../SearchResults/SearchResults.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import SavedArticles from "../SavedArticles/SavedArticles.jsx";
import LoginModal from "../ModalWithForm/LoginModal.jsx";
import RegisterModal from "../ModalWithForm/RegisterModal.jsx";
import { MobileContext } from "../../context/MobileContext.js";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";
import { getCurrentUser } from "../../utils/auth.js";
import { addArticle, deleteArticle, getUserArticles } from "../../utils/api.js";
import DeleteConfirmationModal from "../Modal/DeleteConfirmationModal.jsx";
import SuccessfullyRegistrationModal from "../Modal/SuccessfullyRegistrationModal.jsx";
import { getToken, removeToken } from "../../utils/token.js";

export default function App() {
  const location = useLocation();
  const [isDarkRoute, setDarkRoute] = useState(location.pathname === "/");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isPreLoading, setPreLoading] = useState("idle");
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [visibleCards, setVisibleCards] = useState(
    location.pathname === "/" ? 3 : 0,
  );
  const [savedArticles, setSavedArticles] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const resizeWindow = () => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 430);
      if (window.innerWidth > 430) setMobileMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  };

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) return;

    getCurrentUser(jwt)
      .then((user) => {
        setCurrentUser(user.data);
        setLoggedIn(true);
        return getUserArticles(jwt);
      })
      .then((data) => {
        setSavedArticles(
          data.map((article) => ({
            ...article,
            isSaved: true,
          })),
        );
      })
      .catch(console.error);

    resizeWindow();
  }, []);

  useEffect(() => {
    resizeWindow();
  }, [window.innerWidth]);

  useEffect(() => {
    setDarkRoute(location.pathname === "/");
    if (location.pathname === "/saved-news") {
      setSearchResults([]);
    }
  }, [location.pathname]);

  useEffect(() => {
    setSearchResults((prev) =>
      prev.map((article, index) => ({
        ...article,
        isSaved:
          index < visibleCards &&
          savedArticles.some((saved) => saved.url === article.url),
      })),
    );
  }, [savedArticles, visibleCards, searchResults.length]);

  const openModal = (modalName) => setModalOpen(modalName);
  const closeModal = () => {
    setModalOpen("");
    setLoading(false);
    toggleMobileMenu();
  };
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  const handleArticle = (isSaved, article) => {
    const { isSaved: _, ...articleData } = article;
    const action = isSaved ? deleteArticle : addArticle;
    const param = isSaved ? encodeURIComponent(article.url) : articleData;
    const updatedArticles = isSaved
      ? savedArticles.filter((item) => item.url !== article.url)
      : [...savedArticles, { ...article, isSaved: true }];

    action(param, getToken())
      .then(() => {
        setSavedArticles(updatedArticles);
        closeModal();
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const signOut = () => {
    setSavedArticles([]);
    setSearchResults([]);
    setCurrentUser({});
    setLoggedIn(false);
    removeToken();
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <MobileContext.Provider
        value={{ isMobile, isMobileMenuOpen, toggleMobileMenu }}
      >
        <div
          className={`app app_${isDarkRoute ? "theme_light" : "theme_dark"} ${isMobile && isMobileMenuOpen ? "app_mobile" : ""}`}
        >
          <div className={`overlay${isDarkRoute ? "" : "_disabled"}`}>
            <Header
              isLoggedIn={isLoggedIn}
              isDarkRoute={isDarkRoute}
              openModalClick={openModal}
              setLoggedIn={setLoggedIn}
              signOut={signOut}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Main
                      isLoggedIn={isLoggedIn}
                      setPreLoading={setPreLoading}
                      setSearchResults={setSearchResults}
                    />
                    {searchResults.length > 0 && (
                      <SearchResults
                        searchResults={searchResults}
                        isLoggedIn={isLoggedIn}
                        handleArticle={handleArticle}
                        visibleCards={visibleCards}
                        setVisibleCards={setVisibleCards}
                        openModal={openModal}
                      />
                    )}
                    {isPreLoading !== "idle" && (
                      <Preloader isPreloading={isPreLoading} />
                    )}
                    <About />
                  </>
                }
              />
              <Route
                path="/saved-news"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <SavedArticles savedArticles={savedArticles} />
                    {savedArticles.length > 0 && (
                      <SearchResults
                        searchResults={savedArticles}
                        isLoggedIn={isLoggedIn}
                        handleArticle={handleArticle}
                        openModal={openModal}
                      />
                    )}
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          {isModalOpen === "login" && (
            <LoginModal
              onOpen={openModal}
              onClose={closeModal}
              isOpen={isModalOpen}
              isLoading={isLoading}
              setLoading={setLoading}
              setLoggedIn={setLoggedIn}
              setSavedArticles={setSavedArticles}
            />
          )}
          {isModalOpen === "register" && (
            <RegisterModal
              onOpen={openModal}
              onClose={closeModal}
              isOpen={isModalOpen}
              isLoading={isLoading}
              setLoading={setLoading}
              openModal={openModal}
            />
          )}
          {isModalOpen === "successfully-registration" && (
            <SuccessfullyRegistrationModal
              onClose={closeModal}
              isOpen={isModalOpen}
              isLoading={isLoading}
              onClick={() => openModal("login")}
            />
          )}
          {isModalOpen.name === "delete-confirmation" && (
            <DeleteConfirmationModal
              onClose={closeModal}
              isOpen={isModalOpen}
              isLoading={isLoading}
              onClick={() => handleArticle(true, isModalOpen.article)}
            />
          )}
        </div>
      </MobileContext.Provider>
    </CurrentUserContext.Provider>
  );
}
