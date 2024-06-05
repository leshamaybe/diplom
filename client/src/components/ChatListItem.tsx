import Link from "next/link";
import { usePathname } from "next/navigation";
import Avatar from "@/components/Avatar";
import { cn } from "@/lib/utils";
import { IUser } from "@/types/types";

const ChatListItem = ({ user, ...props }: { user: IUser }) => {
    const router = usePathname();

    const activeChat = Number(router.split("/")[2]);

    return (
        <Link {...props} href={`/dashboard/${user.id}`}>
            <div
                className={cn(
                    "relative flex flex-col justify-center w-full min-h-16 rounded-lg pl-[70px] hover:bg-[rgba(112,117,121,0.08)] transition-colors duration-75",
                    {
                        "bg-[#3390EC] hover:bg-[#3390EC] text-white":
                            activeChat === user?.id,
                    }
                )}
            >
                <Avatar username={user.username} />
                <div className="w-full">{user.username}</div>
            </div>
        </Link>
    );
};

export default ChatListItem;
