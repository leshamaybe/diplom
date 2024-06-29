"use client";

import Image from "next/image";
import Avatar from "../Avatar";
import Sidebar from "../sidebar/sidebar-right/Sidebar";

const ChatHeader = ({ profile }: { profile: any }) => {
    return (
        <Sidebar profile={profile}>
            <div className="relative flex flex-row h-14 px-4 min-h-[56px] bg-white border-l border-l-[rgb(226,232,240)] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:content-[' '] before:shadow-[0_1px_5px_-1px_#00000036]">
                <div className="relative flex flex-row items-center py-1 w-full cursor-pointer">
                    <Avatar
                        username={profile?.name}
                        className="absolute start-2 w-[42px] h-[42px]"
                    />
                    {/* <Image
                        src={
                            "https://s3.timeweb.cloud/52788c79-31c01cf7-fdb1-44eb-9942-3680264f6d41/photo_2021-11-18_11-07-42.jpg"
                        }
                        width={42}
                        height={42}
                        alt="avatar"
                    /> */}
                    <p className="pl-[60px]">{profile?.name}</p>
                </div>
            </div>
        </Sidebar>
    );
};

export default ChatHeader;
