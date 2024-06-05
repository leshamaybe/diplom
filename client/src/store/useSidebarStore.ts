import { create } from "zustand";

interface ISidebarStore {
    isRightColumnShown: boolean;
    setRightColumnShown: () => void;
}

const useSidebarStore = create<ISidebarStore>((set) => ({
    isRightColumnShown: false,
    setRightColumnShown: () =>
        set((state) => ({
            isRightColumnShown: !state.isRightColumnShown,
        })),
}));

export default useSidebarStore;
