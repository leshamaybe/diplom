import ChatService from "@/services/chatService";
import useChatStore from "@/store/useChatStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateChat = (currentUserId: number) => {
    const queryClient = useQueryClient();

    const { mutate: createChat } = useMutation({
        mutationFn: (currentUserId: number) =>
            ChatService.createConversation(currentUserId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["conversation"] });
            queryClient.invalidateQueries({ queryKey: ["usersList"] });
        },
    });

    return { createChat };
};

export const useGetChat = (currentUserId: number) => {
    const { setCurrentChat } = useChatStore();
    return useQuery({
        queryKey: ["conversation", currentUserId],
        queryFn: async () => {
            const res = await ChatService.startConversation(currentUserId);
            setCurrentChat(res.data);
            return res.data;
        },
        retry: false,
    });
};

export const useAllChats = () => {
    return useQuery({
        queryKey: ["usersList"],
        queryFn: ChatService.allConversations,
        staleTime: 60 * 1000 * 10,
        select: (data) => data.data,
    });
};

export const useCreateGroup = () => {
    const queryClient = useQueryClient();

    const { mutate: createGroup } = useMutation({
        mutationFn: ({
            name,
            users,
            avatarUrl,
        }: {
            name: string;
            users: any;
            avatarUrl: any;
        }) => ChatService.createGroup(name, users, avatarUrl),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ["usersList"] });
        },
    });

    return { createGroup };
};
