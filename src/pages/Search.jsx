import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { searchTMDB } from "../api/tmdb";

const Search = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      try {
        setLoading(true);
        const data = await searchTMDB(query);
        setResults(data);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const handleClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="px-6 md:px-16 py-10">
      <h1 className="text-2xl font-bold mb-6 text-white">
        Search Results for "<span className="text-green-400">{query}</span>"
      </h1>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-gray-400">No results found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {results.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.id)}
              className="group cursor-pointer bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition relative"
              title={item.overview} // show full overview on hover (tooltip)
            >
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={item.title || item.name}
                className="w-full h-72 object-cover"
              />

              {/* Rating overlay on hover */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-yellow-400 text-center py-1 opacity-0 group-hover:opacity-100 transition">
                ⭐ {item.vote_average?.toFixed(1) || "N/A"}
              </div>

              <div className="p-4 text-white">
                <h3 className="text-lg font-semibold truncate">
                  {item.title || item.name}
                </h3>
                <p className="text-gray-300 text-sm line-clamp-3">
                  {item.overview || "No description available."}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
