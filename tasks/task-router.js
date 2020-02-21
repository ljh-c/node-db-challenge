const express = require('express');
const router = express.Router();
const Tasks = require('./task-model.js');

router.get('/', async (req, res) => {
  try {
    res.status(200).json(await Tasks.getTasks());
  }
  catch (err) {
    res.status(500).json({ error: 'Failed to get list of tasks.', msg: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const task = await Tasks.getTaskById(req.params.id);

    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Could not find task with the given id.' })
    }
  }
  catch (err) {
    res.status(500).json({ error: 'Failed to get task.', msg: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    res.status(200).json(await Tasks.addTask(req.body));
  }
  catch (err) {
    res.status(500).json({ error: 'Failed to add task.', msg: err.message });
  }
});

module.exports = router;