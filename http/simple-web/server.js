const http = require('node:http');
const fs = require('node:fs/promises');

const server  =  http.createServer();//extends net.server which extends EventEmitter 

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

    if(req.url === '/styles.css' && req.method === 'GET'){
        res.setHeader("content-type", "text/css");

        const fileHandler = await fs.open('./public/styles.css', 'r');
        const readStream = fileHandler.createReadStream();

        readStream.pipe(res);
    }

    if(req.url === '/script.js' && req.method === 'GET'){
        res.setHeader("content-type", "application/javascript");

        const fileHandler = await fs.open('./public/script.js', 'r');
        const readStream = fileHandler.createReadStream();

        readStream.pipe(res);
    }

    if(req.url === '/login' && req.method === 'POST'){
        res.setHeader("content-type", "application/javascript");
        res.statusCode = 200;

        const body = {
            message : "User created!"
        }//js object

        res.write(JSON.stringify(body));//js object -> json string
    }

    if(req.url === '/upload' && req.method === 'PUT'){

        const fileHandler = await fs.open('./storage/img.png', 'w');//this will create new file in storage folder

        const writeStream = fileHandler.createWriteStream();

        req.pipe(writeStream);

        res.setHeader("content-type", "application/javascript");

        req.on('end', ()=>{//end event: when the reading is done
            res.end(
                JSON.stringify({message : "File uploaded successfully"})
            );
        });
    }
});


server.listen(9000, ()=>{
    console.log("Listening on 9000")
})