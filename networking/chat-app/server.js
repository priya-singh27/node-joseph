const net = require("net");
const server = net.createServer();

//an array of client sockets
const clients = []

server.on("connection", (socket)=>{
    const clientID = clients.length+1;

    socket.write(`id-${clientID}`);

    socket.on("data", (data)=>{
        const data_str = data.toString();
        const id = data_str.substring(0, data_str.indexOf('-'));
        const message = data_str.substring(data_str.indexOf('message-')+8);

        clients.map((client)=>{
            client.socket.write(`> User ${id}: ${message}`);
        })
        console.log(data.toString("utf-8"));

        // socket.write(data);//send message to the client
    });
    clients.push({id:clientID.toString(), socket});
});

server.listen(8080, '127.0.0.1' ,()=>{
     console.log(server.address());
    // console.log(`${JSON.stringify(server.address())}`);
});