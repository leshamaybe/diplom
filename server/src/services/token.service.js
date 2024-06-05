import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TokenService {
    async createTokens(userCredentials) {
        const accessToken = jwt.sign(
            userCredentials,
            process.env.JWT_ACCESS_SECRET,
            {
                expiresIn: "1h",
            }
        );
        const refreshToken = jwt.sign(
            userCredentials,
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: "7d",
            }
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    async saveTokenToDatabase(userId, token) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (user) {
            await prisma.token.create({
                data: {
                    userId: userId,
                    refreshToken: token,
                },
            });
        }
    }

    async removeTokenFromDatabase(token) {
        const { username } = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        const deleteToken = await prisma.token.delete({
            where: {
                userId: user.id,
            },
        });

        return deleteToken;
    }

    async updateTokenInDatabase(userId, token) {
        const updateToken = await prisma.token.update({
            where: {
                userId: userId,
            },
            data: {
                refreshToken: token,
            },
        });

        return updateToken;
    }
}

export default new TokenService();
