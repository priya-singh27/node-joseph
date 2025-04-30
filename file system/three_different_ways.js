const fs = require('fs/promises');
// const fs = require('fs');

// ***** Promise API ***** //
(async() =>{
    try{
        // await fs.writeFile('./write.txt', "Hi!");

        // await fs.writeFile('./write.txt', "Hi!");
        const buffer = Buffer.from("Hi! Priya. I hope you are enjoying.");
        // console.log(buffer)
        // fs.writeFile('./write_buffer.txt', buffer);

        const fileHandle = await fs.open('./write_buffer.txt', 'a');
        await fileHandle.write(buffer, 4, buffer.length-4)//filehandle.write(buffer, offset: from where in buffer , length, position: from where in file we should write); buffer.length=  number of bytes in the buffer

        await fileHandle.close();

    }catch(err){

        console.log("Ohh no some error occured", err)
    }
})();


