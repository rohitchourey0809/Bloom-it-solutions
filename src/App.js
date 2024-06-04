import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
import FavoriteMovies from "./components/FavoriteMovies";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<DetailsPage />} />
        <Route path="/favorites" element={<FavoriteMovies />} />
      </Routes>
    </Router>
  );
};

export default App;
