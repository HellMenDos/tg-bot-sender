[Link to the documentation](https://magnificent-maamoul-2f7a55.netlify.app/)
# Nodejs
How to install ?
```npm
npm i tg-bot-sender
```
## Imports 
```typescript
import { TelegaSender, Methods, Data } from "tg-bot-sender";
```
The structure of the Data message
```
type Data = {
    text: string,
    photo?: string,
    buttons?: {
        buttonTitle: string,
        buttonUrl: string
    }[]
}
```
Response structure
```json
{ "amount": 0 } // number of messages sent
```
## Getting started
The logs parameter indicates that logs are saved in json format
```typescript
const tg = new TelegaSender(telegramToken, pathForLogs, logs = false)
```
## Options for sending messages
Sending photos
```typescript
Methods.sendPhoto
```
#### sendFromIds - sending to users
```typescript
tg.sendFromIds([...telegramUserIds], {
    text: 'Hello',
    photo: 'Photo link',
    buttons:[{
        buttonTitle: 'Hello',
        buttonUrl: 'https://google.com'
    }]
}, Methods.sendPhoto)
    .then((res: any) => console.log(res))
    .catch((err: any) => console.log(err))
```
#### sendFromId - sending to the user
```typescript
tg.sendFromIds(telegramUserId, {
    text: 'Hello',
    photo: 'Photo link',
    buttons:[{
        buttonTitle: 'Hello',
        buttonUrl: 'https://google.com'
    }]
}, Methods.sendPhoto)
    .then((res: any) => console.log(res))
    .catch((err: any) => console.log(err))
```

Sending a message
```typescript
Methods.sendMessage
```
#### sendFromIds - sending to users
```typescript
tg.sendFromIds([...telegramUserIds], {
    text: 'Hello',
    buttons:[{
        buttonTitle: 'Hello',
        buttonUrl: 'https://google.com'
    }]
}, Methods.sendMessage)
    .then((res: any) => console.log(res))
    .catch((err: any) => console.log(err))
```
#### sendFromId - sending to the user
```typescript
tg.sendFromIds(telegramUserId, {
    text: 'Hello',
    buttons:[{
        buttonTitle: 'Hello',
        buttonUrl: 'https://google.com'
    }]
}, Methods.sendPhoto)
    .then((res: any) => console.log(res))
    .catch((err: any) => console.log(err))
```

