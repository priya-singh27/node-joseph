const http = require('node:http')

const agent = new http.Agent({keepAlive: true});//agent corresponds to our tcp connection, the actual http message is being sent on top of this tcp connection 

const request = http.request({//request object is a duplex stream
    agent: agent,
    hostname: "localhost",
    port: 8000,
    method: "POST",
    path: "/create-post",
    headers:{
        "Content-Type": "application/json"
        /**
         * content-length: specify length of body in bytes
         * or you can specify
         * transfer-encoding
         */
    }
});

request.on("response", (response)=>{//this will be fired only once: 'response' is an IncomingMessage (readable stream) for the server's reply.
    console.log(`RESPONSE: ${response}`);
});

request.write(JSON.stringify({name: "Priya", message:"How are you?"}));

request.end(JSON.stringify({message:"END"}));



