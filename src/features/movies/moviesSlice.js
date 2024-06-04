import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "b9d35a47";
const BASE_URL = "http://www.omdbapi.com/";

// Predefined search terms for initial fetch
const searchTerms = ["batman", "superman", "spiderman", "ironman", "avengers"];

export const fetchInitialMovies = createAsyncThunk(
  "movies/fetchInitialMovies",
  async () => {
    const movieLists = await Promise.all(
      searchTerms.map((term) =>
        axios.get(`${BASE_URL}?s=${term}&apikey=${API_KEY}`)
      )
    );
    const movies = movieLists.flatMap((list) => list.data.Search);
    // Fetch detailed information for each movie
    const movieDetailsPromises = movies.map((movie) =>
      axios.get(`${BASE_URL}?i=${movie.imdbID}&apikey=${API_KEY}`)
    );
    const movieDetailsResponses = await Promise.all(movieDetailsPromises);
    const detailedMovies = movieDetailsResponses.map((res) => res.data);

    return detailedMovies;
  }
);

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (searchTerm) => {
    const response = await axios.get(
      `${BASE_URL}?s=${searchTerm}&apikey=${API_KEY}`
    );
    const movies = response.data.Search;

    // Fetch detailed information for each movie
    const movieDetailsPromises = movies.map((movie) =>
      axios.get(`${BASE_URL}?i=${movie.imdbID}&apikey=${API_KEY}`)
    );
    const movieDetailsResponses = await Promise.all(movieDetailsPromises);
    const detailedMovies = movieDetailsResponses.map((res) => res.data);

    return detailedMovies;
  }
);

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (id) => {
    const response = await axios.get(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
    return response.data;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    moviesList: [],
    filteredMovies: [],
    selectedMovie: {},
    loading: false,
    error: null,
  },
  reducers: {
    filterMovies: (state, action) => {
      state.filteredMovies = state.moviesList.filter((movie) =>
        movie.Title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInitialMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.moviesList = action.payload;
        state.filteredMovies = action.payload;
      })
      .addCase(fetchInitialMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredMovies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { filterMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
