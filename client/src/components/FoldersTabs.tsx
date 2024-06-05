import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FoldersTabs = ({ currentFolder }: { currentFolder: string }) => {
    return (
        <Tabs defaultValue="all" className="w-full px-4">
            <TabsList className="flex flex-row justify-start w-full bg-transparent">
                <TabsTrigger value="all">Все чаты</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
                Make changes to your account here.
            </TabsContent>
            <TabsContent value="password">
                Change your password here.
            </TabsContent>
        </Tabs>
    );
};

export default FoldersTabs;
