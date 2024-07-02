import React from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
    SheetTitle,
    SheetClose,
} from "@/components/ui/sheet";
import Avatar from "@/components/Avatar";
import { AtSign, CircleAlert, Pencil } from "lucide-react";
import Link from "next/link";
import { useProfile } from "@/hooks/useQueryUser";
import { X } from "lucide-react";

const Sidebar = ({
    children,
    data,
}: {
    children: React.ReactNode;
    data: any;
}) => {
    const { data: me } = useProfile();

    const isGroup = data?.isGroup;
    const isAdmin = (id: any) => isGroup && data?.group?.createdBy.id === id;
    const meAdmin = isGroup && data?.group?.createdBy.id === me?.user_id;

    return (
        <Sheet modal={false}>
            <SheetTrigger>{children}</SheetTrigger>
            <SheetContent className="min-w-[420px] p-0 bg-[#F4F4F5]">
                <SheetHeader className="p-6 pt-3 mb-5 bg-background shadow-sm">
                    <div className="flex flex-row gap-6 items-center">
                        <SheetClose>
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </SheetClose>
                        <SheetTitle>
                            {isGroup ? "Информация о группе" : "Информация"}
                        </SheetTitle>
                        {meAdmin && (
                            <button className="ml-auto rounded-full hover:bg-[rgba(112,117,121,0.08)] transition-all duration-200 p-2">
                                <Pencil
                                    width={20}
                                    height={20}
                                    stroke="rgb(112, 117, 121)"
                                />
                            </button>
                        )}
                    </div>

                    <div className="h-full pt-2 overflow-y-auto overflow-x-hidden relative">
                        <div className="pb-8">
                            <Avatar
                                src={
                                    data?.profile?.avatarUrl ??
                                    data?.group?.profile?.avatarUrl
                                }
                                className="mx-auto w-[120px] h-[120px]"
                            />
                            <p className="text-center text-[20px] font-medium mt-4 select-none">
                                {data?.profile?.displayName ??
                                    data?.group?.profile?.name}
                            </p>
                        </div>

                        <div className="flex flex-col">
                            <div className="relative flex flex-col pl-[50px] py-2">
                                <AtSign className="absolute start-2 top-1/2 -translate-y-1/2" />
                                <span>
                                    {data?.profile?.displayName ??
                                        data?.group?.profile?.name}
                                </span>
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
                <div className="bg-[#F4F4F5] w-full h-full">
                    {data?.isGroup ? (
                        <div className="bg-background shadow-sm p-2">
                            {data?.users?.map((item: any) => {
                                return (
                                    <Link
                                        href={`/dashboard/${item?.user.id}`}
                                        key={item?.user.id}
                                        className="relative flex flex-row gap-2 items-center min-h-16 hover:bg-[rgba(112,117,121,0.08)] duration-100 rounded-lg"
                                    >
                                        <Avatar
                                            src={item?.user?.profile.avatarUrl}
                                            className="absolute w-[42px] h-[42px]"
                                            username={item?.user?.profile?.name}
                                        />
                                        <div className="flex flex-row justify-between w-full font-normal text-base pl-[60px] pr-7">
                                            <span>
                                                {item?.user?.profile?.name}
                                            </span>

                                            <span className="text-[12px] font-normal text-[rgb(170,170,170)]">
                                                {isAdmin(item.user.id)
                                                    ? "владелец"
                                                    : me?.user_id
                                                    ? "вы"
                                                    : ""}
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default Sidebar;
