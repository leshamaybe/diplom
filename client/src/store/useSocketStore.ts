import { io, Socket } from "socket.io-client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getCookie } from "cookies-next";

type Store = {
    socket: null | Socket;
    connect: () => void;
    disconnect: () => void;
};

const useSocketStore = create<Store>()(
    devtools((set, get) => ({
        socket: null,
        connect: () => {
            const { socket } = get();

            if (socket) {
                console.log("Socket already connected");
            } else {
                console.log("Connecting to socket");

                const socket = io("http://127.0.0.1:5050", {
                    extraHeaders: {
                        authorization: `bearer ${getCookie("accessToken")}`,
                    },
                    addTrailingSlash: false,
                    autoConnect: false,
                });

                socket.connect();

                set({ socket });

                socket
                    .on("connect", () => {
                        console.log("Socket connected!", socket.id);
                    })
                    .on("disconnect", () => {
                        console.log("Socket disconnected!");

                        set({ socket: null });
                    })
                    .on("connect_error", () => {
                        setTimeout(() => socket.connect(), 5000);
                    });
            }
        },

        disconnect: () => {
            const { socket } = get();
            if (socket) {
                socket.disconnect();
                set({ socket: null });
            } else {
                console.log("Socket not connected");
            }
        },
    }))
);

export default useSocketStore;
