import { IUser } from "@/types/user.types";
import ChatListItem from "@/components/sidebar/ChatListItem";
import useChatStore from "@/store/useChatStore";
import { useEffect } from "react";
import { useAllChats } from "@/hooks/useQueryChat";

const ChatList = () => {
    const { setChats } = useChatStore();
    const { data: users, isLoading, isError, isSuccess } = useAllChats();

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

    if (!users.length) {
        return (
            <p className="w-fit mx-auto py-1 px-2 text-center bg-[rgba(51,144,236,1)] text-white rounded-xl">
                Диалогов пока нет...
            </p>
        );
    }

    return users?.map((user: IUser) => (
        <ChatListItem key={user?.id} data={user} />
    ));
};

export default ChatList;
