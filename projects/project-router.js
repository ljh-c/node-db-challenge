const express = require('express');
const router = express.Router();
const Projects = require('./project-model.js');
const Resources = require('../resources/resource-model.js');

router.get('/', async (req, res) => {
  try {
    res.status(200).json(await Projects.getProjects());
  }
  catch (err) {
    res.status(500).json({ error: 'Failed to get list of projects.', msg: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await Projects.getProjectById(req.params.id);

    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: 'Could not find project with the given id.' })
    }
  }
  catch (err) {
    res.status(500).json({ error: 'Failed to get project.', msg: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    res.status(200).json(await Projects.addProject(req.body));
  }
  catch (err) {
    res.status(500).json({ error: 'Failed to add project.', msg: err.message });
  }
});

router.get('/:id/resources', async (req, res) => {
  try {
    res.status(200).json(await Resources.getProjectReqs(req.params.id));
  }
  catch (err) {
    res.status(500).json({ error: 'Failed to get resources for a project.', msg: err.message });
  }
});

router.post('/:id/resources', async (req, res) => {
  try {
    req.body.project_id = req.params.id;
    res.status(200).json(await Resources.addResourceToProject(req.body));
  }
  catch (err) {
    res.status(500).json({ error: 'Failed to add resource to project.', msg: err.message });
  }
});

module.exports = router;