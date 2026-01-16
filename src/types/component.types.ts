import { SetStateAction } from "react";

export interface IMovie {
    Title: string;
    Year: number;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface MovieCardProps {
    movie: IMovie;
    isFavorite?: boolean;
    onAction: (movie: IMovie) => void;
    ActionIcon?: React.ReactNode;
}

export interface IFavoriteListProps {
    favorites: IMovie[];
    onRemoveFavorite: (data: IMovie) => void;
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export interface IMovieListingPageProps {
    query: string;
    setQuery: React.Dispatch<SetStateAction<string>>;
    movies: IMovie[];
    page: number;
    setPage: React.Dispatch<SetStateAction<number>>
    total: number;
    loading: boolean;
    toggleFavorite: (movie: IMovie) => void;
}

export interface IFavoritesListPageProps {
    movies: IMovie[];
    onRemoveFavorite: (movie: IMovie) => void;
    loading: boolean;
}

export interface ICustomMessageProps {
    title: string;
    description: string;
}
