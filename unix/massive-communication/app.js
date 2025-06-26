const {spawn} = require('node:child_process');
const fs = require('node:fs');

console.log(`Process id of app.js: ${process.pid}`);

// const numberFormatter = spawn("node", ["number_formatter.js","./dest.txt", "$", ","]);
const numberFormatter = spawn("./number_formatter", ["./dest.txt", "$", ","]);


numberFormatter.stdout.on('data', (data)=>{
    console.log(`stdout: ${data}`);
});

numberFormatter.stderr.on('data', (data)=>{
    console.log(`stderr: ${data}`);
});

numberFormatter.on('close',(code)=>{
    if(code===0) console.log("The file was read, preocessed and written successfully");
    else console.log("Something went wrong");
});
//  ./test.txt
const fileStream = fs.createReadStream("./test.txt");
fileStream.pipe(numberFormatter.stdin);


