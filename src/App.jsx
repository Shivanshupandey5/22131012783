import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import URLShortener from "./pages/URLShortener";
import URLStats from "./pages/URLStats";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<URLShortener />} />
        <Route path="/stats" element={<URLStats />} />
      </Routes>
    </Router>
  );
};

export default App;
