import "./FavoritesList.css";

function FavoritesList({ favorites, onRemoveFavorite }) {
    if (!favorites || favorites.length === 0) {
        return <p className="empty-message">No favorite movies added yet.</p>;
    }

    return (
        <div className="favorites-grid">
            {favorites.map((movie) => (
                <div key={movie.imdbID} className="favorite-card">
                    <img
                        src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
                        alt={movie.Title}
                        className="favorite-poster"
                    />
                    <div className="favorite-info">
                        <strong>{movie.Title}</strong> ({movie.Year})
                    </div>
                    <button
                        className="remove-btn"
                        onClick={() => onRemoveFavorite(movie)}
                    >
                        x
                    </button>
                </div>
            ))}
        </div>
    );
}

export default FavoritesList;
