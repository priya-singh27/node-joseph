const cluster = require("node:cluster");

const coresCount= require("node:os").availableParallelism();
if(cluster.isPrimary){
    let numOfRequests = 0;
    setInterval(()=>{
        console.log(`Total number of requests: ${numOfRequests}`);
    },5000)

    console.log(`Parent Process id: ${process.pid}`);
    for(let i=0; i<coresCount; i++){
        const child_process = cluster.fork();
        console.log(`${i} Parent process spawned a new child process with PID: ${child_process.process.pid}`);
    }

    cluster.on("exit", (worker, code, signal)=>{
        console.log(`Worker ${worker.process.pid} ${signal || code} died. Restarting...`);

        // if(code !== 0) cluster.fork();
        cluster.fork();
    });

    cluster.on("message", (worker, message)=>{
        if(message.action && message.action === "request"){
            console.log(`Reqest received by ${worker.process.pid}`)
            numOfRequests++;
        }
    })
}else{
    //if this is child process start server
    require('./server');
}