import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
  useLocation,
} from "react-router-dom";
import "./index.css";
import i18next from "i18next";

// Import pages
import Home from "./pages/Home/Home";
import Trade from "./pages/Trade/Trade";
import ProductGroup from "./pages/ProductGroup/ProductGroup";
import Landinfo from "./pages/Landinfo/Landinfo";
import Grondstoffenscanner from "./pages/Grondstoffenscanner/Grondstoffenscanner";
import Antimoon from "./pages/Antimoon/Antimoon";
import Explore from "./pages/Explore/Explore";
import Browse from "./pages/Browse/Browse";
import Contact from "./pages/Contact/Contact";
import SearchResults from "./pages/SearchResults/SearchResults";
import Detail from "./pages/Detail/Detail";

// Import components
import Navbar from "./components/General/Navbar/Navbar";
import Footer from "./components/General/Footer/Footer";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ForgetPassword from "./pages/forgotPassword/ForgetPassword";
import Accessibility from "./pages/Accessibility/Accessibility";
import PrivacyStatement from "./pages/PrivacyStatement/PrivacyStatement";
import NewFAQPage from "./pages/FAQ/FAQ";

// Language manager component to handle language changes
const LanguageManager: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { lang } = useParams<{ lang?: string }>();
  const location = useLocation();

  useEffect(() => {
    // If URL has a language parameter, set the language
    if (lang && lang !== i18next.language) {
      // Check if the language is one of the supported languages
      if (["en", "nl"].includes(lang)) {
        localStorage.setItem("i18nextLng", lang);
        i18next.changeLanguage(lang);
      }
    }
    // If no language in URL but we have one in localStorage, update URL
    else if (!lang && localStorage.getItem("i18nextLng")) {
      const storedLang = localStorage.getItem("i18nextLng");
      if (storedLang) {
        const pathParts = location.pathname.split("/");
        pathParts[1] = storedLang;
        // This would cause an infinite loop, so don't do it
        // navigate(pathParts.join('/'));
      }
    }
  }, [lang, location.pathname]);

  return <>{children}</>;
};

// Main app routes with language manager
const AppRoutes: React.FC = () => {
  return (
    <LanguageManager>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={`/${localStorage.getItem("i18nextLng") || "nl"}/home`}
            />
          }
        />
        <Route path="/:lang/home" element={<Home />} />
        <Route path="/:lang/register" element={<Register />} />
        <Route path="/:lang/login" element={<Login />} />
        <Route path="/:lang/forgot-password" element={<ForgetPassword />} />
        <Route path="/:lang/accessibility" element={<Accessibility />} />
        <Route path="/:lang/privacy" element={<PrivacyStatement />} />
        <Route path="/:lang/contact" element={<Contact />} />
        <Route path="/:lang/faq" element={<NewFAQPage />} />
        <Route path="/:lang/explore" element={<Explore />} />
        <Route path="/:lang/browse" element={<Browse />} />
        <Route path="/:lang/detail/:id" element={<Detail />} />
        <Route path="/:lang/product-group" element={<ProductGroup />} />
        <Route path="/:lang/trade" element={<Trade />} />
        <Route path="/:lang/landinfo" element={<Landinfo />} />
        <Route path="/:lang/antimoon" element={<Antimoon />} />
        <Route path="/:lang/search-results" element={<SearchResults />} />
        <Route
          path="/:lang/grondstoffenscanner"
          element={<Grondstoffenscanner />}
        />
        <Route
          path="*"
          element={
            <Navigate
              to={`/${localStorage.getItem("i18nextLng") || "en"}/home`}
            />
          }
        />
      </Routes>
    </LanguageManager>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <AppRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
