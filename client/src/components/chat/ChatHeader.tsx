"use client";

import Image from "next/image";
import Avatar from "../Avatar";
import Sidebar from "../sidebar/sidebar-right/Sidebar";

const ChatHeader = ({ data }: { data: any }) => {
    console.log(data);
    return (
        <Sidebar data={data}>
            <div className="relative flex flex-row h-14 px-4 min-h-[56px] bg-white border-l border-l-[rgb(226,232,240)] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:content-[' '] before:shadow-[0_1px_5px_-1px_#00000036]">
                <div className="relative flex flex-row items-center py-1 w-full cursor-pointer">
                    <Avatar
                        src={
                            data?.profile?.avatarUrl ||
                            data?.group?.profile.avatarUrl
                        }
                        username={
                            data?.profile?.name ?? data?.group?.profile?.name
                        }
                        className="absolute start-2 w-[42px] h-[42px]"
                    />
                    <p className="pl-[60px]">
                        {data?.profile?.name ?? data?.group?.profile?.name}
                    </p>
                </div>
            </div>
        </Sidebar>
    );
};

export default ChatHeader;
