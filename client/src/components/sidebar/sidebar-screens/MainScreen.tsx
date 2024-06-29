"use client";

import { Input } from "@/components/ui/input";
import ChatList from "../ChatList";
import Separator from "@/components/Separator";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import SearchList from "../search/searchList";
import SidebarHeader from "../SidebarHeader";
import SidebarBackBtn from "../sidedbar-left/SidebarBackBtn";
import SidebarTools from "../sidedbar-left/SidebarTools";
import { Pencil } from "lucide-react";
import FunctionalMenu from "@/components/FunctionalMenu";
import { Button } from "@/components/ui/button";

const MainScreen = ({ setScreen }: { setScreen: any }) => {
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    return (
        <>
            <SidebarHeader className="bg-background">
                {isSearchActive ? (
                    <SidebarBackBtn onClick={() => setIsSearchActive(false)} />
                ) : (
                    <SidebarTools
                        setScreen={setScreen}
                        isSearchActive={isSearchActive}
                    />
                )}
                <Input
                    onClick={() => setIsSearchActive(true)}
                    className="w-full rounded-3xl ml-2"
                    type="search"
                    placeholder="Поиск"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </SidebarHeader>
            <Separator />
            <div className="h-full pt-2 overflow-y-auto overflow-x-hidden relative bg-background">
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

            <FunctionalMenu setScreen={setScreen}>
                <Button
                    variant={"primary"}
                    className="absolute bottom-5 right-5 rounded-full w-[54px] h-[54px]"
                >
                    <Pencil
                        color="rgb(51,144,236)"
                        fill="#fff"
                        strokeWidth={1}
                    />
                </Button>
            </FunctionalMenu>
        </>
    );
};

export default MainScreen;
