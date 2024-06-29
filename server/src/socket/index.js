import { io } from "../app.js";
import colors from "@colors/colors";
import jwt from "jsonwebtoken";
import rooms from "../utils/rooms.js";
import users from "../utils/users.js";
import MessageService from "../services/message.service.js";

const socketConnect = (socket) => {
    console.log("a user connected:".green, socket.id.underline);

    const { username, userId } = socket.request.user;

    if (!socket.recovered) {
        socket.on("join", () => {
            users.addUser({
                id: socket.id,
                userId: userId,
                username: username,
                room: null,
            });
            io.to(socket.id).emit("users", users);
        });
    }

    socket.on("joinRoom", (room) => {
        const prevRoom = rooms.getUser(socket.id);
 
        if (prevRoom) {
            rooms.removeUserFromRoom(socket.id, prevRoom.name);
            socket.leave(room);
            console.log(`User ${socket.id} left chat ${prevRoom.name}`);
        }

        const user = {
            id: socket.id,
            username,
            userId,
            roomName: room,
        };

        rooms.addUserToRoom(user);
        socket.join(room);

        io.to(room).emit("usersInRoom", rooms.getUsersInRoom(room));

        console.log(`User ${socket.id} joined chat ${room}`);
    });

    socket.on("send_message", async ({ conversationId, content, to }) => {
        const message = await MessageService.sendMessage(
            userId,
            content,
            conversationId
        );

        io.to(to).emit("receive_message", message);
    });

    socket.on("disconnect", () => {
        rooms.removeUserFromAllRooms(socket.id);

        const user = users.getUsers(socket.id);

        if (user) {
            users.removeUser(socket.id);
        }

        console.log("a user disconnected:".red, socket.id.underline);
    });
};

export const init = () => {
    io.engine.use((req, res, next) => {
        const isHandshake = req._query.sid === undefined;
        if (isHandshake) {
            const token = req.headers.authorization.split(" ")[1];

            jwt.verify(
                token,
                process.env.JWT_ACCESS_SECRET,
                (error, decoded) => {
                    if (error) {
                        return next(new Error("invalid token"));
                    }

                    req.user = decoded;
                    next();
                }
            );
        } else {
            next();
        }
    });

    io.on("connection", socketConnect);
};
