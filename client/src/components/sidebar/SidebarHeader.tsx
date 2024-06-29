import { cn } from "@/lib/utils";
import React from "react";

const SidebarHeader = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "flex flex-row items-center px-4 min-h-[3.5rem]",
                className
            )}
        >
            {children}
        </div>
    );
};

export default SidebarHeader;
