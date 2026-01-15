import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { CONFIGS } from "./constants/config";
import { useFetchMovies } from "./hooks/useFetchMovies";
import { useDebounce } from "./utils/debounceSearch";
import { IMovie } from "./types/component.types";
import MovieListingPage from "./pages/MovieListingPage";
import Footer from "./components/Footer";
import FavoritesListingPage from "./pages/FavoritesListingPage";

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("search");
  const [favorites, setFavorites] = useState([]);

  const LIMIT = 10;
  const DELAY_MS = 1000;

  const debouncedQuery = useDebounce(query.trim(), DELAY_MS);
  const { movies, loading, total } = useFetchMovies(debouncedQuery, page, LIMIT);

  console.log('check: ', movies)

  // useEffect(() => {
  //   if (!query) {
  //     setMovies([]);
  //     setTotalPages(1);
  //     return;
  //   }

  //   const timer = setTimeout(() => {
  //     const fetchData = async () => {
  //       setLoading(true);
  //       try {
  //         const res = await fetch(`${CONFIGS.SERVER_URL}/api/movies/search?query=${query}&page=${page}&limit=${limit}`);
  //         const data = await res.json();

  //         setMovies(data?.data?.Search || []);
  //         setTotalPages(Math.ceil((data?.data?.totalResults || limit) / limit));

  //       } catch (error) {
  //         console.error(error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchData();
  //   }, 500);

  //   return () => clearTimeout(timer);
  // }, [query, page]);

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

  const toggleFavorite = async (movie: IMovie) => {
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


  return (
    <div className="flex flex-col w-full min-h-screen justify-between">
      <main className="p-5">
        <Toaster />
        {/* Tabs */}
        <div className="flex gap-2 my-4 bg-neutral-100 p-1 rounded-lg w-fit">
          <button onClick={() => setActiveTab("search")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition ${activeTab === "search" ? "bg-black text-white" : "text-neutral-600 hover:text-black"}`}
          >
            Search Movies
          </button>

          <button onClick={() => setActiveTab("favorites")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition ${activeTab === "favorites" ? "bg-black text-white" : "text-neutral-600 hover:text-black"}`}
          >
            Favorites
          </button>
        </div>

        {/* Search Tab */}
        {activeTab === "search" && (
          <div>
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="w-full mb-4 max-w-md px-2 py-2 border rounded-md focus:outline-none focus:border-black"
            />

            {movies && movies.length > 0 ? (
              <div>
                <MovieListingPage
                  query={query}
                  setQuery={setQuery}
                  page={page}
                  setPage={setPage}
                  loading={loading}
                  movies={movies}
                  total={total}
                  toggleFavorite={toggleFavorite}
                />
              </div>
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center gap-3">
                <div className="flex flex-col bg-slate-100 py-10 px-20 rounded-lg items-center gap-2">
                  <p className="text-3xl font-medium text-neutral-700">
                    No movies found
                  </p>
                  <p className="text-sm text-neutral-500">
                    Try searching with a different keyword
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === "favorites" && (
          {fav}
        //  <FavoritesListingPage/>
          
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
