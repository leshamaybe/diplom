"use client";

import React, { useEffect } from "react";
import useSocketStore from "@/store/useSocketStore";
import useAuthStore from "@/store/useAuthStore";

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const { socket, connect, disconnect } = useSocketStore();
    const { isAuth } = useAuthStore();

    useEffect(() => {
        window.addEventListener("beforeunload", disconnect);
        return () => {
            window.removeEventListener("beforeunload", disconnect);
        };
    }, [disconnect]);

    useEffect(() => {
        if (isAuth) {
            connect();
        }

        return () => {
            socket?.off("connect");
        };
    }, [connect, isAuth]);

    return <>{children}</>;
};

export default SocketProvider;
