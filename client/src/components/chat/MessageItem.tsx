import React from "react";
import { cn } from "@/lib/utils";
import { IMessage } from "@/types/chat.types";

const Message = ({ message, ...props }: IMessage) => {
    const isOwnMessage = message.author === "me";
    const messageClass = isOwnMessage ? "flex flex-row-reverse" : "flex";

    return (
        <div className={cn("flex items-end mb-2", messageClass)} {...props}>
            <div
                className={cn(
                    "flex flex-row rounded-[15px] rounded-bl-none bg-white py-1 px-2 max-w-[480px]",
                    {
                        "bg-[rgb(227,254,224)] rounded-bl-[15px] rounded-br-none":
                            isOwnMessage,
                    }
                )}
            >
                {message.content}

                <span
                    className={cn(`self-end text-black text-[12px] ml-[5px]`)}
                >
                    {message.time}
                </span>
            </div>
        </div>
    );
};
export default Message;
