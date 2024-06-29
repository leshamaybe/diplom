export type IMessage = {
    id: number;
    sender_id: number;
    conversation_id: number;
    content: string;
    groupId?: number | null;
    createdAt: string;
    updatedAt: string;
};
