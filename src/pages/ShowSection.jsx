import React, { useEffect, useState } from 'react';
import Header from '../components/NavBar';
import MovieDetailSection from '../components/MovieDetailSection';
import InternationalTrailerSection from '../components/InternationalTrailerSection';
import SimilarMoviesSection from '../components/SimilarMoviesSection';
import Footer from '../components/Footer';
import { fetchMovieDetails, getSimilarMovies } from '../api/tmdb'; // Update path if necessary
import { useParams } from 'react-router-dom';

const ShowSection = () => {
  const { id: MOVIE_ID } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const movie = await fetchMovieDetails(MOVIE_ID);
        setMovieData(movie);
        console.log('Movie Data:', movie);

        const similar = await getSimilarMovies(MOVIE_ID);
        setSimilarMovies(similar);
        console.log('Similar Movies:', similar);
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setError('Failed to load movie details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [MOVIE_ID]);

  if (loading) {
    // Full screen loading overlay
    return (
      <div className="flex items-center justify-center min-h-screen bg-tmovies-dark-bg text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-tmovies-dark-bg text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tmovies-dark-bg text-tmovies-text-light flex flex-col">
      {/* <Header /> */}
      <main className="relative flex-grow">
        {/* Backdrop image */}
        {movieData?.backdrop && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${movieData.backdrop})` }}
            />
            <div className="absolute inset-0 bg-black opacity-60" />
          </>
        )}

        {/* Foreground content */}
        <div className="relative z-10">
          {movieData && <MovieDetailSection movie={movieData} />}
          {movieData?.trailerUrl && <InternationalTrailerSection trailerUrl={movieData.trailerUrl} />}
          {similarMovies.length > 0 && <SimilarMoviesSection movies={similarMovies} />}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default ShowSection;
