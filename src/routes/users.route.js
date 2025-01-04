const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/users.controller');

router.post('/register' , userControllers.register);
router.get('/login' , userControllers.login);


module.exports = router;