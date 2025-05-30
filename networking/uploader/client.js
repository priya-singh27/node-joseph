const net = require('net');
const fs= require('fs/promises');
const path = require('path');
const readline = require("readline/promises");

const PORT =8080;
// const HOST = '::1';
const HOST = process.env.CLIENT_HOST;



const clearLine = (dir)=>{
    return new Promise((resolve,reject)=>{
        process.stdout.clearLine(dir, ()=>{
            resolve();
        })

    });
} 

const moveCursor = (dx, dy)=>{
    return new Promise((resolve,reject)=>{
        process.stdout.moveCursor(dx,dy,()=>{
            resolve();
        })
    })
}

const socket = net.createConnection({port:PORT, host:HOST},async ()=>{
    console.log(`You are connected...`);

    console.log(); //new line that we can remove and display progress percentage nicely

    const filePath = process.argv[2];
    const fileName = path.basename(filePath);
    const fileHandler = await fs.open(filePath,'r');
    const fileReadStream = fileHandler.createReadStream();
    const fileSize = (await fileHandler.stat()).size;

    //for showing upload percentage
    let uploadedPercentage = 0;
    let bytesUploaded = 0;


    socket.write(`fileName: ${fileName}-------`)

    //Reading from source file  
    fileReadStream.on('data', (data_buffer)=>{

        if(!socket.write(data_buffer)){
            //pause reading 
            fileReadStream.pause();
        }

        bytesUploaded += data_buffer.length;//add number of bytes read to the variable
        let newPercenatge = Math.floor((bytesUploaded/fileSize)*100);

        if(newPercenatge!== uploadedPercentage){
            uploadedPercentage = newPercenatge;
            moveCursor(0,-1);
            clearLine(0);
            console.log(`Uploading... ${uploadedPercentage}%`);
        }
    });

    //when socket emits drain=> socket is ready 
    socket.on('drain',()=>{
        fileReadStream.resume();//start reading
    });

    fileReadStream.on('end',()=>{
        console.log('File uploaded successfully');
        socket.end();
    })

});



