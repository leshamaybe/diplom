import ChatService from "@/services/chatService";
import { useQuery } from "@tanstack/react-query";
import useChatStore from "@/store/useChatStore";

export const useConversation = (id: number) => {
    const { setCurrentChat } = useChatStore();
    return useQuery({
        queryKey: ["conversation", id],
        queryFn: async () => {
            const res = await ChatService.startConversation(id);
            setCurrentChat(res.data.conversation);
            return res.data.conversation;
        },
    });
};

export const useConversations = () => {
    return useQuery({
        queryKey: ["conversations"],
        queryFn: ChatService.getAllConversations,
    });
};
