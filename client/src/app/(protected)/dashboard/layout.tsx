import Sidebar from "@/components/sidebar/sidedbar-left/Sidebar";
import AuthProvider from "@/components/providers/AuthProvider";
import SocketProvider from "@/components/providers/SocketProvider";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full min-h-screen min-w-full">
            <div className="flex flex-row relative overflow-hidden w-full max-w-[1682px] mx-auto h-dvh radial-1 border border-[rgb(226,232,240)]">
                <SocketProvider>
                    <AuthProvider>
                        <Sidebar />
                        {children}
                        <Toaster />
                    </AuthProvider>
                </SocketProvider>
            </div>
        </div>
    );
}
