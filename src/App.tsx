import { ChangeEvent, useState } from "react";
import { Toaster } from "sonner";
import { useFetchMovies } from "./hooks/useFetchMovies";
import { useDebounce } from "./utils/debounceSearch";
import { IMovie } from "./types/component.types";
import MovieListingPage from "./pages/MovieListingPage";
import Footer from "./components/Footer";
import FavoritesListingPage from "./pages/FavoritesListingPage";
import { useFetchFavorites, useToggleFavorite } from "./hooks/usefavorites";
import CustomMessage from "./components/CustomMessage";
import { CUSTOM_TOAST } from "./utils/customToast";

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("search");

  const LIMIT = 10;
  const DELAY_MS = 1000;

  const debouncedQuery = useDebounce(query.trim(), DELAY_MS);
  const { movies, loading, total } = useFetchMovies(debouncedQuery, page, LIMIT);
  const { favorites, loading: favoriteLoading, refetchFavorites } = useFetchFavorites();
  const { toggleFavorite } = useToggleFavorite();

  const handleToggleFavorite = async (movie: IMovie) => {
    await toggleFavorite(movie);
    refetchFavorites();
  };

  const handleInputValidate = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    const searchRegex = /^[a-zA-Z0-9\s:'\-.,&()]{0,40}$/;
    if (!searchRegex.test(val.trim())) {
      CUSTOM_TOAST.error("Search can only contain letters, numbers, spaces, and common characters (: - ' . , &)")
      return
    }

    setQuery(val.trim())
    setPage(1);
  }

  return (
    <div className="flex flex-col w-full min-h-screen justify-between">
      <main className="p-5">
        <Toaster />
        {/* Tabs */}
        <div className="flex gap-2 my-4 bg-neutral-200 p-1 rounded-lg w-fit">
          <button onClick={() => setActiveTab("search")}
            className={`px-4 py-2 text-sm font-medium rounded-md cursor-pointer ${activeTab === "search" ? "bg-black text-white" : "text-neutral-600 hover:text-black"}`}
          >
            Search Movies
          </button>

          <button onClick={() => setActiveTab("favorites")}
            className={`px-4 py-2 text-sm font-medium rounded-md cursor-pointer ${activeTab === "favorites" ? "bg-black text-white" : "text-neutral-600 hover:text-black"}`}
          >
            Favorites
          </button>
        </div>

        {/* Search Tab */}
        {activeTab === "search" && (
          <div>
            <input type="text" placeholder="Search movies..." value={query} onChange={handleInputValidate}
              className="w-full mb-4 max-w-md px-2 py-2 bg-neutral-100 border rounded-md focus:outline-none focus:border-black"
            />

            {movies && movies.length > 0 ? (
              <div className="bg-gray-200 w-full h-full rounded-md p-4 flex justify-center">
                <MovieListingPage
                  query={query}
                  setQuery={setQuery}
                  page={page}
                  setPage={setPage}
                  loading={loading}
                  movies={movies}
                  total={total}
                  toggleFavorite={handleToggleFavorite}
                />
              </div>
            ) : (
              <CustomMessage title="No movies found" description="Try searching with a different keyword" />
            )}
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === "favorites" && (
          <div className="bg-gray-200 w-full h-full rounded-md p-4 flex justify-center">
            {favorites && favorites.length > 0 ? (
              <FavoritesListingPage
                movies={favorites}
                loading={favoriteLoading}
                onRemoveFavorite={handleToggleFavorite}
              />
            ) : (
              <CustomMessage title="No movies found" description="Try search and mark movies as favorite" />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
