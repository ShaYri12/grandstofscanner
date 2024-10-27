// src/App.js
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Trade from "./pages/Trade/Trade";
import i18next from "i18next";
import ProductGroups from "./pages/ProductGroup/ProductGroup";
import Footer from "./components/Footer/Footer";

const App = () => {
  const currentLang = i18next.language; // Get the current language

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path={`/${currentLang}/home`} element={<Home />} />
          <Route path={`/${currentLang}/trade`} element={<Trade />} />
          <Route
            path={`/${currentLang}/explore-assess/product-group`}
            element={<ProductGroups />}
          />
          <Route path="*" element={<Navigate to={`/${currentLang}/home`} />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
