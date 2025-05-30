const net = require("net");
const fs = require('fs/promises');

const PORT =8080;
// const HOST = '::1';
const HOST = process.env.SERVER_HOST;


const server = net.createServer((socket)=>{
    console.log("New connection!");
    let fileHandler =null;
    let fileStream = null; 

    
    socket.on('data', async (data_buffer)=>{
        //data is buffer that holds the content of the file
        if(!fileHandler){
            socket.pause();//pause receiving data from the client

            const indexOfDivider = data_buffer.toString().indexOf("-------");
            const fileName = data_buffer.toString('utf-8').substring(10,indexOfDivider);

            console.log(fileName);
            fileHandler = await fs.open(`storage/${fileName}`, 'w');
            
            //create stream of this file
            fileStream = fileHandler.createWriteStream();

            //writing to our destination file, discard the header= fileName: ${fileName}-------
            fileStream.write(data_buffer.subarray(indexOfDivider+7));

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
        if(fileHandler) fileHandler.close();
        fileHandler =null;
        fileStream=null;
        console.log(`Connection ended!`);
    })

});

server.listen(PORT, HOST, ()=>{
    const address = server.address()
    console.log(`Server is listening on ${JSON.stringify(address)}`)
})