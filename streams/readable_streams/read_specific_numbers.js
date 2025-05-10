const fs= require('fs/promises');

(async ()=>{
    const readFileHandler = await fs.open('../writable_streams/test.txt', 'r');
    const writeFileHandler = await fs.open('destination.txt','w');

    const streamRead = readFileHandler.createReadStream();
    const streamWrite = writeFileHandler.createWriteStream();

    streamRead.on('data',(chunk)=>{
        const numbers = chunk.split('  ');
        console.log(numbers);
        if(!streamWrite.write(chunk)){
            streamRead.pause();
        }
    });

    streamWrite.on('drain',()=>{
        streamRead.resume();
    });

    
})();