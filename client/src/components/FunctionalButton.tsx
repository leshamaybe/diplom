import { Button } from "@/components/ui/button";
import { Megaphone, Users } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ScreenTypes } from "./sidebar/sidedbar-left/Sidebar";

const FunctionalButton = ({
    children,
    setScreen,
}: {
    setScreen?: any;
    children?: React.ReactNode;
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
                <Button
                    variant={"primary"}
                    className="absolute bottom-5 right-5 rounded-full w-[54px] h-[54px]"
                >
                    {children}
                </Button>
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

export default FunctionalButton;
