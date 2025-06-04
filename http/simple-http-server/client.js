const http = require('node:http')

const agent = new http.Agent({keepAlive: true});//agent corresponds to our tcp connection, the actual http message is being sent on top of this tcp connection 

const request = http.request({//request object is a duplex stream
    agent: agent,
    hostname: "localhost",
    port: 8000,
    method: "POST",
    path: "/create-post",
    headers:{
        "Content-Type": "application/json",
        /**
         * content-length: specify length of body in bytes
         * or you can specify
         * transfer-encoding
         */

        name: "Priya"
    }
});

request.on("response", (response)=>{//this will be fired only once: 'response' is an IncomingMessage (readable stream) for the server's reply.
  console.log(response.statusCode);
  console.log(response.headers);
  response.on('data',(chunk)=>{
    console.log(chunk.toString('utf-8'))
  })

  response.on('end', ()=>{
    console.log("No more data in response")
  });
});

request.end(JSON.stringify({title: "RCB RCB RCB", body:"See how team reacted to this unbelievable win"}));

// request.write(JSON.stringify({title: "RCB RCB RCB"}));

// request.end(JSON.stringify({body:"See how team reacted to this unbelievable win"}));



