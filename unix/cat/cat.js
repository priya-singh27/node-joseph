const {stdin, stdout, stderr, argv, exit} =require('node:process')
const fs = require('node:fs');

//grab the first argument, and output file content to stdout 
const filePath = argv[2];

if(filePath){
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(stdout);
    fileStream.on('end', ()=>{
        stdout.write('\n')
        exit(0);//code 0 means=> everything worked fine for this process
    });
}

stdin.pipe(stdout);//handle draining
// stdin.on('data',(data)=>{
//     stdout.write(data.toString('utf-8').toUpperCase());
// });
