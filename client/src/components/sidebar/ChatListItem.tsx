import Link from "next/link";
import { useParams } from "next/navigation";
import Avatar from "@/components/Avatar";
import { cn } from "@/lib/utils";
import { IUser } from "@/types/user.types";
import dayjs from "dayjs";

const ChatListItem = ({ data, ...props }: { data: any }) => {
    const params = useParams();
    const { id } = params;

    const isActiveGroup = data?.isGroup && id == `-${data?.profile.id}`;
    const isActive = Number(id) === data?.profile.id && !data?.isGroup;

    const link = data?.isGroup
        ? `/dashboard/-${data?.profile.id}`
        : `/dashboard/${data?.profile.id}`;

    return (
        <Link {...props} href={link}>
            <div
                className={cn(
                    "relative flex flex-col justify-center w-full min-h-16 rounded-lg pl-[70px] pr-3 hover:bg-[rgba(112,117,121,0.08)]",
                    {
                        "bg-[#3390EC] hover:bg-[#3390EC] text-white": isActive
                            ? isActive
                            : isActiveGroup,
                    }
                )}
            >
                <Avatar
                    src={data?.profile?.avatarUrl}
                    className="absolute"
                    username={data?.profile?.name}
                />
                <div className="flex justify-between w-full">
                    <div className="font-medium">{data?.profile?.name}</div>
                    <div>
                        {data?.lastMessage &&
                            dayjs(data?.lastMessage?.createdAt).format("HH:mm")}
                    </div>
                </div>
                <div
                    className={cn(
                        "flex justify-between w-full mt-[2px] text-[rgb(112,117,121)]",
                        { "text-white": isActive ? isActive : isActiveGroup }
                    )}
                >
                    <div>{data?.lastMessage?.content ?? "..."}</div>
                </div>
            </div>
        </Link>
    );
};

export default ChatListItem;
