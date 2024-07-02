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

export const profileSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    bio: z.string().optional(),
    phone: z.string().optional(),
    name: z
        .string()
        .min(4, { message: "Имя должно содержать не менее 4 символов." })
        .optional(),
    avatarUrl: z.any().optional(),
});

export const settingsSchema = z.object({
    messageTextSize: z
        .number()
        .min(10, {
            message: "must be at least 10.",
        })
        .max(30, {
            message: "must be at most 30.",
        })
        .default(16),
    timeFormat: z.string().optional(),
    theme: z.string().optional(),
});
