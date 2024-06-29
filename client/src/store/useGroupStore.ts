import { create } from "zustand";

interface ISidebarStore {
    selectedUsers: any;
    addUser: (user: any) => void;
    removeUser: (userId: any) => void;
    reset: () => void;
}

const useSidebarStore = create<ISidebarStore>((set) => ({
    selectedUsers: [],
    addUser: (user) =>
        set((state) => ({
            selectedUsers: [...state.selectedUsers, user],
        })),
    removeUser: (userId) =>
        set((state) => ({
            selectedUsers: state.selectedUsers.filter(
                (u: any) => u.id !== userId
            ),
        })),
    reset: () => {
        set(() => ({ selectedUsers: [] }));
    },
}));

export default useSidebarStore;
