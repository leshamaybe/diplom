import { IMessage } from "./chat.types";

export type IUser = {
    username: string;
    id: number;
    email?: string;
    first_name?: string;
    phone?: string;
    lastMessage: IMessage;
    sortName?: string;
    updatedAt: string;
    createdAt: string;
};

export interface UserInfo {
    username: string;
    email: string;
    id: number;
}
