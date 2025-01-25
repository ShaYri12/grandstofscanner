import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// Import pages
import Home from "./pages/Home/Home";
import Trade from "./pages/Trade/Trade";
import ProductGroups from "./pages/ProductGroup/ProductGroup";
import Landinfo from "./pages/Landinfo/Landinfo";
import Grondstoffenscanner from "./pages/Grondstoffenscanner/Grondstoffenscanner";
import Antimoon from "./pages/Antimoon/Antimoon";
import Explore from "./pages/Explore/Explore";

// Import components
import Navbar from "./components/General/Navbar/Navbar";
import Footer from "./components/General/Footer/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import FAQ from "./pages/FAQ/FAQ";
import ForgotPassword from "./pages/forgotPassword/ForgetPassword";
import Accessibility from "./pages/Accessibility/Accessibility";
import PrivacyStatement from "./pages/PrivacyStatement/PrivacyStatement";
import CookieBanner from "./components/General/CookieBanner/CookieBanner";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/:lang/home" element={<Home />} />
        <Route path="/:lang/trade" element={<Trade />} />
        <Route path="/:lang/landinfo" element={<Landinfo />} />
        <Route path="/:lang/explore" element={<Explore />} />
        <Route
          path="/:lang/grondstoffenscanner"
          element={<Grondstoffenscanner />}
        />
        <Route
          path="/:lang/explore-assess/product-group"
          element={<ProductGroups />}
        />
        <Route path="/:lang/antimoon" element={<Antimoon />} />
        <Route path="/:lang/faq" element={<FAQ />} />
        <Route path="/:lang/login" element={<Login />} />
        <Route path="/:lang/register" element={<Register />} />
        <Route path="/:lang/forgot-password" element={<ForgotPassword />} />
        <Route path="/:lang/accessibility" element={<Accessibility />} />
        <Route path="/:lang/privacy" element={<PrivacyStatement />} />
        <Route path="*" element={<Navigate to="/en/home" />} />
      </Routes>
      <Footer />
      {/* Cookie Consent Bar */}
      <CookieBanner />
    </Router>
  );
};

export default App;
