import React from "react";
import { MovieCardProps } from "../types/component.types";

const MovieCard: React.FC<MovieCardProps> = ({ movie, isFavorite, onAction, ActionIcon }) => {
    return (
        <div>
            <div key={movie.imdbID}>
                <img src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"} alt={movie.Title} />

                <div>
                    <h3>{movie.Title}</h3>
                    <p>{movie.Year}</p>

                    <button onClick={() => onAction(movie)}>
                        {ActionIcon ? (ActionIcon) : isFavorite ? ("❤️") : ("🤍")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
