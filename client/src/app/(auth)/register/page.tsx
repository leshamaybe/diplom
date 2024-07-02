"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { regSchema } from "@/lib/zodSchemas";
import AuthService from "@/services/authService";

const page = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof regSchema>>({
        resolver: zodResolver(regSchema),
        defaultValues: {
            username: "",
            password: "",
            email: "",
        },
    });

    async function onSubmit({
        username,
        password,
        email,
    }: z.infer<typeof regSchema>) {
        await AuthService.register(username, password, email);

        router.replace("/login");
    }

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
                        onSubmit={form.handleSubmit(onSubmit)}
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
                                    <FormDescription>
                                        Это ваше отображаемое имя.
                                    </FormDescription>
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
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Минимальная длина - 6.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" size="primary" variant="primary">
                            Sign up
                        </Button>
                    </form>
                </Form>

                <p className="text-center py-5">
                    Уже зарегистрированы?{" "}
                    <Link href="/login" className="text-blue-600 underline">
                        Войдите
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default page;
