const db = require('../data/db-config.js');

function getTasks() {
  return db('tasks as t')
  .join('projects as p', 't.project_id', 'p.id')
  .select('t.id', 
    'p.name as project_name', 
    'p.description as project_description', 
    't.notes', 
    't.description', 
    't.completed'
  ).map(task => {
    if (task.completed) {
      task.completed = true;
    } else {
      task.completed = false;
    }
    return task;
  });
}

function getTaskById(id) {
  return db('tasks')
    .where({ id })
    .first()
    .then(task => {
      if (task.completed) {
        task.completed = true;
      } else {
        task.completed = false;
      }
      return task;
    });
}

function addTask(task) {
  return db('tasks')
    .insert(task)
    .then(([id]) => {
      return getTaskById(id);
    });
}

module.exports = {
  getTasks,
  getTaskById,
  addTask
};