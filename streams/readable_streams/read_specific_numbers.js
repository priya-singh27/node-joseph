const fs= require('fs/promises');

(async ()=>{
    console.time("readBig");
    const readFileHandler = await fs.open('../writable_streams/test.txt', 'r');
    const writeFileHandler = await fs.open('read_big.txt','w');
    // const writeFileHandler = await fs.open('destination.txt','w');

    const streamRead = readFileHandler.createReadStream();
    const streamWrite = writeFileHandler.createWriteStream();

    let incomplete_num = '';
    streamRead.on('data',(chunk)=>{
        const numbers = chunk.toString("utf-8").split(' ');
        // console.log(numbers);
        if(Number(numbers[0]) !== Number(numbers[1]-1)){
            if(incomplete_num) numbers[0]=incomplete_num.trim() + numbers[0].trim();
        }
        if(Number(numbers[numbers.length-2])+1 !== Number(numbers[numbers.length-1])){
            incomplete_num = numbers.pop()
        }

        console.log(numbers);

        numbers.forEach((num)=>{
            let n = Number(num);
            if(n%2==0 ){
                if(!streamWrite.write(" "+n+" ")){
                    streamRead.pause();
                }
            }
        })

        if(!streamWrite.write(chunk)){
            streamRead.pause();
        }
    });

    streamWrite.on('drain',()=>{
        streamRead.resume();
    });

    streamRead.on('end',()=>{
        console.log('Done reading!');
        console.timeEnd("readBig");
    })
    
})();