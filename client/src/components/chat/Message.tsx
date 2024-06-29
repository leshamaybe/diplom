import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { IMessage } from "@/types/chat.types";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Trash, Pencil, Copy, Pin } from "lucide-react";
import Reactions from "./Reactions/index";

const Message = ({
    message,
    handler,
    ...props
}: {
    message: IMessage;
    handler: any;
}) => {
    const params = useParams();
    const { id } = params;

    const [hovered, setHovered] = useState(false);

    const handleDelete = async () => {
        handler(message.id);
    };

    const isOwnMessage = message.sender_id !== Number(id);

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div
                    data-mid={message.id}
                    data-peer-id={message.sender_id}
                    className={cn("flex items-end mb-2", {
                        "flex-row-reverse": isOwnMessage,
                    })}
                    {...props}
                >
                    <div
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        className={cn(
                            "relative flex flex-col rounded-[15px] rounded-bl-none bg-white py-1 px-2 max-w-[480px]",
                            {
                                "bg-[rgb(227,254,224)] rounded-bl-[15px] rounded-br-none":
                                    isOwnMessage,
                            }
                        )}
                    >
                        <div>
                            {message.content}

                            <span
                                className={cn(
                                    `self-end text-black text-[12px] ml-[5px]`
                                )}
                            >
                                {dayjs(message.createdAt).format("HH:mm")}
                            </span>
                        </div>
                        <Reactions hovered={hovered} message={message} />
                    </div>
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-[190px] bg-[rgba(255,255,255,0.85)] rounded-[10px] backdrop-blur-md">
                <ContextMenuItem className="flex items-center gap-1 py-1 px-3 mx-1">
                    <Pin size={20} className="mr-4" />
                    Закрепить
                </ContextMenuItem>
                <ContextMenuItem className="flex items-center gap-1 py-1 px-3 mx-1">
                    <Copy size={20} className="mr-4" />
                    Копировать
                </ContextMenuItem>
                <ContextMenuItem className="flex items-center gap-1 py-1 px-3 mx-1">
                    <Pencil size={20} className="mr-4" />
                    Изменить
                </ContextMenuItem>
                <ContextMenuItem
                    onClick={handleDelete}
                    className="flex items-center gap-1 py-1 px-3 mx-1 text-[#FF595A] hover:bg-[rgba(223,65,66,0.1)]"
                >
                    <Trash size={20} className="mr-4" />
                    Удалить
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};
export default Message;
