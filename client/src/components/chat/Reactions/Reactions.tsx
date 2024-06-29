"use client";

import ChatService from "@/services/chatService";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const Reactions = ({
    message,
    reactions,
    setReactions,
}: {
    message: any;
    reactions: any[];
    setReactions: any;
}) => {
    const { mutate: deleteReaction } = useMutation({
        mutationFn: (rid: number) => ChatService.deleteReaction(rid),
        onSuccess: (_, variables) => {
            setReactions((state: any) => {
                return state.filter((r: any) => r.id !== variables);
            });
        },
    });

    return (
        <>
            {reactions?.map((reaction: any) => {
                if (reaction.content === "LIKE") {
                    return (
                        <span
                            onClick={() => deleteReaction(reaction.id)}
                            className="p-1 bg-[rgb(51,144,236)] w-10 h-[30px] text-center rounded-full cursor-pointer"
                            key={reaction.id}
                        >
                            &#128077;
                        </span>
                    );
                }
            })}
        </>
    );
};

export default Reactions;
