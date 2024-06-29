import api from "@/lib/axios";
import { AxiosResponse } from "axios";

export default class ChatService {
    static async startConversation(
        recipientId: number
    ): Promise<AxiosResponse> {
        return api.post(`/api/startConversation`, { recipientId });
    }
    static async createConversation(
        recipientId: number
    ): Promise<AxiosResponse> {
        return api.post(`/api/createConversation`, { recipientId });
    }
    static async allConversations(): Promise<AxiosResponse> {
        return api.get(`/api/conversations`);
    }
    static async deleteMessage(id: number): Promise<AxiosResponse> {
        return api.post(`/api/message/delete`, { messageId: id });
    }
    static async createGroup(name: string, users: any): Promise<AxiosResponse> {
        return api.post(`/api/createGroup`, { name, users });
    }
    static async reactOnMessage(mid: number): Promise<AxiosResponse> {
        return api.post(`/api/message/reactOnMessage`, { mid });
    }
    static async deleteReaction(rid: number): Promise<AxiosResponse> {
        return api.post(`/api/message/deleteReaction`, { rid });
    }
}
