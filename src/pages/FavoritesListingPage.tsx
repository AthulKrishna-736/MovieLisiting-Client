import React from 'react'
import MovieCard from '../components/MovieCard';
import { IFavoritesListPageProps } from '../types/component.types';

const FavoritesListingPage: React.FC<IFavoritesListPageProps> = ({ movies, onRemoveFavorite }) => {
    return (
        <div>
            {movies && movies.length > 0 ? (
                <div>
                    {movies.map((m) => (
                        <MovieCard
                            movie={m}
                            onAction={onRemoveFavorite}
                        />
                    ))}
                </div>
            ) : (
                <div className="w-full h-full flex flex-col justify-center items-center gap-3">
                    <div className="flex flex-col bg-slate-100 py-10 px-20 rounded-lg items-center gap-2">
                        <p className="text-3xl font-medium text-neutral-700">
                            No movies found
                        </p>
                        <p className="text-sm text-neutral-500">
                            Try search and mark movies as favorite
                        </p>
                    </div>
                </div>
            )}
        </div >
    )
}

export default FavoritesListingPage;