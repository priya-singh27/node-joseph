const cpeak = require("cpeak");

const server = new cpeak();

console.log(`Process id: ${process.pid}`);

server.route("get", "/", (req,res)=>{
    process.send({action:"request"});
    res.json({message:"Successful Response"});
});

server.route("get", "/heavy", (req, res)=>{
    process.send({action:"request"});
    for(let i=0; i<100000000000; i++){
    }

    res.json({message:"Heavy operation is done!!"})
})

const PORT =5000;
server.listen(PORT, ()=>{
    console.log(`Listening on ${PORT}...`);
});