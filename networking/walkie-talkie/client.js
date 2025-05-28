const net = require('net');

const PORT = 8000;
const HOST = '::1';



const socket = net.createConnection({port:PORT,host:HOST},()=>{
    console.log(`Connected to the server...`)
});

socket.on('data',(data)=>{
    console.log(`Server said: ${data}`);
})