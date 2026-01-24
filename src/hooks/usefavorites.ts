import { useEffect, useState } from "react";
import { IMovie } from "../types/component.types";
import { getFavorites, toggleFavorite } from "../services/apiServices";
import { CUSTOM_TOAST } from "../utils/customToast";

export const useFetchFavorites = (setFavorites: React.Dispatch<React.SetStateAction<IMovie[] | []>>) => {
    const [loading, setLoading] = useState(false);

    const fetchFavorites = async () => {
        setLoading(true);
        try {
            const res = await getFavorites();
            if (res && res.data) setFavorites(res.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    return {
        loading,
    };
};

export const useToggleFavorite = (setFavorites: React.Dispatch<React.SetStateAction<IMovie[] | []>>) => {
    const [loading, setLoading] = useState<boolean>(false);

    const toggle = async (movie: IMovie) => {
        let stateSnapshot: IMovie[] = [];
        setLoading(true);
        setFavorites(prev => {
            stateSnapshot = prev;
            const exists = prev.some(f => f.imdbID === movie.imdbID);
            const filter = prev.filter((f) => f.imdbID !== movie.imdbID)
            const latest = [...prev, movie];

            return exists ? filter : latest;
        });

        try {
            const res = await toggleFavorite(movie);

            if (res) {
                CUSTOM_TOAST.success(res.message || "Updated favorites");
            } else {
                CUSTOM_TOAST.warn("Something went wrong");
            }
        } catch (error: any) {
            CUSTOM_TOAST.error(error?.message || "Failed to update favorite");
            setFavorites(stateSnapshot);
        } finally {
            setLoading(false);
        }
    };

    return {
        toggleFavorite: toggle,
        loading,
    };
};