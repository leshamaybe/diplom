import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import tokenService from "./token.service.js";
import { ApiError } from "../utils/api-errors.js";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

class AuthService {
    async registration(username, password, email) {
        const candidate = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        if (candidate)
            throw ApiError.BadRequestError("Такой пользователь существует");

        const encryptedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                username: username,
                password: encryptedPassword,
                email: email,
                settings: {
                    create: {
                        theme: "light",
                        timeFormat: "24h",
                        messageTextSize: "16",
                        autoLoadFileMaxSizeMb: "5",
                        themes: {
                            dark: {
                                patternColor: "#0A0A0A8C",
                            },
                            light: {
                                patternColor: "#4A8E3A8C",
                            },
                        },
                    },
                },
            },
        });

        return { message: `Пользователь ${username} успешно зарегистрирован!` };
    }

    async login(username, password) {
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
            include: {
                settings: true,
            },
        });

        if (!user)
            throw ApiError.BadRequestError(
                `Пользователь ${username} не найден.`
            );

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) throw ApiError.BadRequestError("Неверный пароль");

        const tokens = await tokenService.createTokens({
            userId: user.id,
            username: user.username,
        });

        await tokenService.saveTokenToDatabase(user.id, tokens.refreshToken);

        return {
            ...tokens,
            data: {
                userInfo: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
                settings: user.settings,
            },
        };
    }

    async refresh(token) {
        if (!token) throw ApiError.UnauthorizedError();

        const { username } = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        const tokens = await tokenService.createTokens({
            userId: user.id,
            username: user.username,
        });

        await tokenService.updateTokenInDatabase(user.id, tokens.refreshToken);

        return {
            ...tokens,
            data: {
                userInfo: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
                settings: user.settings,
            },
        };
    }

    async logout(token) {
        if (!token) {
            throw ApiError.UnauthorizedError();
        }

        await tokenService.removeTokenFromDatabase(token);
    }
}

export default new AuthService();
