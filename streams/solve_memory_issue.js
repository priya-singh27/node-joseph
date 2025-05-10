import fs from 'fs/promises'
import { resolve } from 'path';

(async ()=>{
    
    console.time('flag');

    const fileHandler = await fs.open('test.txt', 'w');

    const stream = fileHandler.createWriteStream();
    console.log(stream.writableHighWaterMark);//size of internal buffer(chunk)

    // const buff = Buffer.alloc(65536, 'A');//stream.writableHighWaterMark = 65536
    
    // console.log(stream.write(buff));

    async function writeDate() {
        for(let i=0; i<1000000; i++){
            const buff= Buffer.from(`${i} `,'utf-8');
            
            if(!stream.write(buff)){
                //buffer was drained and it got emptied so stream.writableLength=0 => how much of this buffer is filled
                console.log(`Draining!!`);//105
                await new Promise(resolve=>stream.once('drain',resolve))
            }
        }
    }

    await writeDate();

    stream.end();

    console.timeEnd('flag');
})();


// (async ()=>{
//     console.time('flag');

//     const fileHandler = await fs.open('test.txt', 'w');

//     const stream = fileHandler.createWriteStream();

//     console.log(stream.writableHighWaterMark);//size of internal buffer(chunk)
//     console.log(stream.writableLength);//how much of this buffer is filled 

//     const buffer = Buffer.from('A','ascii')
//     console.log(buffer)
//     const notFull = stream.write(buffer);
//     console.log(notFull);
//     console.log(stream.writableLength);

//     // for(let i=0; i<1000000; i++){
//     //     const buff= Buffer.from(` ${i} `,'utf-8');
//     //     stream.write(buff);
//     // }

//     console.timeEnd('flag');
// })();