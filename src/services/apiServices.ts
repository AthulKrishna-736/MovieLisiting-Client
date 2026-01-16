import { APIS } from "../constants/apiConstants"
import { IMovie } from "../types/component.types";
import { TApiResponse } from "../types/response.types";
import { axiosInstance } from "./axiosInstance"


export const searchMovies = async (
    query: string,
    page: number,
    limit: number,
    signal?: AbortSignal
): Promise<TApiResponse<IMovie[], number> | undefined> => {
    try {
        const response = await axiosInstance.get(`${APIS.search}`, {
            params: { query, page, limit },
            signal,
        })

        return response.data;
    } catch (error) {
        console.log('Error: ', error);
    }
}

export const getFavorites = async (): Promise<TApiResponse<IMovie[], null> | undefined> => {
    try {
        const response = await axiosInstance.get(`${APIS.favorites}`);
        return response.data;
    } catch (error) {
        console.log('Error: ', error);
    }
}

export const toggleFavorite = async (data: IMovie): Promise<TApiResponse<IMovie[], null> | undefined> => {
    try {
        const response = await axiosInstance.post(`${APIS.favorites}`, data);
        return response.data;
    } catch (error) {
        console.log('Error: ', error);
    }
}
