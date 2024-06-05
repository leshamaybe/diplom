export interface IUser {
    username: string;
    id: number;
    email?: string;
    first_name?: string;
    phone?: string;
    sortName?: string;
    updatedAt: string;
    createddAt: string;
}

export interface UserInfo {
    username: string;
    email: string;
    id: number;
}
