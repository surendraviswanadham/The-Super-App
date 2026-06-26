import React, { useState, useEffect } from "react";
import { fetchTopHeadlines } from "../services/apiServices";

const NewsWidget = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      try {
        const newsData = await fetchTopHeadlines();
        setArticles(newsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getNews();
  }, []);

  useEffect(() => {
    if (articles.length === 0) return;

    const interval = setInterval(() => {
      // Trigger fade out
      setFade(false);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
        // Trigger fade in
        setFade(true);
      }, 300); // Wait for fade out animation to finish

    }, 2000); // 2 seconds auto-rotation

    return () => clearInterval(interval);
  }, [articles]);

  if (loading) {
    return (
      <div className="h-full min-h-[400px] bg-super-card border border-super-border rounded-2xl flex items-center justify-center shadow-xl">
        <div className="w-8 h-8 border-2 border-super-neon border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const activeArticle = articles[currentIndex];

  if (!activeArticle) {
    return (
      <div className="h-full min-h-[400px] bg-super-card border border-super-border rounded-2xl flex items-center justify-center p-6 text-zinc-500 shadow-xl">
        <p className="text-sm">No articles available.</p>
      </div>
    );
  }

  // Format date nicely
  const formattedDate = activeArticle.publishedAt
    ? new Date(activeArticle.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="relative flex flex-col h-full bg-super-card border border-super-border rounded-2xl overflow-hidden shadow-xl group">
      {/* Top Banner Image with source tag */}
      <div className="relative h-[48%] min-h-[220px] overflow-hidden select-none bg-zinc-950">
        <img
          src={activeArticle.urlToImage || "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=600"}
          alt={activeArticle.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=600";
          }}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            fade ? "opacity-75" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
        
        {/* Source Badge */}
        {activeArticle.source?.name && (
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold tracking-wider text-super-neon uppercase">
            {activeArticle.source.name}
          </div>
        )}
        
        {/* Published Date overlay */}
        {formattedDate && (
          <div className="absolute bottom-4 right-4 text-xs font-semibold text-zinc-300 bg-black/45 px-2 py-0.5 rounded backdrop-blur-xs">
            {formattedDate}
          </div>
        )}
      </div>

      {/* Headline & Description Container */}
      <div className="flex-1 flex flex-col p-6 justify-between gap-4 bg-zinc-950/40">
        <div className="space-y-3">
          <a
            href={activeArticle.url && activeArticle.url !== "#" ? activeArticle.url : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link block"
          >
            <h2
              className={`font-outfit font-bold text-lg md:text-xl text-white group-hover/link:text-super-neon transition-all duration-300 leading-snug line-clamp-3 ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            >
              {activeArticle.title}
            </h2>
          </a>
          
          <p
            className={`text-zinc-400 text-sm leading-relaxed transition-opacity duration-300 line-clamp-5 md:line-clamp-6 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            {activeArticle.description || "Headline description is currently unavailable for this media channel."}
          </p>
        </div>

        {/* Carousel indicators & Read link */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            {articles.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-6 bg-super-neon" : "w-1.5 bg-zinc-700"
                }`}
              />
            ))}
          </div>

          {activeArticle.url && activeArticle.url !== "#" && (
            <a
              href={activeArticle.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs font-semibold text-super-neon hover:underline transition-opacity duration-300 flex items-center gap-1 ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            >
              Read Story ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsWidget;
