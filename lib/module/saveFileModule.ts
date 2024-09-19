import fs from 'fs'

type Status = {
    status: boolean,
}

export interface ISaveFile {
    saveFile<T>(fileData: T, label?: string): Promise<void>
}

export class SaveFile implements ISaveFile {
    public path: string
    
    constructor(path: string) {
        this.path = path
    }

    public async saveFile<T>(fileData: T, label: string = ''): Promise<void> {
        await (new Promise((res, rej) => {
            fs.writeFile(`${this.path}/log${label ? `-${label}` : ''}.json`, JSON.stringify(fileData), err => {
                if (err) rej({ status: false }) 
                res({ status: true })
            });
        }))
    }
}