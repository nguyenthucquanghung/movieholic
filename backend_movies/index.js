const http = require('http');

const routes = require('./routes');
const router = require('./router');
const cors = require("cors")
process.on('uncaughtException', function (err) {
    // handle the error safely
    console.log('uncaughtException');
    console.error(err.stack);
    console.log(err);
});


const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PATCH, DELETE, POST, OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Max-Age', 2592000);
    await router(req, res, routes);
    }
);

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});