export interface ISaveFile {
    saveFile<T>(fileData: T, label?: string): Promise<void>;
}
export declare class SaveFile implements ISaveFile {
    path: string;
    constructor(path: string);
    saveFile<T>(fileData: T, label?: string): Promise<void>;
}
