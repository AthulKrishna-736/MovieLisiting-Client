import "./movieCard.css";

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
    return (
        <div className="movie-card">
            <div className="poster-wrapper">
                <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
                    alt={movie.Title}
                    className="movie-poster"
                />
                <button
                    className={`favorite-btn ${isFavorite ? "active" : ""}`}
                    onClick={() => onToggleFavorite(movie)}
                >
                    {isFavorite ? "❤️" : "🤍"}
                </button>
            </div>

            <div className="movie-info">
                <h3 className="movie-title">{movie.Title}</h3>
                <p className="movie-year">{movie.Year}</p>
            </div>
        </div>
    );
}

export default MovieCard;
