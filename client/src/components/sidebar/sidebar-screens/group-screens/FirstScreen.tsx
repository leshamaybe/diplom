import SidebarBackBtn from "../../sidedbar-left/SidebarBackBtn";
import SidebarHeader from "../../SidebarHeader";
import { ScreenTypes } from "../../sidedbar-left/Sidebar";
import { Checkbox } from "@/components/ui/checkbox";
import { useAllChats } from "@/hooks/useQueryChat";
import { useState } from "react";
import { IUser } from "@/types/user.types";
import { cn } from "@/lib/utils";
import Avatar from "@/components/Avatar";
import { Label } from "@/components/ui/label";
import Separator from "@/components/Separator";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useSidebarStore from "@/store/useGroupStore";

const FirstScreen = ({ setScreen }: { setScreen: any }) => {
    const { data: users } = useAllChats();
    const { selectedUsers, addUser, removeUser } = useSidebarStore();

    const handleSelectUser = (user: any) => {
        const selectedUser = selectedUsers.find((u: any) => u.id === user.id);
        if (user.checked && !selectedUser) {
            addUser(user);
        } else {
            removeUser(user.id);
        }
    };

    const handleSetScreen = (screen: ScreenTypes) => {
        setScreen(screen);
    };

    return (
        <>
            <SidebarHeader className="bg-background mb-4 shadow-sm">
                <SidebarBackBtn onClick={() => setScreen(ScreenTypes.Main)} />
                <span className="select-none font-medium text-[20px] pl-6">
                    Добавить участников
                </span>
            </SidebarHeader>
            <Separator />
            <div className="px-2 py-4 bg-background shadow-sm">
                {users.map((user: IUser) => {
                    if (!user?.isGroup) {
                        return (
                            <div
                                key={user?.profile.id}
                                className="flex flex-row gap-2 items-center hover:bg-[rgba(112,117,121,0.08)] rounded-lg px-4"
                            >
                                <Checkbox
                                    onCheckedChange={(checked) =>
                                        handleSelectUser({ ...user, checked })
                                    }
                                    className="border-[rgba(112,117,121,0.5)]"
                                    id={`terms${user.profile.id}`}
                                />
                                <Label
                                    htmlFor={`terms${user.profile.id}`}
                                    className={cn(
                                        "relative flex flex-col justify-center w-full min-h-16 pl-[70px]"
                                    )}
                                >
                                    <Avatar
                                        className="absolute w-[42px] h-[42px]"
                                        username={user.profile.name}
                                    />
                                    <div className="flex justify-between w-full font-normal text-base">
                                        {user.profile.name}
                                    </div>
                                </Label>
                            </div>
                        );
                    }
                })}
            </div>

            <Button
                onClick={() => handleSetScreen(ScreenTypes.CreateGroupSecond)}
                variant={"primary"}
                className="absolute bottom-5 right-5 rounded-full w-[54px] h-[54px]"
            >
                <ArrowRight strokeWidth={2} />
            </Button>
        </>
    );
};

export default FirstScreen;
