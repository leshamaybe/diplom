import { AtSign, EllipsisVertical, Pencil, Phone } from "lucide-react";
import SidebarHeader from "../SidebarHeader";
import { ScreenTypes } from "../sidedbar-left/Sidebar";
import SidebarBackBtn from "../sidedbar-left/SidebarBackBtn";
import Avatar from "@/components/Avatar";
import { useProfile } from "@/hooks/useQueryUser";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsSchema } from "@/lib/zodSchemas";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Separator from "@/components/Separator";
import dayjs from "dayjs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useEffect } from "react";

const themes = [
    {
        id: "dark",
        label: "Тёмная",
    },
    {
        id: "light",
        label: "Светлая",
    },
    {
        id: "default",
        label: "По умолчанию",
    },
] as const;

const times = [
    {
        id: "12h",
        label: "12-часовой",
        format: "hh:mm A",
    },
    {
        id: "24h",
        label: "24-часовой",
        format: "HH:mm",
    },
] as const;

const SettingsScreen = ({ setScreen }: { setScreen: any }) => {
    const { data } = useProfile();

    const form = useForm<z.infer<typeof settingsSchema>>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            messageTextSize: data?.settings.messageTextSize || 16,
            timeFormat: data?.settings?.timeFormat,
            theme: data?.settings?.theme,
        },
        values: {
            messageTextSize: data?.settings.messageTextSize,
            timeFormat: data?.settings.timeFormat,
            theme: data?.settings.theme,
        },
    });

    const { isDirty, isSubmitSuccessful } = form.formState;

    useEffect(() => {
        if (isSubmitSuccessful) {
            toast("Данные обновлены", {
                description: dayjs().format("DD/MM/YYYY HH:mm"),
            });
        }
    }, [isSubmitSuccessful]);

    const settingsHandler = async (
        formData: z.infer<typeof settingsSchema>
    ) => {
        console.log(formData);
    };

    return (
        <>
            <SidebarHeader className="flex bg-background">
                <SidebarBackBtn onClick={() => setScreen(ScreenTypes.Main)} />
                <span className="select-none font-medium text-[20px] pl-6">
                    Настройки
                </span>
                <div className="flex flex-row grow gap-5 justify-end">
                    <button
                        onClick={() => setScreen(ScreenTypes.Profile)}
                        className="rounded-full hover:bg-[rgba(112,117,121,0.08)] transition-all duration-200 p-2"
                    >
                        <Pencil
                            width={20}
                            height={20}
                            stroke="rgb(112, 117, 121)"
                        />
                    </button>
                    <button className="rounded-full hover:bg-[rgba(112,117,121,0.08)] transition-all duration-200 p-2">
                        <EllipsisVertical
                            width={20}
                            height={20}
                            stroke="rgb(112, 117, 121)"
                        />
                    </button>
                </div>
            </SidebarHeader>
            <div className="bg-background mb-4 shadow-sm">
                <div className="h-full pt-2 overflow-y-auto overflow-x-hidden relative">
                    <div className="pb-6">
                        <Avatar
                            src={data?.avatarUrl}
                            className="start-0 mx-auto w-[120px] h-[120px] mb-3"
                        />
                        <span className="block text-center text-[20px] font-medium">
                            {data?.displayName}
                        </span>
                    </div>

                    <div className="mx-2 mb-3 py-2">
                        <button className="relative flex flex-col pl-[50px] py-2 w-full hover:bg-[rgba(112,117,121,0.08)] rounded-lg">
                            <Phone className="absolute start-2 top-1/2 -translate-y-1/2" />
                            <span>{data?.phone}</span>
                            <span className="text-[#707579] text-[14px]">
                                Телефон
                            </span>
                        </button>
                        <button className="relative flex flex-col pl-[50px] py-2 w-full hover:bg-[rgba(112,117,121,0.08)] rounded-lg">
                            <AtSign className="absolute start-2 top-1/2 -translate-y-1/2" />
                            <span>{data?.name}</span>
                            <span className="text-[#707579] text-[14px]">
                                Имя пользователя
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(settingsHandler)}>
                    <div className="flex flex-col gap-5 bg-background h-fit py-2 px-2 shadow-sm">
                        <div className="flex flex-col gap-6 my-3 px-3">
                            <FormField
                                control={form.control}
                                name="messageTextSize"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Размер текста сообщений -{" "}
                                            {field.value}
                                        </FormLabel>
                                        <FormControl>
                                            <Slider
                                                onValueChange={(vals) => {
                                                    field.onChange(vals[0]);
                                                }}
                                                defaultValue={[field.value]}
                                                max={30}
                                                min={10}
                                                step={1}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Separator />

                            <FormField
                                control={form.control}
                                name="theme"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Цветовая тема</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                value={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                {themes.map((item) => {
                                                    return (
                                                        <FormItem
                                                            key={item.id}
                                                            className="flex items-center space-x-3 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <RadioGroupItem
                                                                    value={
                                                                        item.id
                                                                    }
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-medium text-base">
                                                                {item.label}
                                                            </FormLabel>
                                                        </FormItem>
                                                    );
                                                })}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Separator />

                            <FormField
                                control={form.control}
                                name="timeFormat"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Формат времени</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                value={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                {times.map((item) => {
                                                    return (
                                                        <FormItem
                                                            key={item.id}
                                                            className="flex items-center space-x-3 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <RadioGroupItem
                                                                    value={
                                                                        item.id
                                                                    }
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="flex flex-col gap-1 font-normal">
                                                                <span className="font-medium text-base">
                                                                    {item.label}
                                                                </span>
                                                                <span>
                                                                    {dayjs().format(
                                                                        item.format
                                                                    )}
                                                                </span>
                                                            </FormLabel>
                                                        </FormItem>
                                                    );
                                                })}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Button disabled={!isDirty} className="w-full my-2">
                        Submit
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default SettingsScreen;
