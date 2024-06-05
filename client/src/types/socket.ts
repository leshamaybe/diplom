export type SocketPrivateMessage = {
    from: string;
    to: string;
    message: string;
    timestamp: number;
};

export type SocketBroadcastMessage = {
    from: string;
    message: string;
    timestamp: number;
};

export type SocketOnlineUser = {
    socketId: string;
    name: string | null;
};

export type MessageWithMe = {
    from: string;
    me: boolean;
    message: string;
    timestamp: number;
};
