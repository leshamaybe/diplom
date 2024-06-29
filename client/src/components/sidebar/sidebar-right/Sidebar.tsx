import React from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import Avatar from "@/components/Avatar";
import { AtSign, CircleAlert } from "lucide-react";

const Sidebar = ({
    children,
    profile,
}: {
    children: React.ReactNode;
    profile: any;
}) => {
    return (
        <Sheet modal={false}>
            <SheetTrigger>{children}</SheetTrigger>
            <SheetContent className="min-w-[420px] p-0">
                <SheetHeader className="p-6">
                    <SheetTitle>Информация</SheetTitle>
                    <SheetDescription></SheetDescription>

                    <div className="h-full pt-2 overflow-y-auto overflow-x-hidden relative">
                        <div className="pb-8">
                            <Avatar className="mx-auto w-[120px] h-[120px]" />
                            <p className="text-center text-[20px] font-medium mt-4 select-none">
                                {profile?.displayName}
                            </p>
                        </div>

                        <div className="flex flex-col">
                            <div className="relative flex flex-col pl-[50px] py-2">
                                <AtSign className="absolute start-2 top-1/2 -translate-y-1/2" />
                                <span>{profile?.displayName}</span>
                                <span className="text-[#707579] text-[14px]">
                                    Имя пользователя
                                </span>
                            </div>
                            <div className="relative flex flex-col pl-[50px] py-2">
                                <CircleAlert className="absolute start-2 top-1/2 -translate-y-1/2" />
                                <span>
                                    {"Дизайнер из Санкт-Петербурга, 23 года"}
                                </span>
                                <span className="text-[#707579] text-[14px]">
                                    О себе
                                </span>
                            </div>
                        </div>
                    </div>
                </SheetHeader>
                <div className="bg-[#F4F4F5] w-full h-full"></div>
            </SheetContent>
        </Sheet>
    );
};

export default Sidebar;
