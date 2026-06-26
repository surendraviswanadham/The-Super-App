import React, { useState, useEffect } from "react";
import { fetchCurrentWeather } from "../services/apiServices";
import { Thermometer, Droplets, Compass, Wind, CloudRain, Sun, Cloud, CloudLightning, Snowflake, Search, CloudDrizzle } from "lucide-react";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("New Delhi");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCurrentWeather(cityName);
      setWeather(data);
    } catch (err) {
      setError("Failed to fetch weather details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather(city);
  }, [city]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setCity(search.trim());
      setSearch("");
    }
  };

  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear":
        return <Sun className="w-12 h-12 text-amber-400 stroke-[1.5]" />;
      case "Clouds":
        return <Cloud className="w-12 h-12 text-zinc-300 stroke-[1.5]" />;
      case "Rain":
        return <CloudRain className="w-12 h-12 text-blue-400 stroke-[1.5]" />;
      case "Drizzle":
        return <CloudDrizzle className="w-12 h-12 text-cyan-400 stroke-[1.5]" />;
      case "Lightning":
      case "Thunderstorm":
        return <CloudLightning className="w-12 h-12 text-yellow-400 stroke-[1.5]" />;
      case "Snow":
        return <Snowflake className="w-12 h-12 text-sky-200 stroke-[1.5]" />;
      default:
        return <Cloud className="w-12 h-12 text-zinc-300 stroke-[1.5]" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-super-card border border-super-border rounded-2xl overflow-hidden p-6 justify-between gap-4 shadow-xl">
      {/* Top Header & Search Bar */}
      <div className="flex justify-between items-center gap-4">
        <h3 className="font-outfit font-bold text-lg text-zinc-300 tracking-wide select-none">
          Live Weather
        </h3>
        
        <form onSubmit={handleSearchSubmit} className="relative flex items-center max-w-[150px] sm:max-w-[200px]">
          <input
            type="text"
            placeholder="Search city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 text-xs px-3 py-1.5 pr-8 rounded-lg focus:outline-none focus:border-super-neon text-white placeholder-zinc-600 transition-colors"
          />
          <button type="submit" className="absolute right-2 text-zinc-500 hover:text-white cursor-pointer">
            <Search className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex-1 flex justify-center items-center py-6">
          <div className="w-6 h-6 border-2 border-super-neon border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : weather ? (
        <div className="space-y-4 flex-1 flex flex-col justify-center">
          {/* Main Weather details */}
          <div className="flex justify-between items-center bg-zinc-950/40 p-4 rounded-xl border border-white/5">
            <div className="space-y-1">
              <p className="font-outfit font-extrabold text-3xl tracking-tight text-white">
                {weather.main.temp}°C
              </p>
              <p className="font-outfit font-semibold text-sm text-zinc-400 capitalize">
                {weather.name}
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              {getWeatherIcon(weather.weather[0].main)}
              <span className="text-xs text-zinc-400 font-semibold capitalize mt-1">
                {weather.weather[0].description}
              </span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-2">
            {/* Humidity */}
            <div className="bg-zinc-950/20 p-2.5 rounded-lg border border-white/5 flex flex-col items-center text-center space-y-1">
              <Droplets className="w-4 h-4 text-cyan-400" />
              <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Humidity</span>
              <span className="text-white text-xs font-bold">{weather.main.humidity}%</span>
            </div>

            {/* Pressure */}
            <div className="bg-zinc-950/20 p-2.5 rounded-lg border border-white/5 flex flex-col items-center text-center space-y-1">
              <Compass className="w-4 h-4 text-purple-400" />
              <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Pressure</span>
              <span className="text-white text-xs font-bold">{weather.main.pressure} hPa</span>
            </div>

            {/* Wind Speed */}
            <div className="bg-zinc-950/20 p-2.5 rounded-lg border border-white/5 flex flex-col items-center text-center space-y-1">
              <Wind className="w-4 h-4 text-emerald-400" />
              <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Wind</span>
              <span className="text-white text-xs font-bold">{weather.wind.speed} m/s</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center py-6">
          <p className="text-xs text-red-400">{error || "Failed to load weather"}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
