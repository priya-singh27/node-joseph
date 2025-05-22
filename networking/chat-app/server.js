const net = require("net");

const server = net.createServer();

server.on("connection", (socket)=>{
    console.log("A new connection received!");
});

server.listen(8080, '127.0.0.1' ,()=>{
     console.log(server.address());
    // console.log(`${JSON.stringify(server.address())}`);
});