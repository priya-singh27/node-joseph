const {stdin ,stdout, stderr, argv} = require('node:process');
const fs = require('node:fs');

const arg = argv[2];
console.log(arg);
console.log(`Process id of number_formatter.js: ${process.pid}`);

const fileStream = fs.createWriteStream(arg);
stdin.on('data',(chunk)=>{
    const str = chunk.toString('utf-8');
    const processed_chunk = str.split(" ").map(ele=>'$'+ele).join(" ");
    if(!fileStream.write(processed_chunk)){
        stdin.pause();
        fileStream.once('drain', ()=>{
            stdin.resume();
        });
    }
});




