const db = require('../data/db-config.js');

function getResources() {
  return db('resources');
}

function getResourceById(id) {
  return db('resources')
    .where({ id })
    .first();
}

function addResource(resource) {
  return db('resources')
    .insert(resource)
    .then(([id]) => {
      return getResourceById(id);
    });
}

function addResourceToProject(requisition) {
  return db('project_resources')
    .insert(requisition)
    .then(id => {
      return id;
    });
}

function getProjectReqs(project_id) {
  return db('project_resources')
    .where({ project_id: project_id });
}

module.exports = {
  getResources,
  getResourceById,
  addResource,
  addResourceToProject,
  getProjectReqs
};