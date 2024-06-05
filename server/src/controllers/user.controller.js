import { PrismaClient } from "@prisma/client";
import { ApiError } from "../utils/api-errors.js";
import { excludeField } from "../utils/excludeField.js";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

class UsersController {
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
                    username: {
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
