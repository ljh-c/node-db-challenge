const db = require('../data/db-config.js');

function getProjects() {
  return db('projects').map(project => {
    if (project.completed) {
      project.completed = true;
    } else {
      project.completed = false;
    }
    return project;
  });
}

function getProjectById(id) {
  return db('projects')
    .where({ id })
    .first()
    .then(project => {
      if (project.completed) {
        project.completed = true;
      } else {
        project.completed = false;
      }
      return project;
    })
    .then(async project => {
      const tasks = await db('tasks')
        .select('id', 'description', 'notes', 'completed')
        .where({ project_id: id })
        .map(task => {
          if (task.completed) {
            task.completed = true;
          } else {
            task.completed = false;
          }
          return task;
        });
      
      project.tasks = tasks;

      return project;
    })
    .then(async project => {
      const resources = await db('project_resources as pr')
        .join('resources as r', 'pr.resource_id', 'r.id')
        .select('r.id', 'r.name', 'r.description')
        .where({ project_id: id });
      
      project.resources = resources;

      return project
    });
}

function addProject(project) {
  return db('projects')
    .insert(project)
    .then(([id]) => {
      return getProjectById(id);
    });
}

module.exports = {
  getProjects,
  getProjectById,
  addProject
};