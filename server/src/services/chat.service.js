import { PrismaClient } from "@prisma/client";
import { ApiError } from "../utils/api-errors.js";
import generateRoomName from "../utils/roomNameGenarator.js";

const prisma = new PrismaClient();

class ChatService {
    async startConversation(recipient, me) {
        recipient = parseInt(recipient);
        me = parseInt(me);

        const result = await prisma.$transaction(async (prisma) => {
            let conversation;
            let profile = null;

            // Проверка наличия личной переписки
            conversation = await prisma.conversation.findFirst({
                where: {
                    isGroup: false,
                    AND: [
                        { users: { some: { userId: recipient } } },
                        { users: { some: { userId: me } } },
                    ],
                },
                select: {
                    id: true,
                    roomName: true,
                    isGroup: true,
                    messages: {
                        orderBy: {
                            createdAt: "asc",
                        },
                        select: {
                            id: true,
                            content: true,
                            createdAt: true,
                            sender_id: true,
                            reactions: true,
                        },
                    },
                },
            });

            // Если личная переписка не найдена, проверяем наличие групповой переписки
            if (!conversation) {
                conversation = await prisma.conversation.findFirst({
                    where: {
                        isGroup: true,
                        group_id: recipient,
                    },
                    select: {
                        id: true,
                        roomName: true,
                        isGroup: true,
                        group_id: true,
                        messages: {
                            orderBy: {
                                createdAt: "asc",
                            },
                            select: {
                                id: true,
                                content: true,
                                createdAt: true,
                                sender_id: true,
                                reactions: true,
                            },
                        },
                        users: {
                            select: {
                                user: {
                                    select: {
                                        id: true,
                                        name: true,
                                        email: true,
                                        profile: true,
                                    },
                                },
                            },
                        },
                    },
                });
            }

            if (!conversation) {
                throw new Error("Conversation not found");
            }

            // Если это личная переписка, получаем профиль собеседника
            if (!conversation.isGroup) {
                profile = await prisma.profile.findUnique({
                    where: {
                        user_id: recipient,
                    },
                });
            } else {
                let group = await prisma.group.findUnique({
                    where: {
                        id: conversation.group_id,
                    },
                });
                profile = {
                    name: group.name,
                };
            }

            return {
                profile,
                ...conversation,
            };
        });

        return result;
    }

    async createConversation(recipient, me) {
        recipient = parseInt(recipient);
        me = parseInt(me);

        const conversation = await prisma.conversation.create({
            data: {
                users: {
                    create: [{ userId: recipient }, { userId: me }],
                },
                isGroup: false,
                roomName: generateRoomName(recipient, me),
            },
            include: {
                users: {
                    include: {
                        user: true,
                    },
                },
                messages: true,
            },
        });

        return conversation;
    }

    async createGroup(name, users, me) {
        me = parseInt(me);

        users.push({ profile: { id: me } });

        console.log(name);

        const group = await prisma.group.create({
            data: {
                name: name,
                users: {
                    create: users.map((user) => ({
                        user: {
                            connect: { id: user.profile.id },
                        },
                    })),
                },
                conversation: {
                    create: {
                        isGroup: true,
                        users: {
                            create: users.map((user) => ({
                                user: {
                                    connect: { id: user.profile.id },
                                },
                            })),
                        },
                        roomName: name,
                    },
                },
            },
        });

        return group;
    }

    async getUserConversations(me) {
        me = parseInt(me);

        const userConversations = await prisma.userConversation.findMany({
            where: {
                userId: me,
            },
            select: {
                conversationId: true,
            },
        });

        const conversationIds = userConversations.map(
            (uc) => uc.conversationId
        );

        const conversations = await prisma.conversation.findMany({
            where: {
                id: { in: conversationIds },
            },
            include: {
                users: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                profile: {
                                    select: {
                                        name: true,
                                    },
                                },
                            },
                        },
                    },
                },
                latestMessage: {
                    select: {
                        id: true,
                        sender_id: true,
                        content: true,
                        createdAt: true,
                    },
                },
            },
        });

        if (!conversations) {
            throw ApiError.NotFoundError();
        }

        const formattedConversations = conversations.map((conversation) => {
            if (!conversation.isGroup) {
                const interlocutor = conversation.users.find(
                    (userConversation) => userConversation.userId !== me
                ).user;

                return {
                    id: conversation.id,
                    isGroup: conversation.isGroup,
                    lastMessage: conversation.latestMessage,
                    profile: {
                        id: interlocutor.id,
                        name: interlocutor.profile.name,
                    },
                };
            } else {
                return {
                    id: conversation.id,
                    isGroup: conversation.isGroup,
                    lastMessage: conversation.latestMessage,
                    profile: {
                        id: conversation.group_id,
                        name: conversation.roomName,
                    },
                };
            }
        });

        return formattedConversations;
    }
}

export default new ChatService();
