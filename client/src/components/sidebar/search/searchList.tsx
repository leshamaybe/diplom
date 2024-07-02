"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import UserService from "@/services/userService";
import { IUser } from "@/types/types";
import Avatar from "@/components/Avatar";
import { cn } from "@/lib/utils";

const SearchList = ({ searchTerm }: { searchTerm: string }) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["searchedUsers", searchTerm],
        queryFn: async () => {
            const res = await UserService.getUserByUsername(searchTerm);

            const parsedData = Object.keys(res?.data).map((key) => {
                return res?.data[key];
            });

            return parsedData;
        },
        enabled: !!searchTerm,
    });

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    if (isError) {
        return <div>Error occurred while fetching data.</div>;
    }

    return (
        <div>
            {data?.map((user: any) => {
                return (
                    <Link key={user?.id} href={`/dashboard/${user.id}`}>
                        <div
                            className={cn(
                                "relative flex flex-col justify-center w-full min-h-16 rounded-lg pl-[70px] hover:bg-[rgba(112,117,121,0.08)] transition-colors duration-75"
                            )}
                        >
                            <Avatar
                                className="absolute"
                                username={user?.name}
                            />
                            <div className="w-full">{user?.name}</div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default SearchList;
