export type LoginResponse = {
    accessToken: string;
    userInfo: UserInfo;
    settings: Settings;
};

export interface Settings {
    byKey: ByKey;
}

export interface ByKey {
    theme: string;
    timeFormat: string;
    messageTextSize: string;
    autoLoadFileMaxSizeMb: number;
    canAutoLoadPhotoInGroups: boolean;
    canAutoLoadPhotoInChannels: boolean;
    canAutoLoadPhotoInPrivateChats: boolean;
}

export interface UserInfo {
    username: string;
    email: string;
    id: number;
}

export interface RegisterResponse {
    message: string;
}

export interface IUser {
    username: string;
    id: number;
    roomName: string;
    email?: string;
    first_name?: string;
    phone?: string;
    sortName?: string;
    updatedAt?: string;
    createddAt?: string;
}
