const http = require('node:http');
const fs = require('node:fs/promises');

const server  =  http.createServer();

server.on("request", async(req,res)=>{
    if(req.url=== "/" && req.method === "GET"){
        res.setHeader("content-type", "text/html");

        const fileHandler = await fs.open('./public/index.html', 'r');

        const readStream = fileHandler.createReadStream();

        //USING PIPE
        readStream.pipe(res);

        // readStream.on('data', (chunk)=>{

        //     if(!res.write(chunk)){
        //         readStream.pause();
        //     }

        // });
        
        // res.on('drain', ()=>{
        //     readStream.resume();
        // });

        // readStream.on('end', () => {
        //     res.end();
        //     fileHandler.close();
        // });
    }
})

server.listen(9000, ()=>{
    console.log("Listening on 9000")
})