import axios from "axios";

// Environment Variables (Loaded from Vite environment)
const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "";
const NEWS_API_KEY = import.meta.env.VITE_NEWSDATA_API_KEY || import.meta.env.VITE_NEWS_API_KEY || "";
const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY || "";

// Standard HTTP Clients
const weatherClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

const newsClient = axios.create({
  baseURL: "https://newsdata.io/api/1",
});

const newsApiClient = axios.create({
  baseURL: "https://newsapi.org/v2",
});

const movieClient = axios.create({
  baseURL: "https://www.omdbapi.com/",
});

// ==========================================
// HIGH-FIDELITY MOCK DATABASES (FALLBACKS)
// ==========================================

const MOCK_WEATHER = {
  main: { temp: 24.5, humidity: 62, pressure: 1012 },
  wind: { speed: 4.8 },
  weather: [{ main: "Clouds", description: "scattered clouds", icon: "03d" }],
  name: "New Delhi",
};

const MOCK_NEWS = [
  {
    title: "Vibe Shift: The Future of Entertainment Dashboards",
    description: "Discover how modern super apps are changing the way users interact with media, daily schedules, and live trackers.",
    urlToImage: "https://images.unsplash.com/photo-1593789198777-f29bc259780e?q=80&w=600&auto=format&fit=crop",
    source: { name: "Tech Pulse" },
    publishedAt: new Date().toISOString(),
  },
  {
    title: "AI Revolutionizes Weather Forecasting and Atmospheric Modelling",
    description: "Meteorologists deploy new machine learning pipelines to forecast weather conditions with 98% accuracy.",
    urlToImage: "https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=600&auto=format&fit=crop",
    source: { name: "Science Daily" },
    publishedAt: new Date().toISOString(),
  },
  {
    title: "Why Cinema Attendance is Surging Worldwide in 2026",
    description: "Box office figures show a record-breaking summer with blockbuster action, romance, and experimental musicals drawing huge crowds.",
    urlToImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop",
    source: { name: "Hollywood Insider" },
    publishedAt: new Date().toISOString(),
  },
  {
    title: "The Ultimate Guide to Digital Note-Taking and Personal Knowledge Management",
    description: "How locking in simple memo notes can increase daily throughput by 40% according to cognitive studies.",
    urlToImage: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=600&auto=format&fit=crop",
    source: { name: "Mind & Focus" },
    publishedAt: new Date().toISOString(),
  }
];

const MOCK_MOVIES = {
  Action: [
    { imdbID: "m1", Title: "The Dark Knight", Year: "2008", Poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400&auto=format&fit=crop" },
    { imdbID: "m2", Title: "Mad Max: Fury Road", Year: "2015", Poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=400&auto=format&fit=crop" },
    { imdbID: "m3", Title: "Inception", Year: "2010", Poster: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400&auto=format&fit=crop" },
    { imdbID: "m4", Title: "Gladiator", Year: "2000", Poster: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=400&auto=format&fit=crop" }
  ],
  Comedy: [
    { imdbID: "m5", Title: "Superbad", Year: "2007", Poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=400&auto=format&fit=crop" },
    { imdbID: "m6", Title: "The Hangover", Year: "2009", Poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400&auto=format&fit=crop" },
    { imdbID: "m7", Title: "Step Brothers", Year: "2008", Poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400&auto=format&fit=crop" },
    { imdbID: "m8", Title: "Mean Girls", Year: "2004", Poster: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=400&auto=format&fit=crop" }
  ],
  Drama: [
    { imdbID: "m9", Title: "The Shawshank Redemption", Year: "1994", Poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=400&auto=format&fit=crop" },
    { imdbID: "m10", Title: "The Godfather", Year: "1972", Poster: "https://images.unsplash.com/photo-1506869646322-2eb36fa7ba27?q=80&w=400&auto=format&fit=crop" },
    { imdbID: "m11", Title: "Forrest Gump", Year: "1994", Poster: "https://images.unsplash.com/photo-1497015289639-54688650d173?q=80&w=400&auto=format&fit=crop" },
    { imdbID: "m12", Title: "Fight Club", Year: "1999", Poster: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=400&auto=format&fit=crop" }
  ],
  Music: [
    { imdbID: "m13", Title: "Whiplash", Year: "2014", Poster: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=400&auto=format&fit=crop" },
    { imdbID: "m14", Title: "La La Land", Year: "2016", Poster: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400&auto=format&fit=crop" },
    { imdbID: "m15", Title: "Bohemian Rhapsody", Year: "2018", Poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop" },
    { imdbID: "m16", Title: "A Star Is Born", Year: "2018", Poster: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=400&auto=format&fit=crop" }
  ],
  Sports: [
    { imdbID: "m17", Title: "Rocky", Year: "1976", Poster: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop" },
    { imdbID: "m18", Title: "Moneyball", Year: "2011", Poster: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=400&auto=format&fit=crop" },
    { imdbID: "m19", Title: "Rush", Year: "2013", Poster: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=400&auto=format&fit=crop" },
    { imdbID: "m20", Title: "Creed", Year: "2015", Poster: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop" }
  ],
  Thriller: [
    { imdbID: "m21", Title: "The Silence of the Lambs", Year: "1991", Poster: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=400&auto=format&fit=crop" },
    { imdbID: "m22", Title: "Se7en", Year: "1995", Poster: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=400&auto=format&fit=crop" },
    { imdbID: "m23", Title: "Shutter Island", Year: "2010", Poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop" },
    { imdbID: "m24", Title: "Parasite", Year: "2019", Poster: "https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=400&auto=format&fit=crop" }
  ],
  Fantasy: [
    { imdbID: "m25", Title: "The Fellowship of the Ring", Year: "2001", Poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop" },
    { imdbID: "m26", Title: "Harry Potter & Sorcerer's Stone", Year: "2001", Poster: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=400&auto=format&fit=crop" },
    { imdbID: "m27", Title: "Avatar", Year: "2009", Poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop" },
    { imdbID: "m28", Title: "Pan's Labyrinth", Year: "2006", Poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop" }
  ],
  Romance: [
    { imdbID: "m29", Title: "The Notebook", Year: "2004", Poster: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=400&auto=format&fit=crop" },
    { imdbID: "m30", Title: "Titanic", Year: "1997", Poster: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=400&auto=format&fit=crop" },
    { imdbID: "m31", Title: "Pride & Prejudice", Year: "2005", Poster: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=400&auto=format&fit=crop" },
    { imdbID: "m32", Title: "About Time", Year: "2013", Poster: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=400&auto=format&fit=crop" }
  ],
};

const MOCK_MOVIE_DETAILS = {
  m1: { imdbRating: "9.0", Runtime: "152 min", Genre: "Action, Crime, Drama", Plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", Actors: "Christian Bale, Heath Ledger, Aaron Eckhart" },
  m2: { imdbRating: "8.1", Runtime: "120 min", Genre: "Action, Adventure, Sci-Fi", Plot: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.", Actors: "Tom Hardy, Charlize Theron, Nicholas Hoult" },
  m3: { imdbRating: "8.8", Runtime: "148 min", Genre: "Action, Adventure, Sci-Fi", Plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project.", Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page" },
  m4: { imdbRating: "8.5", Runtime: "155 min", Genre: "Action, Adventure, Drama", Plot: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.", Actors: "Russell Crowe, Joaquin Phoenix, Connie Nielsen" },
  m5: { imdbRating: "7.6", Runtime: "113 min", Genre: "Comedy", Plot: "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-filled party goes awry.", Actors: "Jonah Hill, Michael Cera, Christopher Mintz-Plasse" },
  m6: { imdbRating: "7.7", Runtime: "100 min", Genre: "Comedy", Plot: "Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.", Actors: "Bradley Cooper, Ed Helms, Zach Galifianakis" },
  m7: { imdbRating: "6.9", Runtime: "98 min", Genre: "Comedy", Plot: "Two aimless middle-aged losers still living at home are forced to become roommates when their parents marry.", Actors: "Will Ferrell, John C. Reilly, Mary Steenburgen" },
  m8: { imdbRating: "7.1", Runtime: "97 min", Genre: "Comedy", Plot: "Cady Heron is a hit with The Plastics, the A-list girl clique at her new school, until she makes the mistake of falling for Aaron Samuels, the ex-boyfriend of alpha Plastic Regina George.", Actors: "Lindsay Lohan, Jonathan Bennett, Rachel McAdams" },
  m9: { imdbRating: "9.3", Runtime: "142 min", Genre: "Drama", Plot: "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.", Actors: "Tim Robbins, Morgan Freeman, Bob Gunton" },
  m10: { imdbRating: "9.2", Runtime: "175 min", Genre: "Crime, Drama", Plot: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.", Actors: "Marlon Brando, Al Pacino, James Caan" },
  m11: { imdbRating: "8.8", Runtime: "142 min", Genre: "Drama, Romance", Plot: "The history of the United States from the 1950s to the 1970s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.", Actors: "Tom Hanks, Robin Wright, Gary Sinise" },
  m12: { imdbRating: "8.8", Runtime: "139 min", Genre: "Drama", Plot: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.", Actors: "Brad Pitt, Edward Norton, Meat Loaf" },
  m13: { imdbRating: "8.5", Runtime: "106 min", Genre: "Drama, Music", Plot: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.", Actors: "Miles Teller, J.K. Simmons, Paul Reiser" },
  m14: { imdbRating: "8.0", Runtime: "128 min", Genre: "Comedy, Drama, Music", Plot: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.", Actors: "Ryan Gosling, Emma Stone, Rosemarie DeWitt" },
  m15: { imdbRating: "7.9", Runtime: "134 min", Genre: "Biography, Drama, Music", Plot: "The story of the legendary British rock band Queen and lead singer Freddie Mercury, leading up to their famous performance at Live Aid (1985).", Actors: "Rami Malek, Lucy Boynton, Gwilym Lee" },
  m16: { imdbRating: "7.6", Runtime: "136 min", Genre: "Drama, Music, Romance", Plot: "A musician helps a young singer find fame as age and alcoholism send his own career into a downward spiral.", Actors: "Lady Gaga, Bradley Cooper, Sam Elliott" },
  m17: { imdbRating: "8.1", Runtime: "120 min", Genre: "Drama, Sport", Plot: "A small-time Philadelphia boxer gets a supremely rare chance to fight the world heavy-weight champion in a bout in which he strives to go the distance for his self-respect.", Actors: "Sylvester Stallone, Talia Shire, Burt Young" },
  m18: { imdbRating: "7.6", Runtime: "133 min", Genre: "Biography, Drama, Sport", Plot: "Oakland A's general manager Billy Beane's successful attempt to assemble a baseball team on a lean budget by employing computer-generated analysis to acquire new players.", Actors: "Brad Pitt, Robin Wright, Jonah Hill" },
  m19: { imdbRating: "8.1", Runtime: "123 min", Genre: "Action, Biography, Drama", Plot: "The merciless 1970s rivalry between Formula One rivals James Hunt and Niki Lauda.", Actors: "Daniel Brühl, Chris Hemsworth, Olivia Wilde" },
  m20: { imdbRating: "7.6", Runtime: "133 min", Genre: "Drama, Sport", Plot: "The former World Heavyweight Champion Rocky Balboa serves as a trainer and mentor to Adonis Johnson, the son of his late friend and former rival Apollo Creed.", Actors: "Michael B. Jordan, Sylvester Stallone, Tessa Thompson" },
  m21: { imdbRating: "8.6", Runtime: "118 min", Genre: "Crime, Drama, Thriller", Plot: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.", Actors: "Jodie Foster, Anthony Hopkins, Lawrence A. Bonney" },
  m22: { imdbRating: "8.6", Runtime: "127 min", Genre: "Crime, Drama, Mystery", Plot: "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.", Actors: "Morgan Freeman, Brad Pitt, Kevin Spacey" },
  m23: { imdbRating: "8.2", Runtime: "138 min", Genre: "Mystery, Thriller", Plot: "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.", Actors: "Leonardo DiCaprio, Emily Mortimer, Mark Ruffalo" },
  m24: { imdbRating: "8.5", Runtime: "132 min", Genre: "Drama, Thriller", Plot: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.", Actors: "Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong" },
  m25: { imdbRating: "8.8", Runtime: "178 min", Genre: "Action, Adventure, Fantasy", Plot: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.", Actors: "Elijah Wood, Ian McKellen, Orlando Bloom" },
  m26: { imdbRating: "7.6", Runtime: "152 min", Genre: "Adventure, Family, Fantasy", Plot: "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.", Actors: "Daniel Radcliffe, Rupert Grint, Emma Watson" },
  m27: { imdbRating: "7.9", Runtime: "162 min", Genre: "Action, Adventure, Fantasy", Plot: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.", Actors: "Sam Worthington, Zoe Saldana, Sigourney Weaver" },
  m28: { imdbRating: "8.2", Runtime: "118 min", Genre: "Drama, Fantasy, War", Plot: "In the Falangist Spain of 1944, the young stepdaughter of a sadistic army officer escapes into a eerie but captivating fantasy world.", Actors: "Ivana Baquero, Ariadna Gil, Sergi López" },
  m29: { imdbRating: "7.8", Runtime: "123 min", Genre: "Drama, Romance", Plot: "A poor boarder falls in love with a rich heiress, giving her a sense of freedom. However, they are soon separated because of their social differences.", Actors: "Ryan Gosling, Rachel McAdams, Gena Rowlands" },
  m30: { imdbRating: "7.9", Runtime: "194 min", Genre: "Drama, Romance", Plot: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.", Actors: "Leonardo DiCaprio, Kate Winslet, Billy Zane" },
  m31: { imdbRating: "7.8", Runtime: "129 min", Genre: "Drama, Romance", Plot: "Sparks fly when spirited Elizabeth Bennet meets single, rich, and proud Mr. Darcy. But Mr. Darcy reluctantly finds himself falling in love with a woman beneath his class.", Actors: "Keira Knightley, Matthew Macfadyen, Brenda Blethyn" },
  m32: { imdbRating: "7.8", Runtime: "123 min", Genre: "Comedy, Drama, Fantasy", Plot: "At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out to have unexpected challenges.", Actors: "Domhnall Gleeson, Rachel McAdams, Bill Nighy" },
};

// ==========================================
// API IMPLEMENTATION WITH MOCK FALLBACKS
// ==========================================

// Weather Fetcher Method
export const fetchCurrentWeather = async (city = "New Delhi") => {
  if (!WEATHER_API_KEY) {
    console.warn("OpenWeather API Key is not configured. Using high-fidelity weather simulator.");
    return simulateWeather(city);
  }

  try {
    const response = await weatherClient.get(`/weather?q=${encodeURIComponent(city)}&units=metric&appid=${WEATHER_API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Weather service failure, reverting to mock weather simulator:", error);
    return simulateWeather(city);
  }
};

const simulateWeather = (city) => {
  // Add a slight random factor to make it feel "live"
  const randomFactor = (Math.random() - 0.5) * 3; 
  return {
    ...MOCK_WEATHER,
    name: city,
    main: {
      ...MOCK_WEATHER.main,
      temp: parseFloat((MOCK_WEATHER.main.temp + randomFactor).toFixed(1)),
      humidity: Math.min(100, Math.max(10, MOCK_WEATHER.main.humidity + Math.round(randomFactor * 2))),
    }
  };
};

// News Fetcher Method
export const fetchTopHeadlines = async (category = "general") => {
  if (!NEWS_API_KEY || NEWS_API_KEY === "YOUR_API_KEY") {
    console.warn("News API Key is not configured. Reverting to mock rotating articles.");
    return MOCK_NEWS;
  }

  const isNewsApiOrg = /^[a-f0-9]{32}$/i.test(NEWS_API_KEY);

  try {
    if (isNewsApiOrg) {
      const endpoint = category && category !== "general"
        ? `/top-headlines?country=us&category=${encodeURIComponent(category)}&apiKey=${NEWS_API_KEY}`
        : `/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;
      
      const response = await newsApiClient.get(endpoint);
      const articles = response.data.articles || [];
      
      const mapped = articles
        .filter(a => a && a.title && a.title !== "[Removed]")
        .map(a => ({
          title: a.title,
          description: a.description || "No description available.",
          urlToImage: a.urlToImage || null,
          url: a.url || "#",
          source: { name: a.source?.name || "News" },
          publishedAt: a.publishedAt || new Date().toISOString()
        }));
      
      return mapped.length > 0 ? mapped : MOCK_NEWS;
    } else {
      const response = await newsClient.get(`/latest?q=${category}&language=en&apikey=${NEWS_API_KEY}`);
      const results = response.data.results || [];
      
      const mapped = results.filter(r => r.title && r.image_url).map(r => ({
        title: r.title,
        description: r.description,
        urlToImage: r.image_url,
        url: r.link || "#",
        source: { name: r.source_id },
        publishedAt: r.pubDate
      }));
      
      return mapped.length > 0 ? mapped : MOCK_NEWS;
    }
  } catch (error) {
    console.error("News service failure, falling back to mock rotating articles:", error);
    return MOCK_NEWS;
  }
};

// Movie Fetcher Method
export const searchMovieByGenre = async (genreName) => {
  if (!OMDB_API_KEY) {
    console.warn(`OMDB API Key is not configured. Reverting to local database for genre: ${genreName}`);
    return MOCK_MOVIES[genreName] || MOCK_MOVIES.Action;
  }

  try {
    // OMDB is search-based. We query standard keywords representing the genre
    const searchTerms = {
      Action: "batman",
      Comedy: "funny",
      Drama: "godfather",
      Music: "music",
      Sports: "sport",
      Thriller: "thriller",
      Fantasy: "harry potter",
      Romance: "romance"
    };

    const query = searchTerms[genreName] || genreName;
    const response = await movieClient.get(`/?s=${encodeURIComponent(query)}&type=movie&apikey=${OMDB_API_KEY}`);
    
    if (response.data && response.data.Search && response.data.Search.length > 0) {
      // Map poster placeholders to nice standard placeholders if N/A
      return response.data.Search.map(movie => ({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster === "N/A" ? "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=400" : movie.Poster
      }));
    } else {
      return MOCK_MOVIES[genreName] || MOCK_MOVIES.Action;
    }
  } catch (error) {
    console.error(`Movie fetch failed for ${genreName}, falling back to mock list:`, error);
    return MOCK_MOVIES[genreName] || MOCK_MOVIES.Action;
  }
};

// Generic Movie Search Method
export const searchMoviesByTitle = async (query) => {
  if (!OMDB_API_KEY) {
    return [];
  }

  try {
    const response = await movieClient.get(`/?s=${encodeURIComponent(query)}&type=movie&apikey=${OMDB_API_KEY}`);
    
    if (response.data && response.data.Search && response.data.Search.length > 0) {
      return response.data.Search.map(movie => ({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster === "N/A" ? "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=400" : movie.Poster
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error(`Movie fetch failed for query ${query}:`, error);
    return [];
  }
};

// Detailed Movie Fetcher Method
export const fetchMovieDetails = async (imdbID) => {
  if (!OMDB_API_KEY || imdbID.startsWith("m")) {
    console.warn(`Reverting to local movie detailed registry for ID: ${imdbID}`);
    // Extract base movie structure from MOCK_MOVIES
    let baseMovie = null;
    for (const genre in MOCK_MOVIES) {
      const found = MOCK_MOVIES[genre].find(m => m.imdbID === imdbID);
      if (found) {
        baseMovie = found;
        break;
      }
    }
    
    const details = MOCK_MOVIE_DETAILS[imdbID] || {
      imdbRating: "7.5",
      Runtime: "120 min",
      Genre: "Drama",
      Plot: "A high-fidelity story of conflict, growth, and destiny set in a captivating cinematic environment.",
      Actors: "Cinematic Cast Ensemble"
    };

    return {
      Title: baseMovie ? baseMovie.Title : "Unknown Masterpiece",
      Year: baseMovie ? baseMovie.Year : "2026",
      Poster: baseMovie ? baseMovie.Poster : "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=400",
      ...details
    };
  }

  try {
    const response = await movieClient.get(`/?i=${imdbID}&plot=full&apikey=${OMDB_API_KEY}`);
    return response.data;
  } catch (error) {
    console.error(`Movie detailed payload fetch failed for ${imdbID}, returning mock:`, error);
    // Find mock fallback anyway
    const details = MOCK_MOVIE_DETAILS[imdbID] || {
      imdbRating: "7.8",
      Runtime: "120 min",
      Genre: "Action, Thriller",
      Plot: "Cinematic epic following standard narrative structures with vibrant performances and incredible pacing.",
      Actors: "Leading Stars & Cast"
    };
    return {
      imdbID,
      Title: "Featured Movie",
      Year: "2026",
      Poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=400",
      ...details
    };
  }
};
