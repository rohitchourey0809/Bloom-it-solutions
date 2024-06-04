import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchInitialMovies } from "../features/movies/moviesSlice";
import MovieCard from "./MovieCard";
import { Box, Spinner, Alert, AlertIcon, Flex } from "@chakra-ui/react";

const MovieList = () => {
  const dispatch = useDispatch();
  const { filteredMovies, loading, error } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(fetchInitialMovies());
  }, [dispatch]);

  if (loading) return <Spinner size="xl" />;
  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );

  return (
    <Flex wrap="wrap" justify="center" p={4}>
      {filteredMovies.map((movie) => (
        <Box
          key={movie.imdbID}
          m={2}
          w={{ base: "100%", sm: "45%", md: "30%", lg: "22%" }}
        >
          <MovieCard movie={movie} />
        </Box>
      ))}
    </Flex>
  );
};

export default MovieList;
