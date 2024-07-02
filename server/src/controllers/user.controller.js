import { PrismaClient } from "@prisma/client";
import { ApiError } from "../utils/api-errors.js";
import { excludeField } from "../utils/excludeField.js";
import jwt from "jsonwebtoken";
import UserService from "../services/user.service.js";

const prisma = new PrismaClient();

class UsersController {
    async getUserProfile(req, res, next) {
        try {
            const { refreshToken: token } = req.cookies;

            const { userId } = jwt.verify(
                token,
                process.env.JWT_REFRESH_SECRET
            );

            const profile = await UserService.getProfile(userId);

            return res.status(200).json(profile);
        } catch (error) {
            next(error);
        }
    }
    async changeUserProfile(req, res, next) {
        try {
            const { formData } = req.body;
            const { refreshToken: token } = req.cookies;

            const { userId } = jwt.verify(
                token,
                process.env.JWT_REFRESH_SECRET
            );

            const profile = await UserService.changeProfile(formData, userId);

            return res.status(200).json(profile);
        } catch (error) {
            next(error);
        }
    }
    async getAllUsers(req, res) {
        try {
            const users = await prisma.user.findMany();

            return res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
    async getUserByUsername(req, res) {
        try {
            const username = req.params.username;

            const user = await prisma.user.findMany({
                where: {
                    name: {
                        contains: username,
                    },
                },
            });

            if (!user) {
                throw ApiError.NotFoundError();
            }

            const userWithoutPassword = excludeField(user, ["password"]);

            return res.status(200).json(userWithoutPassword);
        } catch (error) {
            next(error);
        }
    }
    async getUserById(req, res) {
        try {
            const userId = parseInt(req.params.id);

            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });

            if (!user) {
                throw ApiError.NotFoundError();
            }

            const userWithoutPassword = excludeField(user, ["password"]);

            return res.status(200).json(userWithoutPassword);
        } catch (error) {
            next(error);
        }
    }
}

export default new UsersController();
