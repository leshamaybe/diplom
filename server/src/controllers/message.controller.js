import jwt from "jsonwebtoken";
import MessageService from "../services/message.service.js";

class MessageController {
    async sendMessage(req, res, next) {
        try {
            const { refreshToken: token } = req.cookies;

            const { userId } = jwt.verify(
                token,
                process.env.JWT_REFRESH_SECRET
            );

            const { content, conversationId } = req.body;

            const message = await MessageService.sendMessage(
                userId,
                content,
                conversationId
            );

            res.status(201).json(message);
        } catch (error) {
            next(error);
        }
    }
    async deleteMessage(req, res, next) {
        try {
            const { messageId } = req.body;

            const message = await MessageService.deleteMessage(messageId);

            res.status(201).json(message);
        } catch (error) {
            next(error);
        }
    }
    async reactOnMessage(req, res, next) {
        try {
            const { mid } = req.body;
            const { refreshToken: token } = req.cookies;

            const { userId } = jwt.verify(
                token,
                process.env.JWT_REFRESH_SECRET
            );

            const message = await MessageService.reactOnMessage(mid, userId);

            res.status(201).json(message);
        } catch (error) {
            next(error);
        }
    }
    async deleteReaction(req, res, next) {
        try {
            const { rid } = req.body;

            const reaction = await MessageService.deleteReaction(rid);

            res.status(200).json(reaction);
        } catch (error) {
            next(error);
        }
    }
}

export default new MessageController();
