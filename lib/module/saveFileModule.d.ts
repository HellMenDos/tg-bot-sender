type Status = {
    status: boolean;
};
export interface ISaveFile {
    saveFile<T>(fileData: T, label?: string): Promise<Status>;
}
export declare class SaveFile implements ISaveFile {
    path: string;
    constructor(path: string);
    saveFile<T>(fileData: T, label?: string): Promise<Status>;
}
export {};
