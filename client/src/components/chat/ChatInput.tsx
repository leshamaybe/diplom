import { useState, KeyboardEvent } from "react";
import Image from "next/image";
import useSocketStore from "@/store/useSocketStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IUser } from "@/types/user.types";
import useChatStore from "@/store/useChatStore";

const ChatInput = () => {
    const [message, setMessage] = useState("");
    const { socket } = useSocketStore();
    const { currentChat, userInfo } = useChatStore();

    const handleSendMessage = () => {
        socket?.emit("send_message", {
            conversationId: currentChat?.id,
            senderId: userInfo?.id,
            content: message,
            to: currentChat?.roomName,
        });

        setMessage("");
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (
            e.key === "Enter" &&
            e.altKey !== true &&
            e.shiftKey !== true &&
            e.ctrlKey !== true
        ) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex items-center justify-self-end px-3 pb-5">
            <Input
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message"
                className="h-[54px] ring-0 mr-2 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
                onClick={handleSendMessage}
                className="w-[54px] h-[54px] min-w-[54px] p-2 rounded-full"
            >
                <Image src="/send.svg" width={24} height={24} alt="send" />
            </Button>
        </div>
    );
};

export default ChatInput;
