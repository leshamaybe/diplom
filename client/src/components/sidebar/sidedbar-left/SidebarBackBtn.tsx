import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

const SidebarBackBtn = ({
    className,
    handler,
}: {
    className?: string;
    handler?: () => void;
}) => {
    return (
        <button
            className={cn(
                "flex items-center justify-center min-w-[36px] h-[36px] rounded-full hover:bg-gray-100 focus-visible:outline-none",
                className
            )}
            onClick={handler}
        >
            <ArrowLeft />
        </button>
    );
};

export default SidebarBackBtn;
