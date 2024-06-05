"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/zodSchemas";
import AuthService from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import useChatStore from "@/store/useChatStore";

const page = () => {
    const { setUserInfo } = useChatStore();
    const { replace } = useRouter();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const { mutate: loginUser } = useMutation({
        mutationFn: ({ username, password }: z.infer<typeof loginSchema>) =>
            AuthService.login(username, password),
        onSuccess: ({ data }) => {
            setUserInfo(data.userInfo);
            replace("/dashboard");
        },
    });

    const onLoginHandler = async ({
        username,
        password,
    }: z.infer<typeof loginSchema>) => {
        loginUser({ username, password });
    };

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen p-5">
            <div className="w-full max-w-[400px]">
                <Image
                    width={160}
                    height={160}
                    src="./messenger.svg"
                    alt="logo"
                    className="mx-auto mb-6"
                />

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onLoginHandler)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" size="primary" variant="primary">
                            Sign in
                        </Button>
                    </form>
                </Form>

                <p className="text-center py-5">
                    Ещё нет аккаунта?{" "}
                    <Link href="/register" className="text-blue-600 underline">
                        Зарегистрируйтесь
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default page;
