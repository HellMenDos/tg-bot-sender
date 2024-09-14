import { SaveFile, ISaveFile } from "./module/saveFileModule.js"
import { Methods, SendMessage, Data, Status as ResponseData } from './module/sendModule.js';
import { Const } from './const.js';

type Status = {
    amount: number,
}

interface ITelegaSender {
    sendFromIds(userIds: number[], data: Data, method: Methods): Promise<Status>
    sendFromId(userId: number, data: Data, method: Methods): Promise<Status>
}

export class TelegaSender implements ITelegaSender {
    private telegaToken: string = ''
    private saveFile: ISaveFile;
    private sender: SendMessage;
    private logs: boolean;

    constructor(telegaToken: string, folderPath: string, logs: boolean = false) {
        this.telegaToken = telegaToken
        this.saveFile = new SaveFile(folderPath)    
        this.sender = new SendMessage(this.telegaToken, Methods.sendMessage)
        this.logs = logs
    }

    public async sendFromIds(userIds: number[], data: Data, method: Methods) {
        this.sender.changeMethod(method)
        const groupedIds: number[][] = []
     
        userIds.forEach((value, index) => {
            if (!Array.isArray(groupedIds[Math.ceil((index + 1) / Const.DIVIDE_AMOUNT) - 1])) {
                groupedIds[Math.ceil((index + 1) / Const.DIVIDE_AMOUNT) - 1] = [ value ]
            } else {
                groupedIds[Math.ceil((index + 1) / Const.DIVIDE_AMOUNT) - 1].push(value)
            }
        })

        let responses = []
        for (let group of groupedIds) {
            const sendedData = await this.sender.sendMessages(group, data)
            responses.push(...sendedData)

            if (this.logs) {
                await this.saveFile.saveFile<ResponseData[]>(sendedData, String(new Date().getTime()))
            }
        }

        return { 
            amount: responses.filter((item) => item.status).length 
        }
    }

    public async sendFromId(userId: number, data: Data, method: Methods) {
        this.sender.changeMethod(method)
        const sendedData = await this.sender.sendMessage(userId, data)
        if (this.logs) {
            await this.saveFile.saveFile<ResponseData>(sendedData, String(new Date().getTime()))
        }
        return {
            amount: sendedData.status ? 1 : 0
        }
    }
}