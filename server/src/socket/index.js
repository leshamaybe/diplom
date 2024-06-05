import { io } from "../app.js";
import colors from "@colors/colors";
import jwt from "jsonwebtoken";
import rooms from "../utils/rooms.js";
import users from "../utils/users.js";
import { format } from "date-fns";

const socketConnect = (socket) => {
    console.log("a user connected:".green, socket.id.underline);

    const { username, userId } = socket.request.user;

    for (let [id, socket] of io.of("/").sockets) {
        users.addUser({
            id,
            userId,
            username,
            room: "Home",
        });
    }

    socket.on("join_chat", (room) => {
        socket.join(room);

        // var clientsInRoom = io.sockets.adapter.rooms.get(room);

        const user = {
            id: socket.id,
            username,
            userId,
            roomName: room,
        };

        rooms.addUserToRoom(user);

        console.log(`User ${socket.id} joined chat ${room}`);
    });

    socket.on("leave_chat", (room) => {
        rooms.removeUserFromRoom(socket.id, room);
        socket.leave(room);

        console.log(`User ${socket.id} left chat ${room}`);
    });

    socket.on("send_message", ({ conversationId, senderId, content, to }) => {
        const user = getUser(socket.id);

        console.log({ conversationId, senderId, content, to });

        io.to(to).emit("receive_message", {
            content,
            from: user.username,
            time: format(new Date(), "HH:mm"),
            author: user.id === socket.id ? "me" : "other",
        });
    });

    socket.on("disconnect", () => {
        rooms.removeUserFromAllRooms(socket.id);
        users.removeUser(socket.id);

        console.log("a user disconnected:".red, socket.id.underline);
    });
};

// const socketConnect = (socket) => {
//     console.log("a user connected with id:".green, socket.id.underline);

//     socket.on("joinRoom", ({ room }) => {
//         const { username } = socket.request.user;

//         removeUser(socket.id);
//         socket.leave(socket.id);

//         const { user } = addUser({
//             id: socket.id,
//             username: username,
//             room: room,
//         });

//         socket.join(user?.room);
//         socket.room = room;
//         console.log(rooms);

//         io.to(user.room).emit("roomData", {
//             room: user.room,
//             users: getUsersInRoom(user.room),
//         });
//     });

//     socket.on("roomChange", (data) => {
//         const user = getUser(socket.id);

//         console.log(rooms);
//     });

//     socket.on("send_message", ({ conversationId, senderId, content, to }) => {
//         const user = getUser(socket.id);

//         console.log({ conversationId, senderId, content, to });

//         io.to(to).emit("receive_message", {
//             content,
//             from: user.username,
//             time: format(new Date(), "HH:mm"),
//             author: user.id === socket.id ? "me" : "other",
//         });
//     });

//     // socket.on("switch room", ({ previousRoom, newRoom, username }) => {
//     //     socket.leave(previousRoom, () => {
//     //         socket.to(previousRoom).emit("user left room", socket.id);

//     //         const { user } = addUser({
//     //             id: socket.id,
//     //             username: username,
//     //             room: newRoom,
//     //         });

//     //         socket.join(newRoom, () => {
//     //             socket.to(newRoom).emit("user joined room", socket.id);

//     //             io.to(newRoom).emit("room_data", {
//     //                 room: newRoom,
//     //                 users: getUsersInRoom(newRoom),
//     //             });

//     //             io.to(previousRoom).emit("room_data", {
//     //                 room: previousRoom,
//     //                 users: getUsersInRoom(previousRoom),
//     //             });
//     //         });
//     //     });
//     // });

//     // socket.on("switch room", (previousRoom, newRoom) => {
//     //     socket.leave(previousRoom, () => {
//     //         // use socket.to() to target users within a specific room
//     //         socket.to(previousRoom).emit("user left room", socket.id);
//     //         socket.join(newRoom, () => {
//     //             socket.to(newRoom).emit("user joined room", socket.id);
//     //         });
//     //     });
//     // });

//     socket.on("disconnect", () => {
//         removeUser(socket.id);
//         socket.leave(socket.id);

//         console.log("a user disconnected with id:".red, socket.id.underline);
//     });
// };

export const init = () => {
    // io.use((socket, next) => {
    //     const username = socket.handshake.auth.username;
    //     if (!username) {
    //         return next(new Error("invalid username"));
    //     }
    //     socket.username = username;
    //     next();
    // });
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
