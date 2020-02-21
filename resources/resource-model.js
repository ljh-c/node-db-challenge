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

module.exports = {
  getResources,
  getResourceById,
  addResource
};