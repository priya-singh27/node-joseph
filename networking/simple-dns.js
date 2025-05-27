const dns = require('dns/promises');

(async ()=>{
    const result = await dns.lookup("flipkart.com");
    console.log(result);
})()