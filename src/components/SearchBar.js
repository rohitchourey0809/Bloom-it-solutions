import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Input, Button, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { fetchMovies, filterMovies } from "../features/movies/moviesSlice";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      dispatch(fetchMovies(searchTerm));
    } else {
      dispatch(filterMovies(searchTerm));
    }
  };

  return (
    <Flex
      as={motion.div}
      align="center"
      justify="center"
      mt={5}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={5}
        bg="teal.500"
        borderRadius="md"
        boxShadow="md"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Input
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          mb={3}
          size="lg"
          variant="filled"
          focusBorderColor="teal.300"
          _placeholder={{ color: "gray.400" }}
        />
        <Button
          onClick={handleSearch}
          size="lg"
          colorScheme="teal"
          variant="solid"
          as={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Search
        </Button>
      </Box>
    </Flex>
  );
};

export default SearchBar;
