"use client";

import { cn } from "@/lib/utils";
import useSidebarStore from "@/store/useSidebarStore";
import X from "/public/x.svg";

const Sidebar = () => {
    const { isRightColumnShown, setRightColumnShown } = useSidebarStore();

    return (
        <div
            className={cn(
                "absolute right-0 translate-x-full flex flex-col min-w-[420px] min-h-screen h-full bg-background duration-200 will-change-transform",
                {
                    "translate-x-0": isRightColumnShown,
                }
            )}
        >
            <div className="flex flex-row items-center px-4 min-h-[3.5rem]">
                <button className="p-2 w-10 h-10" onClick={setRightColumnShown}>
                    <X />
                </button>
                <div className="pl-6 text-[20px]">
                    <span>Информация</span>
                </div>
            </div>
            <div className="h-full pt-2 overflow-y-auto overflow-x-hidden relative"></div>
        </div>
    );
};

export default Sidebar;
