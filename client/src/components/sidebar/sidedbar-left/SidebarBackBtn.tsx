import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

const SidebarBackBtn = ({
    className,
    onClick,
}: {
    className?: string;
    onClick?: any;
}) => {
    return (
        <button
            className={cn(
                "flex items-center justify-center min-w-[36px] h-[36px] rounded-full hover:bg-gray-100 focus-visible:outline-none",
                className
            )}
            onClick={onClick}
        >
            <ArrowLeft />
        </button>
    );
};

export default SidebarBackBtn;
