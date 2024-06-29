import { PrismaClient } from "@prisma/client";
import { ApiError } from "../utils/api-errors.js";

const prisma = new PrismaClient();

class UserService {
    async getProfile(id) {
        const profile = await prisma.profile.findUnique({
            where: {
                user_id: id,
            },
        });

        return profile;
    }
}

export default new UserService();
