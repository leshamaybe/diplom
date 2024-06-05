import ChatService from "../services/chat.service.js";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

class ChatController {
    async startConversation(req, res, next) {
        try {
            const { recipientId } = req.body;
            const { refreshToken: token } = req.cookies;

            const { userId } = jwt.verify(
                token,
                process.env.JWT_REFRESH_SECRET
            );

            const conversation = await ChatService.startConversation(
                recipientId,
                userId
            );

            return res.status(201).json({
                conversation: conversation,
            });
        } catch (error) {
            next(error);
        }
    }

    async getCurrentChat(req, res, next) {
        try {
            const { recipientId } = req.body;
            const { refreshToken: token } = req.cookies;

            const { userId } = jwt.verify(
                token,
                process.env.JWT_REFRESH_SECRET
            );

            const user = await ChatService.getCurrentChat(recipientId, userId);

            return res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    async getAllChats(req, res, next) {
        try {
            const { refreshToken: token } = req.cookies;
            const { userId } = jwt.verify(
                token,
                process.env.JWT_REFRESH_SECRET
            );

            const users = await ChatService.getAllChats(userId);

            return res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    async sendMessage(req, res, next) {
        try {
            const { content, senderId, conversationId } = req.body;

            const message = await prisma.message.create({
                data: {
                    content,
                    sender_id: parseInt(senderId),
                    conversation_id: parseInt(conversationId),
                },
            });

            await prisma.conversation.update({
                where: { id: parseInt(conversationId) },
                data: { latestMessage_id: message.id },
            });

            res.status(201).json(message);
        } catch (error) {
            next(error);
        }
    }
}

export default new ChatController();
