// src/App.js
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home/Home";
import Navbar from "./components/General/Navbar/Navbar";
import Trade from "./pages/Trade/Trade";
import ProductGroups from "./pages/ProductGroup/ProductGroup";
import Footer from "./components/General/Footer/Footer";
import Landinfo from "./pages/Landinfo/Landinfo";
import Grondstoffenscanner from "./pages/Grondstoffenscanner/Grondstoffenscanner";
import Antimoon from "./pages/Antimoon/Antimoon";
import Explore from "./pages/Explore/Explore";

// Component to handle redirecting to the default language if not provided
const DefaultLanguageRedirect = () => {
  const { lang } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // If no language is provided, redirect to /nl/home
    if (!lang) {
      navigate("/nl/home", { replace: true });
    }
  }, [lang, navigate]);

  return null; // This component does not render anything
};

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* Redirect to default language if none is provided */}
          <Route path="/" element={<DefaultLanguageRedirect />} />

          {/* Define your routes with the language parameter */}
          <Route path={`/:lang/home`} element={<Home />} />
          <Route path={`/:lang/trade`} element={<Trade />} />
          <Route path={`/:lang/landinfo`} element={<Landinfo />} />
          <Route path={`/:lang/explore`} element={<Explore />} />
          <Route
            path={`/:lang/grondstoffenscanner`}
            element={<Grondstoffenscanner />}
          />
          <Route
            path={`/:lang/explore-assess/product-group`}
            element={<ProductGroups />}
          />
          <Route path={`/:lang/antimoon`} element={<Antimoon />} />

          {/* Redirect to home page if no matching route is found */}
          <Route path="*" element={<Navigate to={`/nl/home`} />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
