import { Router } from "express";
import controller from "../controllers/auth.controller.js";
const router = new Router();

router.post("/reg", controller.register);
router.post("/login", controller.login);
router.get("/logout", controller.logout);
router.get("/refresh", controller.refresh);

export default router;
