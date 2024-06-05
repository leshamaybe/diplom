"use client";

import useSidebarStore from "@/store/useSidebarStore";
import useChatStore from "@/store/useChatStore";

const ChatHeader = () => {
    const { setRightColumnShown } = useSidebarStore();
    const { currentChat } = useChatStore();

    return (
        <div className="relative flex flex-row h-14 px-4 bg-white border-l border-l-[rgb(226,232,240)] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:content-[' '] before:shadow-[0_1px_5px_-1px_#00000036]">
            <div
                onClick={setRightColumnShown}
                className="relative flex flex-row items-center py-1 w-full cursor-pointer"
            >
                <div className="flex items-center justify-center w-[42px] h-[42px] text-[20px] rounded-full bg-indigo-300"></div>
                <p className="pl-4">{currentChat?.users[0].username}</p>
            </div>
        </div>
    );
};

export default ChatHeader;
