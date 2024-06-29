"use client";

import Image from "next/image";
import SidebarHeader from "../SidebarHeader";
import { ScreenTypes } from "../sidedbar-left/Sidebar";
import SidebarBackBtn from "../sidedbar-left/SidebarBackBtn";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ImagePlus } from "lucide-react";
import { useProfile } from "@/hooks/useQueryUser";

const ProfileScreen = ({ setScreen }: { setScreen: any }) => {
    const { data } = useProfile();

    const [name, setName] = useState(data?.name);
    const [image, setImage] = useState<string | any>(data?.avatarUrl);

    const onImageChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    return (
        <>
            <SidebarHeader className="flex bg-background">
                <SidebarBackBtn
                    onClick={() => setScreen(ScreenTypes.Settings)}
                />
                <span className="select-none font-medium text-[20px] pl-6">
                    Изменить профиль
                </span>
            </SidebarHeader>

            <div className="flex flex-col gap-5 bg-background h-fit py-2 px-2 shadow-sm">
                <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden mx-auto mt-4 mb-8">
                    <Input
                        placeholder="Picture"
                        className="absolute z-20 bg-transparent w-full h-full cursor-pointer opacity-0"
                        onChange={onImageChange}
                        type="file"
                        accept="image/*, application/pdf"
                    />
                    <div className="w-full h-full bg-black">
                        {data.avatarUrl ? (
                            <>
                                <div className="w-full h-full bg-transparent backdrop-brightness-75">
                                    <ImagePlus
                                        width={"50%"}
                                        height={"50%"}
                                        stroke="#fff"
                                        className="z-10 relative top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                                    />
                                </div>
                                <Image
                                    className="absolute z-0 object-cover w-full h-full"
                                    src={data.avatarUrl}
                                    alt="img"
                                    width={120}
                                    height={50}
                                />
                            </>
                        ) : image ? (
                            <>
                                <Image
                                    className="absolute z-0 object-cover w-full h-full"
                                    src={image}
                                    alt="img"
                                    width={120}
                                    height={50}
                                />
                                <div className="w-full h-full bg-transparent backdrop-brightness-75">
                                    <ImagePlus
                                        width={"50%"}
                                        height={"50%"}
                                        stroke="#fff"
                                        className="z-10 relative top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full bg-black">
                                <ImagePlus
                                    width={"50%"}
                                    height={"50%"}
                                    stroke="#fff"
                                    className="z-10 relative top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-5 my-3 px-3">
                    <Input placeholder="Имя" className="h-[54px] rounded-xl" />
                    <Input
                        placeholder="Фамилия"
                        className="h-[54px] rounded-xl"
                    />
                    <Input
                        placeholder="О себе"
                        className="h-[54px] rounded-xl"
                    />
                </div>
            </div>
            <div className="px-6 mt-2 mb-4 text-[#707579] text-[14px]">
                Любые подробности, например: возраст, род занятий или город.
                Пример: Дизайнер из Санкт-Петербурга, 23 года.
            </div>
            <div className="flex flex-col gap-2 my-3 px-6 py-2 bg-background shadow-sm">
                <span className="text-[rgb(51,144,236)] py-2 font-medium">
                    Имя пользователя
                </span>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Имя пользователя"
                    className="h-[54px] rounded-xl"
                />
            </div>
            <div className="px-6 mt-2 mb-4 text-[#707579] text-[14px]">
                Вы можете выбрать публичное имя пользователя в приложении. В
                этом случае другие люди смогут найти Вас по такому имени и
                связаться.
            </div>
        </>
    );
};

export default ProfileScreen;
