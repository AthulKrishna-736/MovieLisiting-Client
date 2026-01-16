import React from 'react'
import Pagination from '../components/Pagination'
import { IMovieListingPageProps } from '../types/component.types'
import MovieCard from '../components/MovieCard';

const MovieListingPage: React.FC<IMovieListingPageProps> = ({ query, setQuery, movies, loading, page, setPage, total, toggleFavorite, }) => {

    const isFavorite = (id: string) => movies.some((fav) => fav.imdbID === id);

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
                <div>
                    <div className='grid grid-cols-5 gap-6'>
                        {movies.map((movie) => (
                            <MovieCard
                                movie={movie}
                                isFavorite={isFavorite(movie.imdbID)}
                                onAction={toggleFavorite}
                            />
                        ))}
                    </div>

                    <div>
                        <Pagination
                            currentPage={page}
                            totalPages={total}
                            onPageChange={setPage}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default MovieListingPage