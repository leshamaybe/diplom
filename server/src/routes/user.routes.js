import { Router } from "express";
import controller from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = new Router();

router.get("/users", authMiddleware, controller.getAllUsers);
router.get("/users/:id", authMiddleware, controller.getUserById);
router.get(
    "/user/username/:username",
    authMiddleware,
    controller.getUserByUsername
);
router.get("/user/profile", authMiddleware, controller.getUserProfile);

export default router;
