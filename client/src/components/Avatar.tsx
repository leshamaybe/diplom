import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import Image from "next/image";

const avatar = cva("flex items-center justify-center rounded-full", {
    variants: {
        intent: {
            secondary: [
                "bg-white",
                "text-gray-800",
                "border-gray-400",
                "hover:bg-gray-100",
            ],
        },
        size: {
            default: "w-[54px] h-[54px]",
            small: ["w-[42px]", "h-[42px]"],
        },
    },
    defaultVariants: {
        size: "default",
    },
});

const imageLoader = ({
    src,
    width,
    quality,
}: {
    src: any;
    width: any;
    quality?: any;
}) => {
    return `${src}?w=${width}&q=${quality || 100}`;
};

const Avatar = ({
    username,
    className,
    src,
    avatarClasses,
}: {
    username?: string;
    className?: string;
    src?: string;
    avatarClasses?: string;
}) => {
    return (
        <div
            className={cn(
                "relative start-2 flex items-center justify-center w-[54px] h-[54px] text-[20px] rounded-full overflow-hidden bg-[linear-gradient(rgb(124,183,242),rgb(51,144,236));]",
                className
            )}
        >
            {src ? (
                <>
                    <Image
                        loader={imageLoader}
                        src={src}
                        alt="avatar"
                        // width={54}
                        height={54}
                        className={"w-full h-full object-cover"}
                    />
                </>
            ) : (
                <span className="absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2">
                    {username?.slice(0, 1)}
                </span>
            )}
        </div>
    );
};

export default Avatar;
