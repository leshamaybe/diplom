import Message from "./Message";
import { IMessage } from "@/types/chat.types";
import ChatService from "@/services/chatService";
import { useMutation } from "@tanstack/react-query";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ChatMessages = ({
    messages,
    setState,
}: {
    messages: IMessage[];
    setState: any;
}) => {
    const { mutate: deleteMessage } = useMutation({
        mutationFn: (id: number) => ChatService.deleteMessage(id),
        onSuccess: (_, variables) => {
            console.log(variables);
            setState((state: any) => {
                return state.filter((msg: any) => msg.id !== variables);
            });
        },
    });

    return (
        <div className="flex grow flex-col-reverse relative overflow-y-scroll overflow-x-hidden h-auto will-change-scroll scrollbar-hide">
            <div className="grow self-end max-w-[704px] w-full mx-auto px-3 pt-10">
                {messages.length ? (
                    <TransitionGroup className="flex flex-col justify-end w-full h-full">
                        {messages.map((message) => (
                            <CSSTransition
                                in
                                key={message.id}
                                timeout={200}
                                classNames={{
                                    exit: "transition-opacity duration-200 opacity-0",
                                    exitActive:
                                        "transition-opacity duration-200 opacity-0",
                                }}
                            >
                                <Message
                                    handler={deleteMessage}
                                    key={message.id}
                                    message={message}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
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
        </div>
    );
};

export default ChatMessages;
