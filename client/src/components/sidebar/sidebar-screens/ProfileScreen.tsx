"use client";

import Image from "next/image";
import SidebarHeader from "../SidebarHeader";
import { ScreenTypes } from "../sidedbar-left/Sidebar";
import SidebarBackBtn from "../sidedbar-left/SidebarBackBtn";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { ImagePlus } from "lucide-react";
import { useProfile } from "@/hooks/useQueryUser";
import { useForm } from "react-hook-form";
import { profileSchema } from "@/lib/zodSchemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UserService from "@/services/userService";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { convert2base64, dirtyValues } from "@/lib/utils";
import { toast } from "sonner";
import dayjs from "dayjs";

const ProfileScreen = ({ setScreen }: { setScreen: any }) => {
    const { data } = useProfile();

    const [imagePreview, setImagePreview] = useState(data?.avatarUrl);
    const [image, setImage] = useState<any>(data?.avatarUrl);

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: data?.firstName || "",
            lastName: data?.lastName || "",
            bio: data?.bio,
            phone: data?.phone,
            name: data?.name,
            avatarUrl: data?.avatarUrl,
        },
    });

    const { dirtyFields, isDirty, isSubmitSuccessful } =
        form.formState;

    useEffect(() => {
        if (isSubmitSuccessful) {
            toast("Данные обновлены", {
                description: dayjs().format("DD/MM/YYYY HH:mm"),
            });
        }
    }, [isSubmitSuccessful]);

    const onImageChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImagePreview(URL.createObjectURL(file));
            convert2base64(file, setImage);
            form.setValue("avatarUrl", file, { shouldDirty: true });
        }
    };

    const profileHandler = async (formData: z.infer<typeof profileSchema>) => {
        const data = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            bio: formData.bio,
            phone: formData.phone,
            name: formData.name,
            avatarUrl: image,
        };

        const res = await UserService.changeProfile(
            dirtyValues(dirtyFields, data)
        );

        console.log(res);
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

            <Form {...form}>
                <form onSubmit={form.handleSubmit(profileHandler)}>
                    <div className="flex flex-col gap-5 bg-background h-fit py-2 px-2 shadow-sm">
                        <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden mx-auto mt-4 mb-8">
                            <FormField
                                control={form.control}
                                name="avatarUrl"
                                render={({
                                    field: { value, onChange, ...field },
                                }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Picture"
                                                className="absolute z-20 bg-transparent w-full h-full cursor-pointer opacity-0"
                                                onChange={(event) =>
                                                    onImageChange(event)
                                                }
                                                type="file"
                                                accept="image/*, application/pdf"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="w-full h-full bg-black">
                                {imagePreview ? (
                                    <>
                                        <Image
                                            className="absolute z-0 object-cover w-full h-full"
                                            src={imagePreview}
                                            alt="img"
                                            width={120}
                                            height={50}
                                        />
                                        <div className="w-full h-full bg-transparent backdrop-brightness-75">
                                            <ImagePlus
                                                width="50%"
                                                height="50%"
                                                stroke="#fff"
                                                className="z-10 relative top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-full bg-black">
                                        <ImagePlus
                                            width="50%"
                                            height="50%"
                                            stroke="#fff"
                                            className="z-10 relative top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-5 my-3 px-3">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className="h-[54px] rounded-xl"
                                                placeholder="Имя"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className="h-[54px] rounded-xl"
                                                placeholder="Фамилия"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className="h-[54px] rounded-xl"
                                                placeholder="О себе"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className="h-[54px] rounded-xl"
                                                placeholder="Телефон"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="px-6 mt-2 mb-4 text-[#707579] text-[14px]">
                        Любые подробности, например: возраст, род занятий или
                        город. Пример: Дизайнер из Санкт-Петербурга, 23 года.
                    </div>
                    <div className="flex flex-col gap-2 my-3 px-6 py-2 bg-background shadow-sm">
                        <span className="text-[rgb(51,144,236)] py-2 font-medium">
                            Имя пользователя
                        </span>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className="h-[54px] rounded-xl"
                                            placeholder="Имя пользователя"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="px-6 mt-2 mb-4 text-[#707579] text-[14px]">
                        Вы можете выбрать публичное имя пользователя в
                        приложении. В этом случае другие люди смогут найти Вас
                        по такому имени и связаться.
                    </div>
                    <Button disabled={!isDirty} className="w-full my-2">
                        Submit
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default ProfileScreen;
