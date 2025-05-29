const net = require("net");
const fs = require('fs/promises');

const PORT =8080;
const HOST = '::1';

let fileHandler =null;
let fileStream = null; 

const server = net.createServer((socket)=>{
    console.log("New connection!");

    
    socket.on('data', async (data_buffer)=>{
        //data is buffer that holds the content of the file
        if(!fileHandler){
            socket.pause();//pause receiving data from the client
            fileHandler = await fs.open('storage/test.txt', 'w');
            
            //create stream of this file
            fileStream = fileHandler.createWriteStream();

            fileStream.write(data_buffer);

            socket.resume();//resume receiving data from the client

            fileStream.on('drain',()=>{
                socket.resume();
            });
            
        }else{

            //Writing to our destination file
            if(!fileStream.write(data_buffer)){
                socket.pause();//stop reading 
            }
            
        } 

    });

    socket.on('end', ()=>{//this event occuring when client-side socket closes
        fileHandler.close();
        fileHandler =null;
        fileStream=null;
        console.log(`Connection ended!`);
    })

});

server.listen(PORT, HOST, ()=>{
    const address = server.address()
    console.log(`Server is listening on ${JSON.stringify(address)}`)
})