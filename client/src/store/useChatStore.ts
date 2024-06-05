import { create } from "zustand";
import { IUser, UserInfo } from "@/types/types";
import { persist, createJSONStorage } from "zustand/middleware";

interface IChatStore {
    chats: null | any;
    userInfo: null | UserInfo;
    currentChat: null | IUser;
    setCurrentChat: (data: IUser) => void;
    setUserInfo: (data: UserInfo) => void;
    setChats: (data: any) => void;
}

const useChatStore = create<IChatStore>()(
    persist(
        (set) => ({
            userInfo: null,
            chats: null,
            currentChat: null,
            setCurrentChat: (data: IUser) => {
                set({ currentChat: data });
            },
            setUserInfo: (data: UserInfo) => {
                set({ userInfo: data });
            },
            setChats: (data: any) => {
                set({ chats: data });
            },
        }),
        {
            name: "userInfo",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useChatStore;
