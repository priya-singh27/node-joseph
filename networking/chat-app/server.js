const net = require("net");
const server = net.createServer();

const colors = {
    join: '\x1b[32m',    
    leave: '\x1b[31m',   
    message: '\x1b[36m', 
    reset: '\x1b[0m'
};

require('dotenv').config();
const HOST = process.env.SERVER_HOST;
const PORT = process.env.SERVER_PORT;

//an array of client sockets
const clients = []

server.on("connection", (socket)=>{
    const clientID = clients.length+1;

    socket.write(`id-${clientID}`);

    //Broadcasting a message to everyone that someone joined the chat room
    clients.map((client)=>{
        client.socket.write(`${colors.join}User: ${clientID} joined!${colors.reset}`);
    });

    socket.on("data", (data)=>{
        const data_str = data.toString();
        const id = data_str.substring(0, data_str.indexOf('-'));
        const message = data_str.substring(data_str.indexOf('message-')+8);

        clients.map((client)=>{
            client.socket.write(`${colors.message}> User ${id}: ${message}${colors.reset}`);
        })
        console.log(data.toString("utf-8"));

        // socket.write(data);//send message to the client
    });

    //Broadcasting a message to everyone that someone left the chat room
    socket.on("end",()=>{
        const clientIndex = clients.findIndex(client => client.id === clientID.toString());
        if (clientIndex !== -1) {
            clients.splice(clientIndex, 1);
        }

        clients.map((client)=>{
            client.socket.write(`${colors.leave}User ${clientID}: left!${colors.reset}`);
        })
    })

    clients.push({id:clientID.toString(), socket});
});

server.listen(PORT, HOST ,()=>{
     console.log(server.address());
    // console.log(`${JSON.stringify(server.address())}`);
});