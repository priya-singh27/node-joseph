import fs from 'fs/promises'
import { openSync } from 'fs';

(async ()=>{

    console.time('flag');

    const fileHandler = await fs.open('test.txt', 'w');

    const stream = fileHandler.createWriteStream();
    console.log(stream.writableHighWaterMark);//size of internal buffer(chunk)

    const buff = Buffer.alloc(1000, 'A');// 1MB = 

    console.timeEnd('flag');
})();
