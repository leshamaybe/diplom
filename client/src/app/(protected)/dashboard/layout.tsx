import Sidebar from "@/components/sidebar/sidedbar-left/Sidebar";
import AuthProvider from "@/components/providers/AuthProvider";
import SocketProvider from "@/components/providers/SocketProvider";
import SidebarRight from "@/components/sidebar/sidebar-right/Sidebar";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full min-h-screen min-w-full bg-pattern-1">
            <div className="flex flex-row w-full h-dvh radial-1">
                <SocketProvider>
                    <AuthProvider>
                        <Sidebar />
                        {children}
                        <SidebarRight />
                    </AuthProvider>
                </SocketProvider>
            </div>
        </div>
    );
}
