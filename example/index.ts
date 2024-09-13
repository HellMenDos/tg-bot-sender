import { TelegaSender } from "../index.js";
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Methods } from "../lib/module/sendModule.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tg = new TelegaSender('*', __dirname)

tg.sendFromIds([1,2], {
    text: 'Helllo',
    photo: 'https://get.wallhere.com/photo/landscape-mountains-lake-nature-reflection-grass-sky-river-national-park-valley-wilderness-Alps-tree-autumn-leaf-mountain-season-tarn-loch-mountainous-landforms-mountain-range-590185.jpg',
    buttons:[{
        buttonTitle: 'Hello',
        buttonUrl: 'https://google.com'
    }]
}, Methods.sendPhoto).then(res => console.log(res)).catch(err => console.log(err))


