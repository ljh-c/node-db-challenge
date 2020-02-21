const express = require('express');
const server = express();
const resourceRouter = require('./resources/resource-router.js');

server.use(express.json());

server.use('/api/resources', resourceRouter);

server.get('/', (req, res) => {
  res.send('<h1>Database Persistence Sprint</h1>');
});

module.exports = server;