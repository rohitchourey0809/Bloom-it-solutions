import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addFavorite,
  removeFavorite,
} from "../features/movies/favoritesSlice.js";
import { Box, Button, Heading, Image } from "@chakra-ui/react";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie.imdbID));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <Box p={4} borderWidth="2px" borderRadius="lg" boxShadow="md" m={1}>
      <Image w={80} h={80} src={movie.Poster} alt={movie.Title} />
      <Heading size={20}>{movie.Title}</Heading>
      <p>{movie.Year}</p>
      <Button
        onClick={handleFavorite}
        colorScheme={isFavorite ? "red" : "teal"}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </Button>
      <Link to={`/movie/${movie.imdbID}`}>
        <Button colorScheme="teal">View Details</Button>
      </Link>
    </Box>
  );
};

export default MovieCard;
