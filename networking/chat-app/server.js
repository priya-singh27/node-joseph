const net = require("net");

const server = net.createServer();

//an array of client sockets
const clients = []

server.on("connection", (socket)=>{
    socket.on("data", (data)=>{
        clients.map((socket)=>{
            socket.write(data);
        })
        console.log(data.toString("utf-8"));

        // socket.write(data);//send message to the client
    });
    clients.push(socket);
});

server.listen(8080, '127.0.0.1' ,()=>{
     console.log(server.address());
    // console.log(`${JSON.stringify(server.address())}`);
});