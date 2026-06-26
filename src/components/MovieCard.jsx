import React from "react";

const MovieCard = ({ movie, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative flex-none w-[170px] sm:w-[200px] aspect-[2/3] rounded-xl overflow-hidden bg-zinc-900 border border-white/5 hover:border-super-neon hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-super-neon/15 cursor-pointer group active:scale-98 select-none"
    >
      {/* Movie Poster */}
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-full object-cover group-hover:brightness-105 transition-all duration-300"
        loading="lazy"
      />

      {/* Dark overlay showing title on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h4 className="font-outfit font-bold text-sm text-white leading-snug drop-shadow-md">
          {movie.Title}
        </h4>
        <p className="text-[10px] font-bold text-super-neon mt-1 drop-shadow">
          {movie.Year}
        </p>
      </div>

      {/* Static minimalist details for mobile/no-hover */}
      <div className="absolute bottom-2 left-2 right-2 md:hidden bg-black/60 backdrop-blur-xs px-2 py-1 rounded text-center">
        <h4 className="font-outfit font-bold text-[10px] text-white truncate">
          {movie.Title}
        </h4>
      </div>
    </div>
  );
};

export default MovieCard;
