import { cn } from "@/lib/utils";
import ChatService from "@/services/chatService";
import { useMutation } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

const ReactionButton = ({
    message,
    setReactions,
    hovered,
}: {
    message: any;
    setReactions: any;
    hovered: boolean;
}) => {
    const params = useParams();
    const { id } = params;
    const [hasReactions, setHasReactions] = useState(
        !!message?.reactions?.length
    );

    const isOwnMessage = message?.sender_id !== Number(id);
    const mid = message?.id;

    const { mutate: reactOnMessage } = useMutation({
        mutationFn: (mid: number) => ChatService.reactOnMessage(mid),
        onSuccess: (_) => {
            setReactions((prev: any) => [...prev, _.data]);
            setHasReactions(true);
        },
    });

    if (hasReactions) return;

    return (
        <span
            onClick={() => reactOnMessage(mid)}
            className={cn(
                "absolute bg-background rounded-full p-1 hidden cursor-pointer",
                {
                    block: hovered,
                    "-right-5": !isOwnMessage,
                    "-left-5": isOwnMessage,
                }
            )}
        >
            <Heart fill="#FD2523" color="#FD2523" width={18} height={18} />
        </span>
    );
};

export default ReactionButton;
