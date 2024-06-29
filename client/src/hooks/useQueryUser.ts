import UserService from "@/services/userService";
import useChatStore from "@/store/useChatStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useProfile = () => {
    return useQuery({
        queryKey: ["myProfile"],
        queryFn: async () => {
            const res = await UserService.getProfile();

            return res.data;
        },
        retry: false,
    });
};
