import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Section from "../components/Section";
import { getUpcomingMovies } from "../api/tmdb";

const SkeletonBanner = () => (
  <div className="relative rounded-lg shadow-lg overflow-hidden bg-gray-800 animate-pulse min-h-[350px] max-w-7xl mx-auto p-8 flex flex-col md:flex-row items-center md:items-end gap-8">
    <div className="bg-gray-700 rounded-lg w-48 md:w-64 h-[300px]"></div>
    <div className="flex-1 space-y-4 py-2">
      <div className="h-12 bg-gray-700 rounded w-3/4"></div>
      <div className="h-5 bg-gray-700 rounded w-full max-w-xl"></div>
      <div className="h-5 bg-gray-700 rounded w-full max-w-xl"></div>
      <div className="h-5 bg-gray-700 rounded w-5/6"></div>
      <div className="flex space-x-4 mt-6">
        <div className="h-10 w-24 bg-gray-700 rounded-full"></div>
        <div className="h-10 w-24 bg-gray-700 rounded-full"></div>
      </div>
    </div>
  </div>
);

const Home = () => {
  const [featured, setFeatured] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const upcoming = await getUpcomingMovies();
        setFeatured(upcoming[0]);
      } catch (error) {
        console.error("Failed to fetch featured movie", error);
      }
    };
    fetchFeatured();
  }, []);

  if (!featured) {
    return (
      <div className="space-y-16 px-6 md:px-16 py-10">
        <SkeletonBanner />
      </div>
    );
  }

  return (
    <div className="space-y-16 px-6 md:px-16 py-10">
      <header
        className="relative rounded-lg shadow-lg overflow-hidden bg-black"
        style={{
          backgroundImage: featured.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${featured.backdrop_path})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "350px",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        <div className="relative flex flex-col md:flex-row items-center md:items-end gap-8 p-8 md:p-12 max-w-7xl mx-auto text-white">
          <img
            src={
              featured.poster_path
                ? `https://image.tmdb.org/t/p/w300${featured.poster_path}`
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={featured.title || featured.name}
            className="rounded-lg shadow-lg w-48 md:w-64 flex-shrink-0"
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 leading-tight">
              {featured.title || featured.name}
            </h1>
            <p className="mt-4 text-gray-300 text-sm md:text-base max-h-36 overflow-hidden">
              {featured.overview.length > 350
                ? featured.overview.slice(0, 350) + "..."
                : featured.overview}
            </p>
            <div className="mt-6 space-x-4">
              <button
                className="bg-red-600 px-6 py-2 rounded-full hover:bg-red-700 shadow transition font-semibold"
                onClick={() => navigate(`/movie/${featured.id}`)}
              >
                Watch Now
              </button>
              <button
                className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition font-semibold"
                onClick={() => navigate(`/movie/${featured.id}#trailer`)}
              >
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sections */}
      <Section title="Upcoming Movies" />
      <Section title="Top Rated Movies" />
      <Section title="Popular TV Shows" />
      <Section title="Top Rated TV Shows" />
    </div>
  );
};

export default Home;
