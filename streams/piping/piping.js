const fs = require('fs/promises');

(async ()=>{
    console.time("piping");
    const destFile = await fs.open('text-copy.txt', 'w');
    const srcFile = await fs.open('../writable_streams/test.txt');

    console.timeEnd("piping")
})