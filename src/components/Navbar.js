import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading, Spacer, Button } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box bg="teal.500" p={4} mb={8}>
      <Flex alignItems="center">
        <Heading size="md" color="white">
          Movie App
        </Heading>
        <Spacer />
        <Flex>
          <Link to="/">
            <Button colorScheme="whiteAlpha" mr={2}>
              Home
            </Button>
          </Link>
          <Link to="/favorites">
            <Button colorScheme="whiteAlpha" mr={2}>
              Favorites
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
