const fs = require('fs/promises');
// const fs = require('fs');

// (async ()=>{
//     console.time('flag');

//     const fileHandler = await fs.open('test.txt', 'w');

//     for(let i=0; i<1000000; i++){
//         await fileHandler.write(`${i}`);
//     }

//     console.timeEnd('flag');
// })();

// (async ()=>{
//     console.time('flag');

//     fs.open('test.txt', 'w', (err, fileDescriptor)=>{
        
//         for(let i=0; i<1000000; i++){
//             const buff= Buffer.from(` ${i} `,'utf-8');
//             fs.writeSync(fileDescriptor, buff);
//             // fs.write(fileDescriptor,` ${i} `,()=>{});
//         }
//     });

//     console.timeEnd('flag');
// })();

/* Streams */
(async ()=>{
    console.time('flag');

    const fileHandler = await fs.open('test.txt', 'w');

    const stream = fileHandler.createWriteStream();
    for(let i=0; i<1000000; i++){
        const buff= Buffer.from(` ${i} `,'utf-8');
        stream.write(buff);
    }

    console.timeEnd('flag');
})();