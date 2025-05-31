import axios from "axios";

const API_KEY = "7efdc1739bb2b9ea950a5d6289d45d6e";
const BASE_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

// Fetch popular movies
export const getPopularMovies = async (page = 1) => {
  try {
    const res = await tmdb.get("/movie/popular", {
      params: { page },
    });

    return res.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

// Fetch top-rated movies
export const getTopRatedMovies = async () => {
  const res = await tmdb.get("/movie/top_rated");
  return res.data.results;
};

// Fetch upcoming movies
export const getUpcomingMovies = async () => {
  const res = await tmdb.get("/movie/upcoming");
  return res.data.results;
};

// Fetch popular TV series
export const getPopularTV = async (page = 1) => {
  const res = await tmdb.get('/tv/popular', {
    params: { page },
  });
  return res.data.results;
};

// Fetch top-rated TV series
export const getTopRatedTV = async () => {
  const res = await tmdb.get("/tv/top_rated");
  return res.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const res = await tmdb.get(`/movie/${movieId}`, {
    params: {
      append_to_response: "videos,credits",
    },
  });

  const movie = res.data;

  const trailer = movie.videos.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  const castList = movie.credits.cast.slice(0, 5).map((actor) => ({
    name: actor.name,
    image: actor.profile_path
      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
      : "https://via.placeholder.com/80x80?text=No+Image",
  }));

  return {
    title: movie.title,
    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    description: movie.overview,
    tags: movie.genres.map((g) => g.name),
    cast: castList,
    trailerUrl: trailer ? `https://www.youtube.com/embed/${trailer.key}` : null,
  };
};

export const getSimilarMovies = async (movieId) => {
  const res = await tmdb.get(`/movie/${movieId}/similar`);
  return res.data.results;
};
// Search for movies or TV shows
export const searchTMDB = async (query, language = "en-US") => {
  if (!query || query.trim() === "") {
    console.warn("Search query is empty");
    return [];
  }

  try {
    const res = await tmdb.get("/search/multi", {
      params: {
        query,
        language,
        include_adult: false,
      },
    });

    const filteredResults = res.data.results.filter(
      (item) =>
        item.media_type === "movie" ||
        item.media_type === "tv" ||
        item.media_type === "person"
    );

    return filteredResults;
  } catch (error) {
    console.error("Error searching TMDB:", error?.response || error.message);
    return [];
  }
};
