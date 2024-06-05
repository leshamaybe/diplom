import { create } from "zustand";
import { Settings, UserInfo } from "@/types/types";
import { persist, createJSONStorage } from "zustand/middleware";

export type AuthStoreTypes = {
    isAuth: boolean;
    userInfo: null | UserInfo;
    settings: null | Settings;
    setUserInfo: (data: UserInfo) => void;
    setSettings: (data: Settings) => void;
    setIsAuth: (bool: boolean) => void;
};

const useAuthStore = create<AuthStoreTypes>()(
    persist(
        (set) => ({
            isAuth: false,
            userInfo: null,
            settings: null,
            setUserInfo: (data) => set({ userInfo: data }),
            setSettings: (data) => set({ settings: data }),
            setIsAuth: (bool) => set({ isAuth: bool }),
        }),
        {
            name: "userInfo",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useAuthStore;
