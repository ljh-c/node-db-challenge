const express = require('express');
const router = express.Router();
const Resources = require('./resource-model.js');

router.get('/', async (req, res) => {
  try {
    res.status(200).json(await Resources.getResources());
  }
  catch (err) {
    res.status(500).json({ error: 'Failed to get list of resources.', msg: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const resource = await Resources.getResourceById(req.params.id);

    if (resource) {
      res.status(200).json(resource);
    } else {
      res.status(404).json({ message: 'Could not find resource with the given id.' })
    }
  }
  catch (err) {
    res.status(500).json({ error: 'Failed to get resource.', msg: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    res.status(200).json(await Resources.addResource(req.body));
  }
  catch (err) {
    res.status(500).json({ error: 'Failed to add resource.', msg: err.message });
  }
});

module.exports = router;