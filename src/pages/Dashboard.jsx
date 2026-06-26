import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import WeatherWidget from "../components/WeatherWidget";
import NewsWidget from "../components/NewsWidget";
import NotesWidget from "../components/NotesWidget";
import TimerWidget from "../components/TimerWidget";
import { LogOut, Film, Calendar, User } from "lucide-react";

const Dashboard = () => {
  const user = useStore((state) => state.user);
  const categories = useStore((state) => state.categories);
  const resetStore = useStore((state) => state.resetStore);
  const navigate = useNavigate();

  const handleLogout = () => {
    resetStore();
    navigate("/");
  };

  const handleBrowseMovies = () => {
    navigate("/movies");
  };

  // Get initials for profile avatar
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // Format today's date nicely for the dashboard header
  const getTodayDateString = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-black font-inter text-white px-4 py-8 md:px-8 lg:px-16 space-y-6">
      {/* Top Action Bar / Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 gap-4 select-none">
        <div className="space-y-1">
          <h2 className="font-outfit font-extrabold text-3xl tracking-wide text-super-neon">
            Super App
          </h2>
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            <span>{getTodayDateString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleBrowseMovies}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-super-green hover:bg-super-neon text-white hover:text-black font-bold text-sm tracking-wide cursor-pointer transition-all duration-300 shadow-md hover:shadow-super-neon/10"
          >
            <Film className="w-4 h-4" />
            <span>Browse Entertainment</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white font-semibold text-sm cursor-pointer transition-colors shadow-md"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Widgets Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
        {/* Left Column (Profile & Weather) */}
        <div className="md:col-span-1 space-y-6 flex flex-col justify-between">
          {/* User Profile Widget */}
          <div className="bg-super-card border border-super-border rounded-2xl p-6 shadow-xl space-y-6 flex-1 flex flex-col justify-between">
            <div className="flex items-center gap-5">
              {/* Initials Avatar with custom glow */}
              <div className="w-20 h-20 shrink-0 rounded-2xl bg-gradient-to-tr from-super-green to-super-neon flex items-center justify-center font-outfit font-extrabold text-3xl text-black shadow-lg shadow-super-neon/20 select-none">
                {getInitials(user.name)}
              </div>
              
              {/* Basic Profile Details */}
              <div className="space-y-1 overflow-hidden">
                <h3 className="font-outfit font-bold text-xl text-white truncate">{user.name}</h3>
                <p className="text-zinc-400 text-xs truncate">@{user.username}</p>
                <p className="text-zinc-500 text-xs truncate">{user.email}</p>
                <p className="text-zinc-500 text-xs truncate">{user.mobile}</p>
              </div>
            </div>

            {/* Selected Categories badging */}
            <div className="space-y-2 border-t border-white/5 pt-4">
              <h4 className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider select-none">
                Subscribed Genres
              </h4>
              <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto pr-1">
                {categories.map((genre) => (
                  <span
                    key={genre}
                    className="px-2.5 py-1 rounded-md bg-zinc-950/80 border border-zinc-800 text-zinc-300 font-semibold text-[11px]"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Weather Widget */}
          <div className="flex-1">
            <WeatherWidget />
          </div>
        </div>

        {/* Middle Column (Notes) */}
        <div className="md:col-span-1 h-[450px] md:h-auto">
          <NotesWidget />
        </div>

        {/* Right Column (News) - Spans full height matching adjacent cells */}
        <div className="md:col-span-1 h-[500px] md:h-auto md:row-span-2">
          <NewsWidget />
        </div>

        {/* Bottom Span: Countdown Timer (Adjacent to news, under Profile/Weather/Notes) */}
        <div className="md:col-span-2">
          <TimerWidget />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
