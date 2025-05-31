import React, { useEffect, useState, useRef, useCallback } from "react";
import { getPopularMovies } from "../api/tmdb"; // your API to fetch movies
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const navigate = useNavigate();

  // Load movies for current page
  const loadMovies = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const data = await getPopularMovies(page);
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prev) => {
          // Filter out duplicates by movie.id
          const newMovies = data.filter(
            (movie) => !prev.some((m) => m.id === movie.id)
          );
          return [...prev, ...newMovies];
        });
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  // Load movies on page change
  useEffect(() => {
    loadMovies();
  }, [page, loadMovies]);

  // Intersection Observer to trigger loading more movies
  const lastMovieRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="p-10 bg-tmovies-dark-bg min-h-screen text-white">
      <h2 className="text-4xl font-bold mb-6 text-center">Movies Page</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {movies.map((movie, index) => {
          if (movies.length === index + 1) {
            // attach observer to the last movie element
            return (
              <div
              
                key={movie.id}
                ref={lastMovieRef}
                className="bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
                </div>
              </div>
            );
          } else {
            return (
              <div
               onClick={()=>{navigate(`/movie/${movie.id}`)}}
                key={movie.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
                </div>
              </div>
            );
          }
        })}
      </div>

      {loading && (
        <div className="text-center mt-6 text-green-400 animate-spin">
          Loading more movies...
        </div>
      )}

      {!hasMore && (
        <p className="text-center mt-6 text-gray-400">No more movies to show.</p>
      )}
    </div>
  );
};

export default Movies;
