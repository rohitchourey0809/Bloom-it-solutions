import React from "react";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  return (
    <div>
      <SearchBar />
      <MovieList />
    </div>
  );
};

export default HomePage;
