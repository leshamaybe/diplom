import { Router } from "express";
import controller from "../controllers/message.controller.js";
const router = new Router();

router.post("/delete", controller.deleteMessage);
router.post("/reactOnMessage", controller.reactOnMessage);
router.post("/deleteReaction", controller.deleteReaction);

export default router;
