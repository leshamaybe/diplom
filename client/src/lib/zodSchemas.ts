import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().min(2).max(20),
    password: z.string().min(6).max(15),
});

export const regSchema = z.object({
    username: z
        .string()
        .min(2, { message: "Никнейм должна содержать не менее 2 символов." })
        .max(20),
    password: z
        .string()
        .min(6, { message: "Пароль должен содержать не менее 6 символов." })
        .max(15),
    email: z.string().email("Это недействительный email."),
});
