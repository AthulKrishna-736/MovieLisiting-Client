import React from 'react'
import MovieCard from '../components/MovieCard';
import { IFavoritesListPageProps } from '../types/component.types';

const FavoritesListingPage: React.FC<IFavoritesListPageProps> = ({ movies, onRemoveFavorite, loading }) => {
    return (
        <div>
            {loading ? (
                <div className="w-full h-full flex flex-col justify-center items-center gap-3">
                    <div className="flex flex-col bg-slate-100 py-10 px-20 rounded-lg items-center gap-2">
                        <p className="text-3xl font-medium text-neutral-700 animate-pulse">
                            Loading movies
                        </p>
                        <p className="text-sm text-neutral-500 animate-pulse">
                            Please wait while we fetch content
                        </p>
                    </div>
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                    {movies.map((m) => (
                        <MovieCard
                            movie={m}
                            onAction={onRemoveFavorite}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default FavoritesListingPage;