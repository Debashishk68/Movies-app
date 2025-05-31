import React, { useEffect, useState, useRef, useCallback } from "react";
import { getPopularTV } from "../api/tmdb"; // your API to fetch popular TV shows
import { useNavigate } from "react-router-dom";

const TVSeries = () => {
  const [tvSeries, setTVSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const loadTVSeries = useCallback(async () => {
    const navigate = useNavigate();
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const data = await getPopularTV(page);
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setTVSeries((prev) => {
          const newTVSeries = data.filter(
            (show) => !prev.some((tv) => tv.id === show.id)
          );
          return [...prev, ...newTVSeries];
        });
      }
    } catch (error) {
      console.error("Error fetching TV series:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    loadTVSeries();
  }, [page, loadTVSeries]);

  const lastTVRef = useCallback(
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
      <h2 className="text-4xl font-bold mb-6 text-center">TV Series</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {tvSeries.map((show, index) => {
          if (tvSeries.length === index + 1) {
            return (
              <div
                onClick={() => { navigate(`/movie/${show.id}`) }}
                key={show.id}
                ref={lastTVRef}
                className="bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={
                    show.poster_path
                      ? `https://image.tmdb.org/t/p/w300${show.poster_path}`
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={show.name}
                  className="w-full h-72 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">{show.name}</h3>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={show.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={
                    show.poster_path
                      ? `https://image.tmdb.org/t/p/w300${show.poster_path}`
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={show.name}
                  className="w-full h-72 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">{show.name}</h3>
                </div>
              </div>
            );
          }
        })}
      </div>

      {loading && (
        <div className="text-center mt-6 text-green-400 animate-spin">
          Loading more TV series...
        </div>
      )}

      {!hasMore && (
        <p className="text-center mt-6 text-gray-400">No more TV series to show.</p>
      )}
    </div>
  );
};

export default TVSeries;
