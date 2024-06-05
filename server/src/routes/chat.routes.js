import { Router } from "express";
import controller from "../controllers/chat.controller.js";
const router = new Router();

router.post("/startConversation", controller.startConversation);
router.post("/sendMessage", controller.sendMessage);
router.post("/currentChat", controller.getCurrentChat);
router.get("/allChats", controller.getAllChats);

export default router;
