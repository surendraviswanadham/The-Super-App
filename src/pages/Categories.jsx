import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import CategoryCard from "../components/CategoryCard";
import { AlertTriangle, ChevronRight, X } from "lucide-react";

const CATEGORIES_LIST = [
  "Action",
  "Comedy",
  "Drama",
  "Music",
  "Sports",
  "Thriller",
  "Fantasy",
  "Romance",
];

const Categories = () => {
  const storeCategories = useStore((state) => state.categories);
  const setCategories = useStore((state) => state.setCategories);
  const navigate = useNavigate();

  const [selected, setSelected] = useState(storeCategories);

  const handleToggle = (category) => {
    if (selected.includes(category)) {
      setSelected(selected.filter((item) => item !== category));
    } else {
      setSelected([...selected, category]);
    }
  };

  const handleRemove = (category) => {
    setSelected(selected.filter((item) => item !== category));
  };

  const handleContinue = () => {
    if (selected.length >= 3) {
      setCategories(selected);
      navigate("/dashboard");
    }
  };

  const isValid = selected.length >= 3;

  return (
    <div className="min-h-screen bg-black font-inter text-white flex flex-col md:flex-row px-6 py-12 md:px-16 lg:px-24 gap-12 lg:gap-20">
      {/* Left panel: Info & Selections */}
      <div className="w-full md:w-[35%] flex flex-col justify-between py-2 gap-8">
        <div className="space-y-6">
          <h2 className="font-outfit font-extrabold text-5xl text-super-neon tracking-wide">
            Super App
          </h2>
          <h1 className="font-outfit font-bold text-4xl lg:text-5xl leading-tight text-white">
            Choose your categories of entertainment
          </h1>
          
          <p className="text-zinc-400 text-base leading-relaxed">
            Select at least 3 categories to curate your customized dashboard. Click cards to toggle, and review your selections in real-time.
          </p>
        </div>

        {/* Selected chips list */}
        <div className="flex-1 flex flex-wrap gap-2 content-start py-4 overflow-y-auto max-h-[30vh] md:max-h-[40vh]">
          {selected.map((category) => (
            <div
              key={category}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-super-green/20 border border-super-green text-super-neon font-semibold text-sm hover:bg-super-green/30 transition-colors"
            >
              <span>{category}</span>
              <button
                onClick={() => handleRemove(category)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 stroke-[2.5px]" />
              </button>
            </div>
          ))}
          {selected.length === 0 && (
            <p className="text-zinc-600 font-medium italic">No categories selected yet.</p>
          )}
        </div>

        {/* Validation indicator and Button */}
        <div className="space-y-4">
          {!isValid && (
            <div className="flex items-center gap-2 text-amber-500 font-medium bg-amber-500/10 border border-amber-500/20 px-4 py-3 rounded-lg">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span className="text-sm">Minimum 3 categories required ({selected.length}/3 selected)</span>
            </div>
          )}
          
          <button
            onClick={handleContinue}
            disabled={!isValid}
            className={`w-full py-3.5 rounded-full flex items-center justify-center gap-2 font-bold text-lg tracking-wider transition-all duration-300 ${
              isValid
                ? "bg-super-green hover:bg-super-neon text-white hover:text-black cursor-pointer shadow-lg shadow-super-neon/10 hover:shadow-xl hover:shadow-super-neon/20 pulse-glow"
                : "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700"
            }`}
          >
            <span>Continue</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Right panel: Grid of Categories */}
      <div className="flex-1 flex items-center">
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {CATEGORIES_LIST.map((category) => (
            <CategoryCard
              key={category}
              category={category}
              isSelected={selected.includes(category)}
              onToggle={() => handleToggle(category)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
