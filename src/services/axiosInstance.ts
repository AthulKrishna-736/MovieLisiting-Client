import axios from "axios";
import { CONFIGS } from "../constants/config";

export const axiosInstance = axios.create({
    baseURL: CONFIGS.SERVER_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    responseType: 'json',
    withCredentials: true,
});

