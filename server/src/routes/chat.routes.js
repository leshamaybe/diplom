import { Router } from "express";
import controller from "../controllers/chat.controller.js";
const router = new Router();

router.post("/startConversation", controller.startConversation);
router.post("/createConversation", controller.createConversation);
router.post("/createGroup", controller.createGroup);
router.get("/conversations", controller.getUserConversations);

export default router;
