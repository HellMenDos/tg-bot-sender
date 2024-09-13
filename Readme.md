# Документация
Как установить ?
```npm
npm i tg-bot-sender
```
## Импорты 
```typescript
import { TelegaSender, Methods } from "tg-bot-sender";
```
## Начало работы
logs параметр указывает на сохранения логов в json формате
```typescript
const tg = new TelegaSender(telegramToken, pathForLogs, logs = false)
```
## Варианты отправки сообщений
Отправка фото
```typescript
Methods.sendPhoto
```
#### sendFromIds - отправка пользователям
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
#### sendFromId - отправка пользователю
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

Отправка сообщения 
```typescript
Methods.sendMessage
```
#### sendFromIds - отправка пользователям
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
#### sendFromId - отправка пользователю
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

