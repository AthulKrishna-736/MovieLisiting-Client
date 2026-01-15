import { useEffect, useState } from "react"
import { IMovie } from "../types/component.types";
import { searchMovies } from "../services/apiServices";
import { toast } from "sonner";
import { CUSTOM_TOAST } from "../utils/customToast";


export const useFetchMovies = (search: string, page: number, limit: number): { movies: IMovie[] | null, total: number, loading: boolean } => {
    const [movies, setMovies] = useState<IMovie[] | null>(null);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!search) {
            setMovies(null);
            return;
        }

        const controller = new AbortController();
        const { signal } = controller

        setLoading(true);
        searchMovies(search, page, limit, signal)
            .then((res) => {
                if (res) {
                    CUSTOM_TOAST.success(res.message);
                    setMovies(res.data);
                    setTotal(res?.meta ?? 0)
                } else {
                    CUSTOM_TOAST.warn('Something went wrong');
                }
            })
            .catch((error) => {
                console.log('Hook Error: ', error)
                CUSTOM_TOAST.error(error?.message || 'Error while fetching movies')
            })
            .finally(() => {
                if (!signal.aborted) {
                    setLoading(false);
                }
            })

        return () => {
            controller.abort();
        }

    }, [search]);

    return {
        movies,
        loading,
        total,
    };
}