import React, { useEffect } from "react";
import { X, Star, Clock, User, Film } from "lucide-react";

const MovieModal = ({ movieDetails, onClose }) => {
  // Prevent body scrolling when modal is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!movieDetails) return null;

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300"
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[90vh] md:max-h-none overflow-y-auto bg-super-card border border-super-border rounded-2xl flex flex-col md:flex-row shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-zinc-950/80 border border-white/10 hover:border-super-neon text-zinc-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Left Side: Large Poster */}
        <div className="w-full md:w-[40%] aspect-[2/3] md:aspect-auto md:min-h-[450px] relative bg-zinc-950">
          <img
            src={movieDetails.Poster}
            alt={movieDetails.Title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-super-card/50"></div>
        </div>

        {/* Right Side: Movie Details */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between gap-6 overflow-y-auto">
          {/* Header section */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-zinc-500 text-xs font-semibold">
              <span className="bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-zinc-300">
                {movieDetails.Year}
              </span>
              {movieDetails.Runtime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{movieDetails.Runtime}</span>
                </span>
              )}
            </div>

            <h3 className="font-outfit font-extrabold text-2xl md:text-3xl text-white leading-tight pr-8">
              {movieDetails.Title}
            </h3>

            {/* Ratings Badge */}
            {movieDetails.imdbRating && (
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-sm font-bold text-white">{movieDetails.imdbRating}</span>
                <span className="text-xs text-zinc-500 font-semibold">/ 10 on IMDb</span>
              </div>
            )}
          </div>

          {/* Genre chips */}
          {movieDetails.Genre && (
            <div className="flex flex-wrap gap-1.5">
              {movieDetails.Genre.split(",").map((g) => (
                <span
                  key={g.trim()}
                  className="px-2.5 py-1 rounded bg-super-green/10 border border-super-green/20 text-super-neon font-semibold text-[10px] uppercase tracking-wider"
                >
                  {g.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Plot */}
          <div className="space-y-2 border-t border-white/5 pt-4">
            <h4 className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Plot Summary</h4>
            <p className="text-zinc-300 text-sm leading-relaxed">
              {movieDetails.Plot || "Plot outline is currently unavailable."}
            </p>
          </div>

          {/* Cast */}
          {movieDetails.Actors && (
            <div className="space-y-2 border-t border-white/5 pt-4">
              <h4 className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-zinc-500" />
                <span>Cast Ensemble</span>
              </h4>
              <p className="text-zinc-400 text-xs leading-relaxed">
                {movieDetails.Actors}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
