import React from "react";
import { Megaphone, Users } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScreenTypes } from "./sidebar/sidedbar-left/Sidebar";

const FunctionalMenu = ({
    children,
    setScreen,
}: {
    children: React.ReactNode;
    setScreen?: any;
}) => {
    const handleSetScreen = (screen: ScreenTypes) => {
        setScreen(screen);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="focus-visible:ring-offset-0 focus-visible:ring-0"
                asChild
            >
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => handleSetScreen(ScreenTypes.CreateChannel)}
                    className="pl-10  py-2"
                >
                    <Megaphone className="absolute start-2 top-1/2 -translate-y-1/2" />
                    Создать канал
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() =>
                        handleSetScreen(ScreenTypes.CreateGroupFirst)
                    }
                    className="pl-10 py-2 "
                >
                    <Users className="absolute start-2 top-1/2 -translate-y-1/2" />
                    Создать группу
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default FunctionalMenu;
