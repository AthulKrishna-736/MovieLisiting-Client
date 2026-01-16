import React from "react";
import { MovieCardProps } from "../types/component.types";

const MovieCard: React.FC<MovieCardProps> = ({ movie, isFavorite, onAction, ActionIcon }) => {
    return (
        <div className="bg-white flex flex-col justify-between w-65 h-full rounded-md overflow-hidden border-2">
            {/* Poster */}
            <div className="h-90 p-2 w-full">
                <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
                    alt={movie.Title}
                    className="w-full h-full object-cover rounded-md border-2"
                />

            </div>

            <button onClick={() => onAction(movie)} className="text-xl bg-slate-100 inline-block p-1 mx-2 rounded-md border-2 cursor-pointer">
                {ActionIcon ? ActionIcon : isFavorite ? "💚" : "💙"}
            </button>

            {/* Info */}
            <div className="p-2 border-2 m-2 rounded-md">
                <h3 className="font-semibold text-lg truncate text-wrap">
                    {movie.Title}
                </h3>
                <p className="font-bold">
                    {movie.Year}
                </p>
            </div>
        </div>
    );
};

export default MovieCard;
