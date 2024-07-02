import ChatService from "../services/chat.service.js";
import jwt from "jsonwebtoken";

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
                ...conversation,
            });
        } catch (error) {
            next(error);
        }
    }

    async createConversation(req, res, next) {
        try {
            const { recipientId } = req.body;
            const { refreshToken: token } = req.cookies;

            const { userId } = jwt.verify(
                token,
                process.env.JWT_REFRESH_SECRET
            );

            const conversation = await ChatService.createConversation(
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

    async createGroup(req, res, next) {
        try {
            const { name, users, avatarUrl } = req.body;
            const { refreshToken: token } = req.cookies;

            const { userId } = jwt.verify(
                token,
                process.env.JWT_REFRESH_SECRET
            );

            const group = await ChatService.createGroup(
                name,
                users,
                userId,
                avatarUrl
            );

            return res.status(201).json(group);
        } catch (error) {
            next(error);
        }
    }

    async getUserConversations(req, res, next) {
        try {
            const { refreshToken: token } = req.cookies;
            const { userId } = jwt.verify(
                token,
                process.env.JWT_REFRESH_SECRET
            );

            const users = await ChatService.getUserConversations(userId);

            return res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
}

export default new ChatController();
