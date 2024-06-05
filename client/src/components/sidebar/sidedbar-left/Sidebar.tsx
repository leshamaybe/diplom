"use client";

import { Input } from "@/components/ui/input";
import SidebarTools from "./SidebarTools";
import ChatList from "../../ChatList";
import Separator from "@/components/Separator";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import SearchList from "../search/searchList";
import SidebarBackBtn from "./SidebarBackBtn";

const Sidebar = () => {
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    return (
        <div className="flex flex-col w-[420px] min-h-screen h-full bg-background z-10">
            <div className="flex flex-row items-center px-4 min-h-[3.5rem]">
                {isSearchActive ? (
                    <SidebarBackBtn handler={() => setIsSearchActive(false)} />
                ) : (
                    <SidebarTools isSearchActive={isSearchActive} />
                )}
                <Input
                    onClick={() => setIsSearchActive(true)}
                    className="w-full rounded-3xl ml-2"
                    type="search"
                    placeholder="Поиск"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Separator />
            <div className="h-full pt-2 overflow-y-auto overflow-x-hidden relative">
                <div
                    className={cn("block px-2", {
                        hidden: isSearchActive,
                    })}
                >
                    <ChatList />
                </div>
                <div
                    className={cn("hidden w-full px-2", {
                        "block animate-zoom-fade absolute": isSearchActive,
                    })}
                >
                    <SearchList searchTerm={debouncedSearchTerm} />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
