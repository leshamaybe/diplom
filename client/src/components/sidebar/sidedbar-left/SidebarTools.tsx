"use client";

import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import AuthService from "@/services/authService";
import { CircleHelp, LogOut, Settings, SquareUserRound } from "lucide-react";
import { ScreenTypes } from "./Sidebar";

const SidebarTools = ({
    isSearchActive,
    setScreen,
}: {
    isSearchActive: boolean;
    setScreen: any;
}) => {
    const { replace } = useRouter();

    const handleLogout = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        await AuthService.logout();

        replace("/login");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={cn(
                    "flex items-center justify-center min-w-[36px] h-[36px] rounded-full hover:bg-gray-100 duration-75 focus-visible:outline-none",
                    { hidden: isSearchActive }
                )}
            >
                <div className="w-[18px] h-[12px] relative">
                    <span className="block absolute top-0 h-[2px] w-full bg-black rounded-[9px]"></span>
                    <span className="block absolute top-1/2 h-[2px] w-full bg-black rounded-[9px]"></span>
                    <span className="block absolute top-full h-[2px] w-full bg-black rounded-[9px]"></span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                {/* <DropdownMenuItem>
                    <SquareUserRound className="start-2 top-1/2 -translate-y-1/2 absolute w-4 h-4" />
                    <button className="pl-[30px]">Профиль</button>
                </DropdownMenuItem> */}
                <DropdownMenuItem
                    onClick={() => setScreen(ScreenTypes.Settings)}
                >
                    <Settings className="start-2 top-1/2 -translate-y-1/2 absolute w-4 h-4" />
                    <button className="pl-[30px]">Настройки</button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <CircleHelp className="start-2 top-1/2 -translate-y-1/2 absolute w-4 h-4" />
                    <button className="pl-[30px]">
                        Возможности приложения
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-500"
                >
                    <LogOut className="start-2 top-1/2 -translate-y-1/2 absolute w-4 h-4" />
                    <button className="pl-[30px]">Выйти</button>
                </DropdownMenuItem>
                <DropdownMenuLabel className="text-center text-[#707579] text-[14px] font-normal">
                    Telegraf 1.0
                </DropdownMenuLabel>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SidebarTools;
