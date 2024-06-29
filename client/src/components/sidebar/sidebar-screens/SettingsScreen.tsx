"use client";

import { AtSign, EllipsisVertical, Pencil, Phone } from "lucide-react";
import SidebarHeader from "../SidebarHeader";
import { ScreenTypes } from "../sidedbar-left/Sidebar";
import SidebarBackBtn from "../sidedbar-left/SidebarBackBtn";
import Avatar from "@/components/Avatar";
import { useProfile } from "@/hooks/useQueryUser";

const SettingsScreen = ({ setScreen }: { setScreen: any }) => {
    const { data } = useProfile();

    return (
        <>
            <SidebarHeader className="flex bg-background">
                <SidebarBackBtn onClick={() => setScreen(ScreenTypes.Main)} />
                <span className="select-none font-medium text-[20px] pl-6">
                    Настройки
                </span>
                <div className="flex flex-row grow gap-5 justify-end">
                    <button
                        onClick={() => setScreen(ScreenTypes.Profile)}
                        className="rounded-full hover:bg-[rgba(112,117,121,0.08)] transition-all duration-200 p-2"
                    >
                        <Pencil
                            width={20}
                            height={20}
                            stroke="rgb(112, 117, 121)"
                        />
                    </button>
                    <button className="rounded-full hover:bg-[rgba(112,117,121,0.08)] transition-all duration-200 p-2">
                        <EllipsisVertical
                            width={20}
                            height={20}
                            stroke="rgb(112, 117, 121)"
                        />
                    </button>
                </div>
            </SidebarHeader>
            <div className="bg-background">
                <div className="h-full pt-2 overflow-y-auto overflow-x-hidden relative">
                    <div className="pb-6">
                        <Avatar className="start-0 mx-auto w-[120px] h-[120px] mb-3" />
                        <span className="block text-center text-[20px] font-medium">
                            {data?.displayName}
                        </span>
                    </div>

                    <div className="mx-2 mb-3 py-2">
                        <button className="relative flex flex-col pl-[50px] py-2 w-full hover:bg-[rgba(112,117,121,0.08)] rounded-lg">
                            <Phone className="absolute start-2 top-1/2 -translate-y-1/2" />
                            <span>{data?.phone}</span>
                            <span className="text-[#707579] text-[14px]">
                                Телефон
                            </span>
                        </button>
                        <button className="relative flex flex-col pl-[50px] py-2 w-full hover:bg-[rgba(112,117,121,0.08)] rounded-lg">
                            <AtSign className="absolute start-2 top-1/2 -translate-y-1/2" />
                            <span>{data?.name}</span>
                            <span className="text-[#707579] text-[14px]">
                                Имя пользователя
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingsScreen;
