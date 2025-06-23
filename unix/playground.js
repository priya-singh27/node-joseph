const {spawn} = require('node:child_process');
const {stdin, stdout, stderr} = require('node:process');

//stdin, stdout, stderr
stdin.on('data', (data)=>{
    // console.log("Got data from stdin: ", data.toString('utf-8'));
    stdout.write(`Got data from stdin: ${data.toString('utf-8')}\n`)
});
// stdout.write("Writing to a writeable stream!");
// stderr.write("The stderr text!!");

//process id,command argument
// console.log(process.argv);
// console.log(process.pid);
// console.log(process.ppid);

//environment variables
// console.log(process.env)

//spawning
// const subProcess = spawn("/home/priya/DSA/c++/containers",["first thing first"]);

// subProcess.stdout.on("data", (data)=>{
//     console.log(data.toString("utf-8"));
// });

// subProcess.stdin.write('Some text that is coming from node!')

/**
 *Output Rediect 
 */

//  0<piping.txt node playground.js>redirect.txt
// priya@unix> <piping.txt node playground.js>redirect.txt
// priya@unix> <piping.txt node playground.js>>redirect.txt
