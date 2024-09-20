export declare enum Methods {
    sendPhoto = "sendPhoto",
    sendMessage = "sendMessage"
}
export type Data = {
    text: string;
    photo?: string;
    buttons?: {
        buttonTitle: string;
        buttonUrl: string;
    }[];
};
export type Status = {
    userId: number;
    status: boolean;
    resData: unknown;
};
interface ISendMessage {
    changeMethod(method: Methods): void;
    sendMessage(userId: number, data: Data): Promise<Status>;
    sendMessages(userIds: number[], data: Data): Promise<Status[]>;
}
export declare class SendMessage implements ISendMessage {
    private telegaToken;
    private method;
    constructor(telegaToken: string, method: Methods);
    changeMethod(method: Methods): void;
    private telegaUrl;
    sendMessage(userId: number, data: Data, mode?: 'HTML' | 'MarkdownV2'): Promise<{
        userId: number;
        status: boolean;
        resData: any;
    }>;
    sendMessages(userIds: number[], data: Data, mode?: 'HTML' | 'MarkdownV2'): Promise<Status[]>;
}
export {};
