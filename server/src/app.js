import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import colors from "@colors/colors";
import authRouter from "./routes/auth.routes.js";
import usersRouter from "./routes/user.routes.js";
import chatRouter from "./routes/chat.routes.js";
import cookieParser from "cookie-parser";
import { init as initSocket } from "./socket/index.js";

const app = express();
const port = process.env.PORT || 5050;
const server = createServer(app);
const corsConfig = {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsConfig));
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRouter);
app.use("/api", usersRouter);
app.use("/api", chatRouter);

export const io = new Server(server, {
    cors: corsConfig,
    addTrailingSlash: false,
});

// io.on("connection", (socket) => {
//     io.emit("users_response", roomUsers);

//     socket.on("join_room", (roomId) => {
//         socket.join(roomId);
//         roomUsers = {
//             ...roomUsers,
//             [roomId]: [...(roomUsers[roomId] ?? []), socket.id],
//         };
//         io.emit("users_response", roomUsers);
//     });

//     socket.on("send_message", (data) => {
//         io.emit("receive_message", data);
//     });

//     socket.on("disconnect", () => {
//         for (const [roomId, users] of Object.entries(roomUsers)) {
//             if (users.includes(socket.id)) {
//                 roomUsers[roomId] = [...users.filter((id) => id !== socket.id)];
//                 io.emit("receive_message", {
//                     text: "A user left the room.",
//                     socketId: "kurakani",
//                     roomId: roomId,
//                 });
//             }
//         }
//         io.emit("users_response", roomUsers);
//     });
// });

initSocket();

server.listen(port, () => {
    console.log(`App listening on port ${port}`.yellow.bold);
});
