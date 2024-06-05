import api from "@/lib/axios";
import { AxiosResponse } from "axios";
import { LoginResponse, RegisterResponse } from "@/types/types";
import { deleteCookie, getCookie } from "cookies-next";
import useAuthStore from "@/store/useAuthStore";

export default class AuthService {
    static async login(
        username: string,
        password: string
    ): Promise<AxiosResponse<LoginResponse>> {
        const data = await api.post("/auth/login", { username, password });
        return data;
    }

    static async register(
        username: string,
        password: string,
        email?: string
    ): Promise<AxiosResponse<RegisterResponse>> {
        const res = api.post("/auth/reg", { username, password, email });
        return res;
    }

    static async logout(): Promise<AxiosResponse> {
        const { data } = await api.get("/auth/logout");

        deleteCookie("accessToken");
        localStorage.clear();

        return data;
    }

    static async checkIsAuth() {
        try {
            const { data } = await api.get<LoginResponse>(
                "http://localhost:5050/auth/refresh",
                { withCredentials: true }
            );

            return !!data;
        } catch (error: any) {
            console.log(error.response);
        }
    }

    isLoggedIn() {
        const token = this.getToken();
        return !!token;
    }
    getToken() {
        return getCookie("accessToken");
    }
}
