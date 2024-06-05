import axios from "axios";
import { LoginResponse } from "@/types/types";
import { getCookie } from "cookies-next";

export const API_URL = `http://localhost:5050`;

const api = axios.create({
    withCredentials: true,
    baseURL: `${API_URL}/`,
});

api.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${getCookie("accessToken")}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status == 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                await axios.get<LoginResponse>(`${API_URL}/auth/refresh`, {
                    withCredentials: true,
                });

                return api.request(originalRequest);
            } catch (error) {
                // localStorage.clear();
                // deleteCookie("accessToken");
                // window.location.href = "/login";
                console.log(error);
            }
        }

        throw error;
    }
);

export default api;
