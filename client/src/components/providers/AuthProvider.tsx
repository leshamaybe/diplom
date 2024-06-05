"use client";

import AuthService from "@/services/authService";
import useAuthStore from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { setIsAuth } = useAuthStore();
    const { isError, isSuccess } = useQuery({
        queryKey: ["checkAuth"],
        queryFn: AuthService.checkIsAuth,
    });

    useEffect(() => {
        if (isSuccess) {
            setIsAuth(true);
        }

        return () => {
            setIsAuth(false);
        };
    }, [isSuccess]);

    if (isError) {
        return <p>Error</p>;
    }

    return <>{children}</>;
};

export default AuthProvider;
