const express = require('express');

const db = require('../data/db-config.js');
const Users = require("./user-model");

const router = express.Router();

// GET 
router.get('/', (req, res) => {
  Users.all()
  .then(users => {
    res.json(users);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to get users' });
  });
});

// GET by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Users.findById(id)
  .then(user => {
  
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Could not find user with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get user' });
  });
});

// POST 
router.post('/', (req, res) => {
  const userData = req.body;

  Users.create(userData)
  .then(ids => {
    res.status(201).json({ created: ids[0] });
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to create new user' });
  });
});

// PUT 
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.update(id, changes)
  .then(updated => {
    if (updated) {
      res.json({ update: updated });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to update user' });
  });
});

// DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Users.remove(id)
  .then(count => {
    if (count) {
      res.json({ removed: count });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete user' });
  });
});

module.exports = router;