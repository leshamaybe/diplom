"use client";

import { useEffect, useState } from "react";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import ChatMessages from "@/components/chat/ChatMessages";
import useSocketStore from "@/store/useSocketStore";
import { Button } from "@/components/ui/button";
import { useCreateChat, useGetChat } from "@/hooks/useQueryChat";

const page = ({ params }: { params: { id: string } }) => {
    const [messages, setMessages] = useState<any[]>([]);
    const { socket } = useSocketStore();
    const currentUserId = parseInt(params.id);

    const { createChat } = useCreateChat(currentUserId);

    const {
        data: conversation,
        isError,
        isLoading,
    } = useGetChat(currentUserId);

    useEffect(() => {
        if (!socket || !conversation) return;

        setMessages(conversation.messages);

        socket.emit("joinRoom", conversation?.roomName);

        socket.on("usersInRoom", (data) => {
            console.log(data);
        });

        socket.on("receive_message", (data) => {
            console.log(data);
            setMessages((state) => [...state, data]);
        });

        return () => {
            socket.off("usersInRoom");
            socket.off("receive_message");
        };
    }, [socket, conversation]);

    const handleStartChat = async () => {
        createChat(currentUserId);
    };

    if (isLoading) {
        return (
            <div className="w-full flex items-center justify-center bg-pattern-1">
                <div className="flex-col gap-4 w-full flex items-center justify-center">
                    <div className="w-28 h-28 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full"></div>
                </div>
            </div>
        );
    }

    return (
        <main className="relative grow flex flex-col bg-pattern-1">
            <ChatHeader data={conversation} />

            {isError ? (
                <div className="m-auto">
                    <Button onClick={handleStartChat}>Начать диалог</Button>
                </div>
            ) : (
                <>
                    <ChatMessages setState={setMessages} messages={messages} />
                    <ChatInput />
                </>
            )}
        </main>
    );
};

export default page;
