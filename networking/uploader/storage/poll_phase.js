const fs = require('fs');

fs.readFile(__filename,()=>{
    console.log("file read");
});

setImmediate(()=> console.log("setImmediate"));

setTimeout(()=>{
    console.log("setTimeout");
},15);

process.nextTick(()=>{
    console.log("Nextick")
})
