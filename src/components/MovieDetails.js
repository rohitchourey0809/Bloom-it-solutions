import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails } from "../features/movies/moviesSlice";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Image,
  Spinner,
  Alert,
  AlertIcon,
  Center,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedMovie, loading, error } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  if (loading) return <Spinner size="xl" />;
  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );

  return (
    <Center minHeight="50vh">
      <Box
        as={motion.div}
        p={5}
        bg="gray.800"
        borderRadius="md"
        boxShadow="lg"
        maxWidth="600px"
        w="full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05, borderRadius: "lg" }}
      >
        <Box
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            w={600}
            h={400}
            objectFit={"auto"}
            src={selectedMovie.Poster}
            alt={selectedMovie.Title}
            borderRadius="md"
            boxShadow="md"
            whileHover={{ borderRadius: "lg" }}
          />
        </Box>
        <Heading
          as={motion.h1}
          size="xl"
          mb={4}
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          color="teal.300"
        >
          {selectedMovie.Title}
        </Heading>
        <Text
          as={motion.p}
          fontSize="lg"
          mb={2}
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          color="gray.400"
        >
          <strong>Year:</strong> {selectedMovie.Year}
        </Text>
        <Text
          as={motion.p}
          fontSize="lg"
          mb={2}
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
          color="gray.400"
        >
          <strong>Genre:</strong> {selectedMovie.Genre}
        </Text>
        <Text
          as={motion.p}
          fontSize="lg"
          mb={2}
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          color="gray.400"
        >
          <strong>Director:</strong> {selectedMovie.Director}
        </Text>
        <Text
          as={motion.p}
          fontSize="lg"
          mb={4}
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
          color="gray.400"
        >
          <strong>Plot:</strong> {selectedMovie.Plot}
        </Text>
      </Box>
    </Center>
  );
};

export default MovieDetails;
