import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { searchMovieByGenre, fetchMovieDetails, searchMoviesByTitle } from "../services/apiServices";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import { ArrowLeft, Film, HelpCircle, Search } from "lucide-react";

const Movies = () => {
  const categories = useStore((state) => state.categories);
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Modal details state
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(
          categories.map(async (genre) => {
            const list = await searchMovieByGenre(genre);
            return { genre, list };
          })
        );
        const dataMap = results.reduce((acc, current) => {
          acc[current.genre] = current.list;
          return acc;
        }, {});
        setMovieData(dataMap);
      } catch (e) {
        console.error("Failed to load entertainment recommendations:", e);
      } finally {
        setLoading(false);
      }
    };

    if (categories.length > 0) {
      fetchMovies();
    } else {
      setLoading(false);
    }
  }, [categories]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 2) {
        setIsSearching(true);
        const results = await searchMoviesByTitle(searchQuery.trim());
        setSearchResults(results);
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleCardClick = async (imdbID) => {
    setSelectedMovieId(imdbID);
    setDetailsLoading(true);
    try {
      const details = await fetchMovieDetails(imdbID);
      setMovieDetails(details);
    } catch (e) {
      console.error(e);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedMovieId(null);
    setMovieDetails(null);
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-black font-inter text-white px-4 py-8 md:px-8 lg:px-16 space-y-8">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-4 gap-4 select-none">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBackToDashboard}
            className="p-2 rounded-full bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="space-y-1">
            <h2 className="font-outfit font-extrabold text-2xl md:text-3xl text-super-neon tracking-wide">
              Super App
            </h2>
            <p className="text-zinc-500 text-xs font-semibold">Entertainment recommendations curated for you</p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-zinc-500" />
            </div>
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-zinc-800 rounded-lg bg-zinc-950 text-sm placeholder-zinc-500 focus:outline-none focus:border-super-neon focus:ring-1 focus:ring-super-neon sm:text-sm text-white transition-colors"
            />
          </div>

          <div className="hidden sm:flex items-center gap-2 text-zinc-500 text-xs font-bold bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800 shrink-0">
            <Film className="w-3.5 h-3.5" />
            <span>{categories.length} Categories Active</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-super-neon border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-zinc-500 font-semibold tracking-wide">Curating movie recommendations...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Dynamic Search Results Section */}
          {searchQuery.trim().length > 2 && (
            <div className="space-y-4 bg-zinc-900/40 p-6 rounded-2xl border border-super-neon/20">
              <div className="flex items-center gap-2 select-none">
                <Search className="w-5 h-5 text-super-neon" />
                <h3 className="font-outfit font-extrabold text-xl md:text-2xl text-white tracking-wide">
                  Search Results
                </h3>
                {isSearching && <span className="w-4 h-4 border-2 border-super-neon border-t-transparent rounded-full animate-spin ml-2"></span>}
                {!isSearching && (
                  <span className="text-xs text-zinc-500 font-semibold ml-2">
                    ({searchResults.length} matches)
                  </span>
                )}
              </div>

              <div className="flex gap-4 overflow-x-auto pb-4 pr-4 scrollbar-thin scrollbar-thumb-zinc-800">
                {searchResults.map((movie) => (
                  <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    onClick={() => handleCardClick(movie.imdbID)}
                  />
                ))}
                {!isSearching && searchResults.length === 0 && (
                  <div className="flex items-center gap-2 text-zinc-600 italic py-6 pl-4">
                    <HelpCircle className="w-5 h-5 text-zinc-700" />
                    <span>No movies found for "{searchQuery}".</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {categories.map((genre) => {
            const list = movieData[genre] || [];
            return (
              <div key={genre} className="space-y-4">
                {/* Genre Header */}
                <div className="flex items-center gap-2 select-none">
                  <span className="w-2.5 h-6 bg-super-green rounded-full"></span>
                  <h3 className="font-outfit font-extrabold text-xl md:text-2xl text-white tracking-wide">
                    {genre}
                  </h3>
                  <span className="text-xs text-zinc-500 font-semibold ml-2">
                    ({list.length} matches)
                  </span>
                </div>

                {/* Horizontal scroll container */}
                <div className="flex gap-4 overflow-x-auto pb-4 pr-4 scrollbar-thin scrollbar-thumb-zinc-800">
                  {list.map((movie) => (
                    <MovieCard
                      key={movie.imdbID}
                      movie={movie}
                      onClick={() => handleCardClick(movie.imdbID)}
                    />
                  ))}
                  {list.length === 0 && (
                    <div className="flex items-center gap-2 text-zinc-600 italic py-6 pl-4">
                      <HelpCircle className="w-5 h-5 text-zinc-700" />
                      <span>No matching movies found for this category.</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Movie Details Modal Overlay */}
      {selectedMovieId && (
        detailsLoading ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs">
            <div className="w-6 h-6 border-2 border-super-neon border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <MovieModal movieDetails={movieDetails} onClose={handleCloseModal} />
        )
      )}
    </div>
  );
};

export default Movies;
