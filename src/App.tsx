import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/:lang/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/en/home" />} />
      </Routes>
    </Router>
  );
};

export default App;
