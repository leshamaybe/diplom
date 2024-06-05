import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { ApiError } from "../utils/api-errors.js";
import generateRoomName from "../utils/roomNameGenarator.js";
import { excludeField } from "../utils/excludeField.js";

const prisma = new PrismaClient();

class ChatService {
    async startConversation(userId1, userId2) {
        let conversation = await prisma.conversation.findFirst({
            where: {
                isGroup: false,
                users: {
                    every: {
                        id: { in: [parseInt(userId1), parseInt(userId2)] },
                    },
                },
            },
            include: {
                users: {
                    where: {
                        NOT: {
                            id: userId2,
                        },
                    },
                    select: {
                        id: true,
                        username: true,
                        first_name: true,
                        phone: true,
                        email: true,
                        sortName: true,
                    },
                },
                messages: true,
            },
        });

        if (!conversation) {
            conversation = await prisma.conversation.create({
                data: {
                    isGroup: false,
                    roomName: generateRoomName(userId1, userId2),
                    users: {
                        connect: [
                            { id: parseInt(userId1) },
                            { id: parseInt(userId2) },
                        ],
                    },
                },
                include: {
                    users: {
                        where: {
                            NOT: {
                                id: userId2,
                            },
                        },
                        select: {
                            id: true,
                            username: true,
                            first_name: true,
                            phone: true,
                            email: true,
                            sortName: true,
                        },
                    },
                    messages: true,
                },
            });
        }

        return conversation;
    }

    async getCurrentChat(userId1, userId2) {
        // const user = await prisma.conversation.findFirst({
        //     where: {
        //         users: {
        //             every: {
        //                 id: { in: [parseInt(userId1), parseInt(userId2)] },
        //             },
        //         },
        //     },
        //     include: {
        //         users: {
        //             where: {
        //                 NOT: {
        //                     id: userId2,
        //                 },
        //             },
        //         },
        //         messages: true,
        //     },
        // });

        const users = await prisma.user.findMany({
            where: {
                NOT: {
                    id: { equals: userId2 },
                },
                conversations: {
                    some: {
                        users: { some: { id: { equals: userId2 } } },
                    },
                },
            },
        });

        if (!users) {
            throw ApiError.NotFoundError();
        }

        return users;
    }

    async getAllChats(id) {
        let users = await prisma.user.findMany({
            where: {
                NOT: {
                    id: { equals: id },
                },
                conversations: {
                    some: {
                        users: { some: { id: { equals: id } } },
                    },
                },
            },
        });

        if (!users) {
            throw ApiError.NotFoundError();
        }
        users = users.map((user) => excludeField(user, ["password"]));

        return users;
    }
}

export default new ChatService();
