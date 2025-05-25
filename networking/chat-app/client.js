const net = require("net");
const readline = require("readline/promises");

require('dotenv').config();
const HOST = process.env.CLIENT_HOST;
const PORT = process.env.CLIENT_PORT;

let id;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const clearLine = (dir)=>{
    return new Promise((resolve,reject)=>{
        process.stdout.clearLine(dir, ()=>{
            resolve();
        })

    });
} 

const moveCursor = (dx, dy)=>{
    return new Promise((resolve,reject)=>{
        process.stdout.moveCursor(dx,dy,()=>{
            resolve();
        })
    })
}

const socket = net.createConnection({host:HOST, port: PORT}, async ()=>{
    console.log("Connected to the server");

    const ask = async()=>{
        const message = await rl.question("Enter your message> ");
        
        //move the cursor one line up
        await moveCursor(0, -1);

        //clear the current line that the cursor is in 
        await clearLine(0);
        const buffer = Buffer.from(message);
        socket.write(`${id}-message- ${buffer.toString('utf-8')}`);//send message to the server
    }

    ask();
    // socket.write(message);//we are writing string but it will be converted to buffer, we can alos convert to buffer and write. Let's do that

    //get data from the server and then log it
    socket.on("data",async(data)=>{

        console.log();
        await moveCursor(0, -1);
        await clearLine(0);

        if(data.toString("utf-8").includes("id-")){
            //when we are getting id from server
            id = data.toString().substring(3);
            console.log(`Your id is ${id}!\n`); 
        }else{
            //when we get message from server
            console.log(data.toString("utf-8"));
        }

        ask();
    });
});


socket.on("end", ()=>{
    console.log("Connection ended!")
});

