import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";

const FavoriteMovies = () => {
  const favorites = useSelector((state) => state.favorites.favorites);

  return (
    <Box p={4}>
      <Center>
        <Heading as="h2" size="lg" mb={4}>
          Favorite Movies
        </Heading>
      </Center>
      {favorites.length === 0 ? (
        <Text>No favorite movies yet.</Text>
      ) : (
        <Flex wrap="wrap" justify="center" p={4}>
          {favorites.map((movie) => (
            <Box
              key={movie.imdbID}
              m={2}
              w={{ base: "100%", sm: "45%", md: "30%", lg: "22%" }}
            >
              <MovieCard key={movie.imdbID} movie={movie} />
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default FavoriteMovies;
