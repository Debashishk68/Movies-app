import { useEffect, useState } from "react";
import {
  getPopularTV,
  getTopRatedMovies,
  getTopRatedTV,
  getUpcomingMovies,
} from "../api/tmdb";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Section = ({ title }) => {
  const [movies, setMovies] = useState([]);

  const navigate= useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let data = [];
      if (title === "Upcoming Movies") {
        data = await getUpcomingMovies();
      } else if (title === "Top Rated Movies") {
        data = await getTopRatedMovies();
      } else if (title === "Popular TV Shows") {
        data = await getPopularTV();
      } else if (title === "Top Rated TV Shows") {
        data = await getTopRatedTV();
      }
      setMovies(data);
    };

    fetchData();
  }, [title]);

  return (
    <section className="text-white px-4 py-6">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-2xl md:text-3xl font-extrabold">{title}</h3>
        <button className="flex items-center gap-1 text-green-400 hover:text-green-300 hover:underline text-sm font-medium transition">
          View more <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies.slice(0, 12).map((movie, idx) => (
          <div
            onClick={() => {
              navigate(`/movie/${movie.id}`);
            }}
            key={idx}
            className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105 duration-300 bg-zinc-900"
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.title || movie.name}
              className="w-full h-60 object-cover rounded-xl"
            />

            {/* Optional overlay hover effect */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
              <p className="text-sm font-semibold text-gray-100 line-clamp-2">
                {movie.title || movie.name}
              </p>
              <p className="text-xs text-gray-400">
                ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section;
