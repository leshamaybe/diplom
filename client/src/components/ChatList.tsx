import { useQuery } from "@tanstack/react-query";
import { IUser } from "@/types/types";
import ChatListItem from "./ChatListItem";
import ChatService from "@/services/chatService";
import useChatStore from "@/store/useChatStore";
import { useEffect } from "react";

const ChatList = () => {
    const { setChats } = useChatStore();
    const {
        data: users,
        isLoading,
        isError,
        isSuccess,
    } = useQuery({
        queryKey: ["users"],
        queryFn: ChatService.getAllConversations,
        staleTime: 60 * 1000 * 10,
        select: (data) => data.data,
    });

    useEffect(() => {
        if (isSuccess) {
            setChats(users);
        }
    }, [isSuccess, users]);

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    if (isError) {
        return <div>Error occurred while fetching data.</div>;
    }

    return users?.map((user: IUser) => (
        <ChatListItem key={user?.id} user={user} />
    ));
};

export default ChatList;
