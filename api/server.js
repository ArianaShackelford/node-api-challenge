const express = require('express');
const router = require('./router');
const server = express();

server.use('/api', router);
server.use(express.json());
server.use(logger); 

function logger(req, res, next) {
    // console.log(req);
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url}`)
    next();
  }

module.exports = server;