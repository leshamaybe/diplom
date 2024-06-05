"use client";

import { useEffect, useState } from "react";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import ChatMessages from "@/components/chat/ChatMessages";
import useSocketStore from "@/store/useSocketStore";
import { useConversation } from "@/hooks/useConversation";
import useChatStore from "@/store/useChatStore";

const messagesMock = [
    {
        id: 1,
        content: "Привет!",
        author: "me",
        time: "10:40",
    },
    {
        id: 2,
        content: "Привет!",
        author: "other",
        time: "10:41",
    },
];

const page = ({ params }: { params: { id: string } }) => {
    const [messages, setMessages] = useState(messagesMock);

    const currentUserId = parseInt(params.id);

    const { socket } = useSocketStore();
    // const { currentChat } = useChatStore();

    const { data: conversation, isLoading } = useConversation(currentUserId);

    useEffect(() => {
        if (!socket || !conversation) return;

        if (conversation) {
            socket.emit("join_chat", conversation?.roomName);

            socket.on("receive_message", (data) => {
                console.log(data);
                setMessages((state) => [...state, data]);
            });
        }

        return () => {
            socket.emit("leave_chat", conversation?.roomName);

            socket.off("receive_message");
        };
    }, [socket, conversation]);

    // if (isLoading) return <></>;

    return (
        <main className="relative grow flex flex-col">
            <ChatHeader />
            <ChatMessages messages={messages} />
            <ChatInput />
        </main>
    );
};

export default page;
