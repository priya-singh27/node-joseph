const http = require("http");

const port = 8080;

const server = http.createServer((req,res)=>{
    const data = {message: "Server Response"};

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Connection", "close");
    res.statusCode = 200;
    res.end(JSON.stringify(data));
});

server.listen(port,()=>{
    console.log(`Listening on ${port}`);
});
