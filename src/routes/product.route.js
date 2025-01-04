const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/product.controller');

router.post('/create' , productControllers.create);
router.get('/all' , productControllers.all);
router.get('/getByCategory/:category' , productControllers.getByCategory);

module.exports = router;