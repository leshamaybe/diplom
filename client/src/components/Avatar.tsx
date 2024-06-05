import { cva } from "class-variance-authority";

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

const Avatar = ({ username }: { username?: string }) => {
    return (
        <div className="absolute start-2 flex items-center justify-center w-[54px] h-[54px] text-[20px] rounded-full bg-indigo-300">
            {username?.slice(0, 1)}
        </div>
    );
};

export default Avatar;
