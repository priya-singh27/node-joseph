import fs from 'fs/promises'
import { resolve } from 'path';

console.log(process.pid);
(async ()=>{
    
    console.time('flag');

    const fileHandler = await fs.open('test.txt', 'w');

    const stream = fileHandler.createWriteStream();
    console.log(stream.writableHighWaterMark);//size of internal buffer(chunk)

    // const buff = Buffer.alloc(4, '😅','utf-8');//stream.writableHighWaterMark = 65536
    
    // console.log(stream.write(buff));

    let i=0; 
    function writeMany() {
        while(i<10000000000){
            const buff= Buffer.from(`${i} `,'utf-8');
            if(!stream.write(buff)){
                //buffer was drained and it got emptied so stream.writableLength=0 => how much of this buffer is filled
                break;
            }
            i++;
        }
    }

    writeMany();

    stream.on('drain',()=>{
        writeMany();
    })

    stream.on('close',()=>{
        console.timeEnd('flag');
    });
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