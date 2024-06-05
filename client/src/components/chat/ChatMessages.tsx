import useSocketStore from "@/store/useSocketStore";
import MessageItem from "./MessageItem";
import { useEffect, useState } from "react";

const ChatMessages = ({ messages }) => {
    return (
        <div className="flex grow relative">
            {messages ? (
                <div className="grow self-end mx-3">
                    {messages.map((message) => (
                        <MessageItem key={message.time} message={message} />
                    ))}
                </div>
            ) : (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 my-2">
                    <div className="px-auto">
                        <span className="bg-[rgba(91,181,255,0.71)] text-background py-1 px-2 rounded-3xl">
                            Здесь пока ничего нет...
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatMessages;
