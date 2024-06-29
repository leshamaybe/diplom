"use client";

import Separator from "@/components/Separator";
import { ArrowRight } from "lucide-react";
import SidebarHeader from "../../SidebarHeader";
import { ScreenTypes } from "../../sidedbar-left/Sidebar";
import SidebarBackBtn from "../../sidedbar-left/SidebarBackBtn";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import useSidebarStore from "@/store/useGroupStore";
import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { useCreateGroup } from "@/hooks/useQueryChat";

const SecondScreen = ({ setScreen }: { setScreen: any }) => {
    const [image, setImage] = useState<string | null>(null);
    const [groupName, setGroupName] = useState<string>("");

    const { selectedUsers, reset } = useSidebarStore();

    const { createGroup } = useCreateGroup();

    const onImageChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleCreateGroup = () => {
        createGroup({ name: groupName, users: selectedUsers });
    };

    const usersCount =
        selectedUsers.length === 1
            ? `${selectedUsers.length} участник`
            : selectedUsers.length > 1
            ? `${selectedUsers.length} участника`
            : `${selectedUsers.length} участников`;

    return (
        <>
            <SidebarHeader className="bg-background">
                <SidebarBackBtn
                    onClick={() => {
                        setScreen(ScreenTypes.Main);
                        reset();
                    }}
                />
                <span className="select-none font-medium text-[20px] pl-6">
                    Создать группу
                </span>
            </SidebarHeader>
            <Separator />
            <div>
                <div className="flex flex-col gap-6 py-4 px-2 bg-background mb-4 shadow-sm">
                    <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden mx-auto">
                        <Input
                            placeholder="Picture"
                            className="absolute z-10 bg-transparent w-full h-full cursor-pointer opacity-0"
                            onChange={onImageChange}
                            type="file"
                            accept="image/*, application/pdf"
                        />
                        {image ? (
                            <Image
                                className="absolute z-0 object-cover w-full h-full"
                                src={image}
                                alt="img"
                                width={120}
                                height={50}
                            />
                        ) : (
                            <span className="block w-full h-full bg-black"></span>
                        )}
                    </div>
                    <div className="grid w-full items-center gap-1.5 px-3">
                        <Label htmlFor="groupName">Название группы</Label>
                        <Input
                            onChange={(e) => setGroupName(e.target.value)}
                            type="text"
                            id="groupName"
                            value={groupName}
                        />
                    </div>
                </div>

                {selectedUsers && (
                    <div className="px-4 py-2 mb-3 bg-background shadow-sm">
                        <span className="block py-2 px-2 text-[rgb(51,144,236)]">
                            {usersCount}
                        </span>
                        <div className="flex flex-col">
                            {selectedUsers.map((user: any) => (
                                <div
                                    key={user.profile.id}
                                    className="relative flex flex-row gap-2 items-center min-h-16 hover:bg-[rgba(112,117,121,0.08)] rounded-lg"
                                >
                                    <Avatar
                                        className="absolute w-[42px] h-[42px]"
                                        username={user.profile.name}
                                    />
                                    <div className="w-full font-normal text-base pl-[60px]">
                                        {user.profile.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Button
                onClick={handleCreateGroup}
                variant="primary"
                className="absolute bottom-5 right-5 rounded-full w-[54px] h-[54px]"
            >
                <ArrowRight strokeWidth={2} />
            </Button>
        </>
    );
};

export default SecondScreen;
