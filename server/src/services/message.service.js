import { PrismaClient, ReactionType } from "@prisma/client";
import { ApiError } from "../utils/api-errors.js";

const prisma = new PrismaClient();

class MessageService {
    async sendMessage(sender, content, conversationId) {
        const message = await prisma.message.create({
            data: {
                content,
                sender_id: parseInt(sender),
                conversation_id: parseInt(conversationId),
            },
        });

        await prisma.conversation.update({
            where: { id: parseInt(conversationId) },
            data: { latestMessage_id: message.id },
        });

        return message;
    }
    async deleteMessage(messageId) {
        const message = await prisma.message.delete({
            where: {
                id: messageId,
            },
        });

        return message;
    }
    async reactOnMessage(messageId, userId, content) {
        const reaction = await prisma.reaction.create({
            data: {
                userId: userId,
                messageId: messageId,
                content: content || ReactionType.LIKE,
            },
        });

        return reaction;
    }
    async deleteReaction(rid) {
        const reaction = await prisma.reaction.delete({
            where: {
                id: rid,
            },
        });

        return reaction;
    }
}

export default new MessageService();
