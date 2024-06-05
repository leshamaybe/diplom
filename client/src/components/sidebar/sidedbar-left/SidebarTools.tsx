"use client";

import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import AuthService from "@/services/authService";

const SidebarTools = ({ isSearchActive }: { isSearchActive: boolean }) => {
    const { replace } = useRouter();

    const handleLogout = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
      
        await AuthService.logout();

        replace("/login");
    };

    return (
        <>
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
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-red-500"
                        asChild
                    >
                        <button>Выйти</button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default SidebarTools;
