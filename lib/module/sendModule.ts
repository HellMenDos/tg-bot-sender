import { Const } from './../const.js';
import fetch from 'node-fetch';

export enum Methods {
    sendPhoto = 'sendPhoto',
    sendMessage = 'sendMessage'
}

export type Data = {
    text: string,
    photo?: string,
    buttons?: {
        buttonTitle: string,
        buttonUrl: string
    }[]
}
 
export type Status = {
    userId: number,
    status: boolean,
    resData: unknown
}

interface ISendMessage {
    changeMethod(method: Methods): void,
    sendMessage(userId: number, data: Data): Promise<Status>
    sendMessages(userIds: number[], data: Data): Promise<Status[]>
}

interface ISendMessagePayload {
    chat_id: number,
    parse_mode: 'HTML' | 'MarkdownV2',
    text: string,
    reply_markup?: string
}

interface ISendPhotoPayload {
    chat_id: number,
    parse_mode: 'HTML' | 'MarkdownV2',
    caption: string,
    photo: string,
    reply_markup?: string
}

type Payload<T extends Methods> = T extends Methods.sendMessage ? ISendMessagePayload : ISendPhotoPayload

export class SendMessage implements ISendMessage {
    private telegaToken: string;
    private method: Methods = Methods.sendMessage
    
    constructor(telegaToken: string, method: Methods) {
        this.telegaToken = telegaToken
        this.method = method
    }

    public changeMethod(method: Methods) {
        this.method = method
    }

    private telegaUrl() {
        return `${Const.TELEGA_URL}${this.telegaToken}/${this.method}`
    }

    public async sendMessage(userId: number, data: Data, mode: 'HTML' | 'MarkdownV2' = 'HTML') {
        try {
            const payload: Payload<Methods> = {
                chat_id: userId,
                parse_mode: mode,
                ...(!data?.photo ? {
                    text: data.text
                } : {
                    caption: data.text,
                    photo: data.photo
                })
            }

            if (data.buttons.length) {
                payload.reply_markup = JSON.stringify({ 
                    inline_keyboard: data.buttons.map((item) => [{
                        text: item.buttonTitle,
                        url: item.buttonUrl
                    }])
                })
            }
        
            const response = await fetch(this.telegaUrl(), {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
            
            const resData = await response.json()
            return {
                userId,
                status: true,
                resData
            }
        } catch(err: unknown) {
            return {
                userId,
                status: false,
                resData: err
            }
        }
    }

    public async sendMessages(userIds: number[], data: Data, mode: 'HTML' | 'MarkdownV2' = 'HTML') {
        try {
            let response: Status[] = [];
            
            for(let userId of userIds) {
                const messageData = await this.sendMessage(userId, data, mode)
                response.push(messageData)
            }
    
            return response
        } catch (err: unknown) {
            throw new Error(`Terminal error: ${err}`)
        }
    }
}