import { cn } from "@/lib/utils";

interface ISeparator {
    className?: string;
    orientation?: "horizontal" | "vertical";
}

const Separator = ({
    className,
    orientation = "horizontal",
    ...props
}: ISeparator) => {
    return (
        <div
            className={cn(
                "shrink-0 bg-border",
                orientation === "horizontal"
                    ? "h-[1px] w-full"
                    : "h-full w-[1px]",
                className
            )}
            {...props}
        />
    );
};

export default Separator;
