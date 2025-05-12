const fs=require('fs/promises');

// (async ()=>{
//     const destFile = await fs.open('text-copy.txt', 'w');
//     const result = await fs.readFile('../writable_streams/test.txt');
//     await destFile.write(result)
//     console.log(result)


// })();


(async ()=>{
    console.time('copy');

    const destFile = await fs.open('text-copy.txt', 'w');
    const srcFile = await fs.open('../writable_streams/test.txt');

    let bytesRead=-1;
    
    while(bytesRead){
        const readResult = await srcFile.read();//{bytesRead: ,buffer: }
        bytesRead =readResult.bytesRead;

        console.log(readResult.buffer)
        destFile.write(readResult.buffer);
    }

    console.timeEnd('copy');
})();