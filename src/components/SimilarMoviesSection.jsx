import React from 'react';
import { useNavigate } from 'react-router-dom';

const SimilarMoviesSection = ({ movies }) => {
  const navigate = useNavigate();
  return (
    <section className="px-4 md:px-20 py-10">
      <h2 className="text-xl font-semibold mb-4">Similar</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {movies.map((movie) => (
          <div
           onClick={() => navigate(`/movie/${movie.id}`)}
           key={movie.id} className="min-w-[180px] flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg mb-2 w-[180px] h-[270px] object-cover"
            />
            <p className="text-sm text-center">{movie.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimilarMoviesSection;
