const fs = require('fs');
const buffer_of_content = fs.readFileSync('./text.txt');
/**
 * file content: "ABCD"
 * Ascii value of A:(65)=(41)_16 = (0100 0001)_2
 * so buffer_of_content = <Buffer 41 42 43 44>
 */
console.log(buffer_of_content);
console.log(buffer_of_content.toString("utf-8"))