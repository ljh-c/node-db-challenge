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