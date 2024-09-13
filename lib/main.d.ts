import { Methods, Data } from './module/sendModule.js';
type Status = {
    amount: number;
};
interface ITelegaSender {
    sendFromIds(userIds: number[], data: Data, method: Methods): Promise<Status>;
    sendFromId(userId: number, data: Data, method: Methods): Promise<Status>;
}
export declare class TelegaSender implements ITelegaSender {
    private telegaToken;
    private saveFile;
    private sender;
    constructor(telegaToken: string, folderPath: string);
    sendFromIds(userIds: number[], data: Data, method: Methods): Promise<{
        amount: number;
    }>;
    sendFromId(userId: number, data: Data, method: Methods): Promise<{
        amount: number;
    }>;
}
export {};
