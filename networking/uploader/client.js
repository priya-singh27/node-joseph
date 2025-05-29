const net = require('net');
const fs= require('fs/promises');

const PORT =8080;
const HOST = '::1';

const socket = net.createConnection({port:PORT, host:HOST},async()=>{
    console.log(`You are connected...`);

    const fileHandler = await fs.open('test.txt','r');
    const fileStream = fileHandler.createReadStream();

    //Reading from source file  
    fileStream.on('data', (data_buffer)=>{
        if(!socket.write(data_buffer)){
            //pause reading 
            fileStream.pause();
        }
    });

    //when socket emits drain=> socket is ready 
    socket.on('drain',()=>{
        fileStream.resume();//start reading
    });

    fileStream.on('end',()=>{
        console.log('File uploaded successfully');
        socket.end();
    })

});



