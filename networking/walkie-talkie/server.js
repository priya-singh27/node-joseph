const net = require('net');

const PORT = 8000;
const HOST = '::1';

const clients=[];

const server = net.createServer((socket)=>{
    socket.write(`Tell nobody this secret 😉`);

    console.log(`${clients.length+1} users are online!`)
    
    clients.push(socket);
});

server.listen(PORT,HOST,()=>{
    console.log(`Listening on ${PORT}...`)
})