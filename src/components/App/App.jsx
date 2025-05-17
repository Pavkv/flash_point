import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import ProtectedRoute from "../../utils/ProtectedRoute.jsx";
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

export default function App() {
  const location = useLocation();
  const [isDarkRoute, setDarkRoute] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [isPreLoading, setPreLoading] = useState("idle");
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [savedArticles, setSavedArticles] = useState([
    {
      author: "Joe Tilleli",
      date: "April 29, 2025",
      description:
        "Bird Buddy, The Wonder Blocks smart modular habitat system for bees and butterflies and Petal smart camera launch today on Kickstarter.",
      image: "https://gizmodo.com/app/uploads/2025/04/WonderBlocksHeader.jpg",
      title:
        "Bird Buddy’s Next Smart Gadget Isn’t Just for Birds—It’s for Saving Pollinators Too",
      url: "https://gizmodo.com/bird-buddys-next-smart-gadget-isnt-just-for-birds-its-for-saving-pollinators-too-2000595029",
      _id: "c97afe7e-d7fd-45e6-a334-a65e765ac20b",
      keyword: "Pollinators",
    },
  ]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMobileMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      setDarkRoute(true);
    } else {
      setDarkRoute(false);
    }
  }, [location.pathname]);

  const openModal = (modalName) => {
    setModalOpen(modalName);
  };

  const closeModal = () => {
    setModalOpen("");
    setLoading(false);
  };

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <MobileContext.Provider
      value={{ isMobile, isMobileMenuOpen, toggleMobileMenu }}
    >
      <div
        className={`app app_${isDarkRoute ? "light" : "dark"} ${isMobile && isMobileMenuOpen ? "app_mobile" : ""}`}
      >
        <div className={`overlay${isDarkRoute ? "" : "_disabled"}`}>
          <Header
            isLoggedIn={isLoggedIn}
            isDarkRoute={isDarkRoute}
            openModalClick={openModal}
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
                  {searchResults.length !== 0 && (
                    <SearchResults
                      searchResults={searchResults}
                      isLoggedIn={isLoggedIn}
                    />
                  )}
                  {isPreLoading !== "idle" && (
                    <Preloader isPreloading={isPreLoading} />
                  )}
                  <About />
                </>
              }
            />
            {/*<ProtectedRoute isLoggedIn={isLoggedIn}>*/}
            {/*</ProtectedRoute>*/}
            <Route
              path="/saved-news"
              element={
                <>
                  <SavedArticles savedArticles={savedArticles} />
                  {savedArticles.length !== 0 && (
                    <SearchResults
                      searchResults={savedArticles}
                      isLoggedIn={isLoggedIn}
                    />
                  )}
                </>
              }
            />
          </Routes>
          <Footer />
          {isModalOpen === "login" && (
            <LoginModal
              onOpen={openModal}
              onClose={closeModal}
              isOpen={isModalOpen}
              isLoading={isLoading}
              setLoading={setLoading}
              // setCurrentUser={setCurrentUser}
              setLoggedIn={setLoggedIn}
            />
          )}
          {isModalOpen === "register" && (
            <RegisterModal
              onOpen={openModal}
              onClose={closeModal}
              isOpen={isModalOpen}
              isLoading={isLoading}
              setLoading={setLoading}
              // setCurrentUser={setCurrentUser}
              setLoggedIn={setLoggedIn}
            />
          )}
        </div>
      </div>
    </MobileContext.Provider>
  );
}
