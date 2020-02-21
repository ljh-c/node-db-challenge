const express = require('express');
const server = express();
const resourceRouter = require('./resources/resource-router.js');
const projectRouter = require('./projects/project-router.js');
const taskRouter = require('./tasks/task-router.js')

server.use(express.json());

server.use('/api/resources', resourceRouter);
server.use('/api/projects', projectRouter);
server.use('/api/tasks', taskRouter);

server.get('/', (req, res) => {
  res.send('<h1>Database Persistence Sprint</h1>');
});

module.exports = server;