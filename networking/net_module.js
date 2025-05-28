const net =require('net');

const server = net.createServer((server_socket)=>{
    console.log(server_socket);
})

const client = net.createConnection()

server.listen(8000,()=>{
    console.log(`Listening on port 8000...`)
})