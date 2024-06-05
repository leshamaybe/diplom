import api from "@/lib/axios";
import { AxiosResponse } from "axios";

export default class ChatService {
    static async startConversation(
        recipientId: number
    ): Promise<AxiosResponse> {
        return api.post(`/api/startConversation`, { recipientId });
    }
    static async getAllConversations(): Promise<AxiosResponse> {
        return api.get(`/api/allChats`);
    }
}
