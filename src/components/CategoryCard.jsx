import React from "react";
import * as Icons from "lucide-react";

// Config mapping for each genre's appearance
const GENRE_STYLES = {
  Action: {
    gradient: "from-orange-600 to-red-600 shadow-red-500/10",
    iconName: "Flame",
    colorTheme: "border-red-500",
  },
  Comedy: {
    gradient: "from-amber-400 to-orange-500 shadow-amber-500/10",
    iconName: "Laugh",
    colorTheme: "border-amber-400",
  },
  Drama: {
    gradient: "from-purple-600 to-indigo-600 shadow-purple-500/10",
    iconName: "Clapperboard",
    colorTheme: "border-purple-500",
  },
  Music: {
    gradient: "from-cyan-500 to-blue-600 shadow-cyan-500/10",
    iconName: "Music",
    colorTheme: "border-cyan-400",
  },
  Sports: {
    gradient: "from-emerald-500 to-teal-600 shadow-emerald-500/10",
    iconName: "Trophy",
    colorTheme: "border-emerald-400",
  },
  Thriller: {
    gradient: "from-zinc-800 to-red-950 shadow-red-950/20",
    iconName: "Skull",
    colorTheme: "border-red-900",
  },
  Fantasy: {
    gradient: "from-fuchsia-600 to-pink-600 shadow-fuchsia-500/10",
    iconName: "Sparkles",
    colorTheme: "border-fuchsia-400",
  },
  Romance: {
    gradient: "from-rose-500 to-pink-600 shadow-rose-500/10",
    iconName: "Heart",
    colorTheme: "border-rose-400",
  },
};

const CategoryCard = ({ category, isSelected, onToggle }) => {
  const style = GENRE_STYLES[category] || {
    gradient: "from-zinc-700 to-zinc-900 shadow-zinc-500/10",
    iconName: "Film",
    colorTheme: "border-zinc-500",
  };

  const IconComponent = Icons[style.iconName] || Icons.Film;

  return (
    <div
      onClick={onToggle}
      className={`relative flex flex-col justify-between p-5 rounded-xl aspect-[1.1] bg-gradient-to-br ${
        style.gradient
      } border-4 ${
        isSelected ? "border-white scale-102 ring-4 ring-white/10" : "border-transparent"
      } hover:scale-104 cursor-pointer select-none transition-all duration-300 shadow-lg active:scale-98`}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-outfit font-bold text-2xl tracking-wide text-white drop-shadow-sm">
          {category}
        </h3>
        {isSelected && (
          <div className="bg-white/20 backdrop-blur-md p-1 rounded-full border border-white/40">
            <Icons.Check className="w-4 h-4 text-white stroke-[3px]" />
          </div>
        )}
      </div>

      <div className="flex justify-end mt-4">
        <IconComponent className="w-16 h-16 text-white/90 stroke-[1.5px] drop-shadow" />
      </div>
    </div>
  );
};

export default CategoryCard;
