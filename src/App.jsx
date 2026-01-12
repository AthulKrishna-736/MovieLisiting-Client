import { useEffect, useState } from "react";
import { CONFIGS } from "./config";
import "./App.css";
import MovieCard from "./components/MovieCard";
import FavoritesList from "./components/Favorites";
import Pagination from "./components/Pagination";

export const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState("search");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    if (!query) {
      setMovies([]);
      setTotalPages(1);
      return;
    }

    const timer = setTimeout(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await fetch(`${CONFIGS.SERVER_URL}/api/movies/search?query=${query}&page=${page}&limit=${limit}`);
          const data = await res.json();

          setMovies(data?.data?.Search || []);
          setTotalPages(Math.ceil((data?.data?.totalResults || limit) / limit));

        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, 500);

    return () => clearTimeout(timer);
  }, [query, page]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch(`${CONFIGS.SERVER_URL}/api/movies/favorites`);
        const data = await res.json();

        setFavorites(data.data || []);
      } catch (error) {
        console.error("Failed to fetch favorites", error);
      }
    };
    fetchFavorites();
  }, []);

  const toggleFavorite = async (movie) => {
    try {
      await fetch(`${CONFIGS.SERVER_URL}/api/movies/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie),
      });

      const res = await fetch(`${CONFIGS.SERVER_URL}/api/movies/favorites`);
      const data = await res.json();

      setFavorites(data.data || []);
    } catch (error) {
      console.error("Failed to update favorites", error);
    }
  };

  const isFavorite = (id) => favorites.some((fav) => fav.imdbID === id);

  return (
    <div className="app-container">
      <main className="content">
        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === "search" ? "active" : ""}`}
            onClick={() => setActiveTab("search")}
          >
            Search Movies
          </button>
          <button
            className={`tab-btn ${activeTab === "favorites" ? "active" : ""}`}
            onClick={() => setActiveTab("favorites")}
          >
            Favorites
          </button>
        </div>

        {/* Search Tab */}
        {activeTab === "search" && (
          <div className="search-tab">
            <input
              type="text"
              className="search-input"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1); // reset page on new query
              }}
            />

            {loading ? (
              <p className="empty-message">Loading movies...</p>
            ) : (
              <>
                <div className="movie-grid">
                  {movies.map((movie) => (
                    <MovieCard
                      key={movie.imdbID}
                      movie={movie}
                      isFavorite={isFavorite(movie.imdbID)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
                {movies.length > 0 && (
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                )}
              </>
            )}
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === "favorites" && (
          <FavoritesList
            favorites={favorites}
            onRemoveFavorite={toggleFavorite}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Simple Movie App &copy; {new Date().getFullYear()}. This platform is a
          minimal app to search and save your favorite movies.
        </p>
      </footer>
    </div>
  );
};

export default App;
