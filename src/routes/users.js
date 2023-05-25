const express = require ("express");

const UserController = require ('../controller/users');

const router = express.Router();


// read get
router.get('/', UserController.getAllUsers);

// router.get('/:email', UserController.findByEmail);

module.exports = router;