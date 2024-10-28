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
import ProductGroups from "./pages/ProductGroup/ProductGroup";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path={`/:lang/home`} element={<Home />} />
          <Route path={`/:lang/trade`} element={<Trade />} />
          <Route
            path={`/:lang/explore-assess/product-group`}
            element={<ProductGroups />}
          />
          <Route path="*" element={<Navigate to={`/:lang/home`} />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
