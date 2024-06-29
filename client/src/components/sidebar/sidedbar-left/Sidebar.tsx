"use client";

import MainScreen from "../sidebar-screens/MainScreen";
import { useState } from "react";
import FirstScreen from "../sidebar-screens/group-screens/FirstScreen";
import SecondScreen from "../sidebar-screens/group-screens/SecondScreen";
import SettingsScreen from "../sidebar-screens/SettingsScreen";
import ProfileScreen from "../sidebar-screens/ProfileScreen";

export enum ScreenTypes {
    CreateChannel = "createChannel",
    CreateGroupFirst = "createGroupFirst",
    CreateGroupSecond = "createGroupSecond",
    Settings = "settings",
    Profile = "profile",
    Main = "main",
}

const Sidebar = () => {
    const [screen, setScreen] = useState<ScreenTypes>(ScreenTypes.Main);

    return (
        <div className="relative flex flex-col lg:min-w-[420px] w-[420px] min-h-screen h-full bg-[rgb(244,244,245)] z-10">
            {screen === ScreenTypes.Main && (
                <MainScreen setScreen={setScreen} />
            )}
            {screen === ScreenTypes.CreateGroupFirst && (
                <FirstScreen setScreen={setScreen} />
            )}
            {screen === ScreenTypes.CreateGroupSecond && (
                <SecondScreen setScreen={setScreen} />
            )}
            {screen === ScreenTypes.Settings && (
                <SettingsScreen setScreen={setScreen} />
            )}
            {screen === ScreenTypes.Profile && (
                <ProfileScreen setScreen={setScreen} />
            )}
        </div>
    );
};

export default Sidebar;
