const net = require('net');

const socket = net.createConnection({
    host:"localhost",
    port:"8000"
}, ()=>{
    // socket.write("AB");
    const header = Buffer.from('504f5354202f6372656174652d706f737420485454502f312e310d0a436f6e74656e742d547970653a206170706c69636174696f6e2f6a736f6e0d0a6e616d653a2050726979610d0a486f73743a206c6f63616c686f73743a383030300d0a436f6e6e656374696f6e3a206b6565702d616c6976650d0a436f6e74656e742d4c656e6774683a2037380d0a0d0a', 'hex');

    const body = Buffer.from('7b227469746c65223a225243422052434220524342222c22626f6479223a2253656520686f77207465616d207265616374656420746f207468697320756e62656c69657661626c652077696e227d', 'hex')

    socket.write(Buffer.concat([header, body]));
});

socket.on('data', (chunk)=> {
    console.log("Received response: ");
    console.log(chunk.toString('utf-8'));
    console.log(chunk.toString('hex'));

    socket.end();
});

socket.on('end', ()=>{
    console.log("Connection closed");
});

