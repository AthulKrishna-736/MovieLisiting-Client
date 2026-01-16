import { useEffect, useState } from "react";
import { IMovie } from "../types/component.types";
import { getFavorites, toggleFavorite } from "../services/apiServices";
import { CUSTOM_TOAST } from "../utils/customToast";

export const useFetchFavorites = () => {
    const [favorites, setFavorites] = useState<IMovie[] | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchFavorites = async () => {
        setLoading(true);
        try {
            const res = await getFavorites();
            if (res) setFavorites(res.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    return {
        favorites,
        loading,
        refetchFavorites: fetchFavorites,
    };
};

export const useToggleFavorite = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const toggle = async (movie: IMovie) => {
        try {
            setLoading(true);

            const res = await toggleFavorite(movie);

            if (res) {
                CUSTOM_TOAST.success(res.message || "Updated favorites");
                return res.data;
            } else {
                CUSTOM_TOAST.warn("Something went wrong");
            }
        } catch (error: any) {
            CUSTOM_TOAST.error(error?.message || "Failed to update favorite");
        } finally {
            setLoading(false);
        }
    };

    return {
        toggleFavorite: toggle,
        loading,
    };
};