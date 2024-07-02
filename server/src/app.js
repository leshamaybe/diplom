import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import colors from "@colors/colors";
import authRouter from "./routes/auth.routes.js";
import usersRouter from "./routes/user.routes.js";
import chatRouter from "./routes/chat.routes.js";
import messageRouter from "./routes/message.routes.js";
import cookieParser from "cookie-parser";
import { init as initSocket } from "./socket/index.js";

const app = express();
const port = process.env.PORT || 5050;
const server = createServer(app);
const corsConfig = {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
};

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors(corsConfig));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use("/auth", authRouter);
app.use("/api", usersRouter);
app.use("/api", chatRouter);
app.use("/api/message", messageRouter);

export const io = new Server(server, {
    cors: corsConfig,
    addTrailingSlash: false,
    maxDisconnectionDuration: 2 * 60 * 1000,
    skipMiddlewares: true,
});

initSocket();

server.listen(port, () => {
    console.log(`App listening on port ${port}`.yellow.bold);
});
