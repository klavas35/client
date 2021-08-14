const fs = require('fs');
module.exports= {
    devServer:{
        open:process.platform === 'darwin',
        host:'0.0.0.0',
        port:8080,
        https:{
            key: fs.readFileSync('/home/silverdrop/Documents/Javascript/FormProject/client/localhost-key.pem'),
            cert: fs.readFileSync('/home/silverdrop/Documents/Javascript/FormProject/client/localhost.pem')
        },
        hotOnly:false,
    },
};