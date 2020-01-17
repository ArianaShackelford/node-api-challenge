const express = require('express');
const router = require('./router');


const server = express();

server.use(express.json());
server.use('/api', router);
server.use(logger); 


server.get('/', (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
  });

function logger(req, res, next) {
    // console.log(req);
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url}`)
    next();
  }

module.exports = server;