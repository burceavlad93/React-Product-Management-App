import "./App.css";
import MainPage from "./main-page/MainPage";
import SecondPage from "./second-page/SecondPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/addproduct" element={<SecondPage />} />
      </Routes>
    </Router>
  );
}

export default App;
