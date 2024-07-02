import api from "@/lib/axios";
import { AxiosResponse } from "axios";

export default class UserService {
    static async getUsers(): Promise<AxiosResponse> {
        return api.get("/api/user");
    }
    static async getUserById<T>(id: T): Promise<AxiosResponse> {
        return api.get(`/api/user/${id}`);
    }
    static async getUserByUsername<T>(username: T): Promise<AxiosResponse> {
        return api.get(`/api/user/username/${username}`);
    }
    static async getProfile(): Promise<AxiosResponse> {
        return api.get(`/api/user/profile`);
    }
    static async changeProfile(formData: any): Promise<AxiosResponse> {
        return api.post(
            `/api/user/changeProfile`,
            { formData },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}
